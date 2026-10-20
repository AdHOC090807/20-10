// fireworks.js - Ultra High-Performance Particle & Fireworks Engine (Lag-Free 60FPS)

class ParticleCanvas {
    constructor() {
        this.fwCanvas = document.getElementById('fireworks-canvas');
        this.petalCanvas = document.getElementById('petals-canvas');
        
        this.fwCtx = this.fwCanvas.getContext('2d', { alpha: true });
        this.petalCtx = this.petalCanvas.getContext('2d', { alpha: true });

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.rockets = [];
        this.particles = [];
        this.petals = [];
        this.floatingTexts = [];
        this.sparkles = []; // Canvas-based click sparkles (zero DOM lag!)

        this.autoFireworks = false;
        this.autoInterval = null;
        this.showPetals = true;
        this.enableAutoFireworks = true;
        this.petalCount = 24; // Optimized for silky smooth 60fps
        this.maxParticles = 180; // Strict particle cap to prevent any lag
        this.lastLaunchTime = 0;
        this.lastSoundTime = 0;

        this.colorPalettes = [
            ['#ff4b72', '#ff758c', '#ff9a9e', '#fecfef'], // Romantic Rose
            ['#ffd700', '#ffae19', '#fff275', '#ffffff'], // Golden Sparkle
            ['#c471ed', '#f64f59', '#12c2e9', '#ffffff'], // Cosmic Dream
            ['#ff0844', '#ffb199', '#ff3366', '#ff99aa'], // Crimson Love
            ['#fa709a', '#fee140', '#ffffff', '#ff6b6b'], // Sunset Glow
            ['#a18cd1', '#fbc2eb', '#fad0c4', '#ffffff']  // Lavender Blossom
        ];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });

        // Spawn initial petals
        for (let i = 0; i < this.petalCount; i++) {
            this.petals.push(this.createPetal(true));
        }

        // Click interaction with throttling
        window.addEventListener('pointerdown', (e) => {
            const now = performance.now();
            const target = e.target;
            const isClickable = target.closest('button, a, input, textarea, select, .interactive-card, .clickable');
            
            // Add canvas-based sparkle (fast, no DOM element thrashing)
            this.spawnCanvasSparkles(e.clientX, e.clientY);

            // Throttle rocket launch to max 1 per 180ms
            if (!isClickable && now - this.lastLaunchTime > 180) {
                this.lastLaunchTime = now;
                this.launchRocket(e.clientX, e.clientY);
            }
        }, { passive: true });

        // Start animation loop
        this.animate();

        // Occasional ambient single firework
        setInterval(() => {
            if (this.enableAutoFireworks && !this.autoFireworks && Math.random() < 0.35 && this.rockets.length < 2) {
                const targetX = this.width * (0.2 + Math.random() * 0.6);
                const targetY = this.height * (0.15 + Math.random() * 0.35);
                this.launchRocket(targetX, targetY);
            }
        }, 4000);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fwCanvas.width = this.width;
        this.fwCanvas.height = this.height;
        this.petalCanvas.width = this.width;
        this.petalCanvas.height = this.height;
    }

    createPetal(randomY = false) {
        const colors = [
            'rgba(255, 75, 110, 0.75)',   // Rose
            'rgba(255, 117, 140, 0.7)',   // Pink
            'rgba(230, 50, 80, 0.8)',     // Deep ruby
            'rgba(255, 182, 193, 0.65)',  // Light pink
            'rgba(255, 215, 0, 0.6)'      // Gold shimmer
        ];

        return {
            x: Math.random() * this.width,
            y: randomY ? Math.random() * this.height : -25,
            size: 9 + Math.random() * 11,
            speedY: 1.0 + Math.random() * 1.4,
            speedX: -0.4 + Math.random() * 0.8,
            angle: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            flip: Math.random() * 360,
            flipSpeed: 0.02 + Math.random() * 0.02
        };
    }

    launchRocket(targetX, targetY, isSpecialHeart = false, palette = null) {
        if (this.rockets.length >= 5) return; // Prevent rocket pile-up

        if (!palette) {
            palette = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
        }
        const startX = targetX + (Math.random() - 0.5) * 100;
        const startY = this.height + 10;
        const speed = 12 + Math.random() * 3;
        const angle = Math.atan2(targetY - startY, targetX - startX);

        this.rockets.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            targetY: targetY,
            color: palette[0],
            palette: palette,
            isSpecialHeart: isSpecialHeart || (Math.random() < 0.25)
        });

        // Throttle sound effect to avoid audio thread bottleneck
        const now = performance.now();
        if (window.soundEngine && now - this.lastSoundTime > 250) {
            this.lastSoundTime = now;
            window.soundEngine.playFireworkSound();
        }
    }

    explode(x, y, palette, isHeart = false) {
        // Enforce particle ceiling to guarantee 60fps
        const availableSlots = this.maxParticles - this.particles.length;
        if (availableSlots <= 10) return;

        const count = Math.min(availableSlots, isHeart ? 36 : 45);

        if (isHeart) {
            // Heart-shaped explosion
            for (let i = 0; i < count; i++) {
                const t = (Math.PI * 2 * i) / count;
                const hx = 16 * Math.pow(Math.sin(t), 3);
                const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                const speedMult = 0.2 + Math.random() * 0.04;

                this.particles.push({
                    x: x,
                    y: y,
                    vx: hx * speedMult,
                    vy: hy * speedMult,
                    color: palette[i % palette.length],
                    alpha: 1,
                    decay: 0.018 + Math.random() * 0.012,
                    size: 2.2 + Math.random() * 1.5,
                    gravity: 0.035
                });
            }
        } else {
            // Peony radial burst
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
                const speed = 2.0 + Math.random() * 4.5;

                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: palette[i % palette.length],
                    alpha: 1,
                    decay: 0.018 + Math.random() * 0.014,
                    size: 2.0 + Math.random() * 1.8,
                    gravity: 0.045
                });
            }
        }
    }

    // High performance canvas-based sparkles (Zero DOM lag!)
    spawnCanvasSparkles(x, y) {
        if (this.sparkles.length >= 30) return;
        const icons = ['💖', '🌸', '✨', '🌹'];
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI * 2 * i) / 4 + (Math.random() - 0.5) * 0.5;
            const speed = 2.0 + Math.random() * 2.5;
            this.sparkles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2.0,
                icon: icons[i % icons.length],
                alpha: 1.0,
                scale: 0.7 + Math.random() * 0.5
            });
        }
    }

    launchSpecialTribute(name, message, colorPalette) {
        const targetX = this.width * (0.35 + Math.random() * 0.3);
        const targetY = this.height * 0.25;

        this.launchRocket(targetX, targetY, true, colorPalette);
        
        this.floatingTexts.push({
            text: `💖 ${message} 💖`,
            x: targetX,
            y: targetY - 40,
            alpha: 1.5,
            scale: 0.7,
            maxScale: 1.15
        });
    }

    toggleGrandCelebration(active) {
        this.autoFireworks = active;
        if (this.autoFireworks) {
            this.autoInterval = setInterval(() => {
                if (this.rockets.length >= 3) return; // Keep rockets bounded
                const targetX = this.width * (0.2 + Math.random() * 0.6);
                const targetY = this.height * (0.15 + Math.random() * 0.35);
                const isHeart = Math.random() < 0.4;
                const palette = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
                this.launchRocket(targetX, targetY, isHeart, palette);
            }, 650);
        } else {
            if (this.autoInterval) {
                clearInterval(this.autoInterval);
                this.autoInterval = null;
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // --- Render Fireworks ---
        // Fast alpha trail without expensive filter/shadows
        this.fwCtx.globalCompositeOperation = 'destination-out';
        this.fwCtx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.fwCtx.fillRect(0, 0, this.width, this.height);
        
        // Use 'lighter' for natural additive bloom (super fast GPU blending!)
        this.fwCtx.globalCompositeOperation = 'lighter';

        // Update rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            r.x += r.vx;
            r.y += r.vy;

            this.fwCtx.beginPath();
            this.fwCtx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
            this.fwCtx.fillStyle = r.color;
            this.fwCtx.fill();

            // Check explosion
            if (r.y <= r.targetY || r.vy >= 0) {
                this.explode(r.x, r.y, r.palette, r.isSpecialHeart);
                this.rockets.splice(i, 1);
            }
        }

        // Update particles (No shadowBlur in loop = silky 60fps!)
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.fwCtx.save();
            this.fwCtx.globalAlpha = p.alpha;
            this.fwCtx.fillStyle = p.color;
            this.fwCtx.beginPath();
            this.fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.fwCtx.fill();
            this.fwCtx.restore();
        }

        // Update Canvas-based sparkles
        if (this.sparkles.length > 0) {
            this.fwCtx.save();
            this.fwCtx.font = '18px sans-serif';
            this.fwCtx.textAlign = 'center';
            for (let i = this.sparkles.length - 1; i >= 0; i--) {
                const s = this.sparkles[i];
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.08;
                s.alpha -= 0.025;

                if (s.alpha <= 0) {
                    this.sparkles.splice(i, 1);
                    continue;
                }

                this.fwCtx.globalAlpha = s.alpha;
                this.fwCtx.fillText(s.icon, s.x, s.y);
            }
            this.fwCtx.restore();
        }

        // Floating celebration texts
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y -= 0.5;
            ft.alpha -= 0.01;
            if (ft.scale < ft.maxScale) ft.scale += 0.02;

            if (ft.alpha <= 0) {
                this.floatingTexts.splice(i, 1);
                continue;
            }

            this.fwCtx.save();
            this.fwCtx.font = `bold ${Math.round(22 * ft.scale)}px "Playfair Display", "Be Vietnam Pro", sans-serif`;
            this.fwCtx.textAlign = 'center';
            this.fwCtx.fillStyle = `rgba(255, 240, 245, ${Math.min(1, ft.alpha)})`;
            this.fwCtx.fillText(ft.text, ft.x, ft.y);
            this.fwCtx.restore();
        }

        // --- Render Falling Rose Petals ---
        this.petalCtx.clearRect(0, 0, this.width, this.height);

        if (!this.showPetals) return;

        for (let i = 0; i < this.petals.length; i++) {
            const pt = this.petals[i];
            pt.y += pt.speedY;
            pt.x += pt.speedX;
            pt.angle += pt.rotationSpeed;
            pt.flip += pt.flipSpeed;

            // Reset loop
            if (pt.y > this.height + 30 || pt.x < -30 || pt.x > this.width + 30) {
                this.petals[i] = this.createPetal(false);
                continue;
            }

            this.petalCtx.save();
            this.petalCtx.translate(pt.x, pt.y);
            this.petalCtx.rotate((pt.angle * Math.PI) / 180);
            this.petalCtx.scale(Math.cos(pt.flip), 1);

            // Simple fast curved petal (no costly shadow blur)
            this.petalCtx.beginPath();
            this.petalCtx.moveTo(0, 0);
            this.petalCtx.bezierCurveTo(pt.size * 0.7, -pt.size * 0.5, pt.size * 0.7, pt.size * 0.5, 0, pt.size);
            this.petalCtx.bezierCurveTo(-pt.size * 0.7, pt.size * 0.5, -pt.size * 0.7, -pt.size * 0.5, 0, 0);
            this.petalCtx.fillStyle = pt.color;
            this.petalCtx.fill();
            this.petalCtx.restore();
        }
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.particleCanvas = new ParticleCanvas();
});
