// fireworks.js - Floral Blooming & Gentle Fireworks Engine for 20/10
// Emphasizes realistic blooming flowers, gentle petals, and subtle, elegant fireworks

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
        this.bloomingFlowers = []; // Interactive blooming flowers
        this.floatingTexts = [];
        this.sparkles = [];

        this.autoFireworks = false;
        this.autoInterval = null;
        this.showPetals = true;
        this.enableAutoFireworks = true;
        this.petalCount = 28;
        this.maxParticles = 140; // Kept low for zero-lag silky 60fps
        this.lastBloomTime = 0;
        this.lastSoundTime = 0;

        // Floral color palettes (Rose, Lotus, Cherry Blossom, Peony, Gold Stamen)
        this.floralPalettes = [
            { outer: '#ff4b72', inner: '#ff758c', center: '#ffd700', sparks: ['#ff758c', '#ffb6c1', '#ffd700'] }, // Rose Red
            { outer: '#f43f5e', inner: '#fb7185', center: '#fff275', sparks: ['#fb7185', '#fda4af', '#fff275'] }, // Lotus Pink
            { outer: '#e11d48', inner: '#f43f5e', center: '#fbbf24', sparks: ['#f43f5e', '#ff9a9e', '#fbbf24'] }, // Crimson Blossom
            { outer: '#c026d3', inner: '#e879f9', center: '#fef08a', sparks: ['#e879f9', '#f0abfc', '#fde047'] }, // Orchid Lavender
            { outer: '#f59e0b', inner: '#fbbf24', center: '#ffffff', sparks: ['#fbbf24', '#fef08a', '#ffffff'] }  // Sunflower Gold
        ];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });

        for (let i = 0; i < this.petalCount; i++) {
            this.petals.push(this.createPetal(true));
        }

        // On click: Blossom a blooming flower with subtle golden pollen!
        window.addEventListener('pointerdown', (e) => {
            const now = performance.now();
            const target = e.target;
            const isClickable = target.closest('button, a, input, textarea, select, .interactive-card, .clickable, #intro-overlay');
            
            // Add canvas-based floating floral sparkles
            this.spawnCanvasSparkles(e.clientX, e.clientY);

            if (!isClickable && now - this.lastBloomTime > 150) {
                this.lastBloomTime = now;
                // Bloom a gorgeous flower at click point!
                this.spawnBloomingFlower(e.clientX, e.clientY);
                
                // Occasional subtle small firework burst
                if (Math.random() < 0.4) {
                    this.launchSmallFlowerRocket(e.clientX, e.clientY - 60);
                }
            }
        }, { passive: true });

        this.animate();

        // Occasional distant gentle floral firework in background
        setInterval(() => {
            if (this.enableAutoFireworks && !this.autoFireworks && Math.random() < 0.35 && this.rockets.length < 2) {
                const targetX = this.width * (0.2 + Math.random() * 0.6);
                const targetY = this.height * (0.15 + Math.random() * 0.3);
                this.launchSmallFlowerRocket(targetX, targetY);
            }
        }, 4500);
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
            'rgba(255, 182, 193, 0.65)',  // Soft blush
            'rgba(255, 215, 0, 0.6)'      // Gold shimmer
        ];

        return {
            x: Math.random() * this.width,
            y: randomY ? Math.random() * this.height : -25,
            size: 9 + Math.random() * 11,
            speedY: 1.0 + Math.random() * 1.3,
            speedX: -0.4 + Math.random() * 0.8,
            angle: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            flip: Math.random() * 360,
            flipSpeed: 0.02 + Math.random() * 0.02
        };
    }

    // 🌸 CORE NEW FEATURE: Interactive Blooming Flower at (x, y)
    spawnBloomingFlower(x, y, palette = null) {
        if (this.bloomingFlowers.length >= 8) {
            this.bloomingFlowers.shift(); // Remove oldest to maintain silky 60fps
        }

        if (!palette) {
            palette = this.floralPalettes[Math.floor(Math.random() * this.floralPalettes.length)];
        }

        const flower = {
            x: x,
            y: y,
            targetSize: 28 + Math.random() * 16,
            currentSize: 0,
            growthSpeed: 0.08,
            progress: 0, // 0 to 1
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            palette: palette,
            petalCount: 6,
            life: 1.0, // fades out after full bloom
            decay: 0.012,
            pollenDone: false
        };

        this.bloomingFlowers.push(flower);

        if (window.soundEngine) {
            window.soundEngine.playSparkle();
        }
    }

    // Gentle, Smaller Floral Fireworks ("Pháo hoa bé lại")
    launchSmallFlowerRocket(targetX, targetY, isSpecialHeart = false, palette = null) {
        if (this.rockets.length >= 4) return;

        if (!palette) {
            const fPalette = this.floralPalettes[Math.floor(Math.random() * this.floralPalettes.length)];
            palette = fPalette.sparks;
        }

        const startX = targetX + (Math.random() - 0.5) * 80;
        const startY = this.height + 10;
        const speed = 10 + Math.random() * 2.5; // Gentler speed
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

        const now = performance.now();
        if (window.soundEngine && now - this.lastSoundTime > 300) {
            this.lastSoundTime = now;
            window.soundEngine.playFireworkSound();
        }
    }

    explode(x, y, palette, isHeart = false) {
        // Enforce tight particle ceiling for smaller, subtle floral bursts
        const availableSlots = this.maxParticles - this.particles.length;
        if (availableSlots <= 10) return;

        // Smaller particle count (25-35 instead of 100)
        const count = Math.min(availableSlots, isHeart ? 26 : 30);

        // Also bloom a delicate flower right at the explosion apex!
        this.spawnBloomingFlower(x, y);

        if (isHeart) {
            for (let i = 0; i < count; i++) {
                const t = (Math.PI * 2 * i) / count;
                const hx = 16 * Math.pow(Math.sin(t), 3);
                const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                const speedMult = 0.16 + Math.random() * 0.03; // Smaller spread

                this.particles.push({
                    x: x,
                    y: y,
                    vx: hx * speedMult,
                    vy: hy * speedMult,
                    color: palette[i % palette.length],
                    alpha: 1,
                    decay: 0.02 + Math.random() * 0.012,
                    size: 1.5 + Math.random() * 1.2, // Smaller sparks
                    gravity: 0.03
                });
            }
        } else {
            // Floral rosette burst with 5-6 lobes
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = 1.6 + Math.random() * 2.8; // Subtle radius

                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: palette[i % palette.length],
                    alpha: 1,
                    decay: 0.02 + Math.random() * 0.014,
                    size: 1.5 + Math.random() * 1.4, // Small delicate sparks
                    gravity: 0.035
                });
            }
        }
    }

    spawnCanvasSparkles(x, y) {
        if (this.sparkles.length >= 24) return;
        const icons = ['🌸', '💖', '✨', '🌹'];
        for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 * i) / 3 + (Math.random() - 0.5) * 0.4;
            const speed = 1.8 + Math.random() * 2.0;
            this.sparkles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.8,
                icon: icons[i % icons.length],
                alpha: 1.0
            });
        }
    }

    launchSpecialTribute(name, message, colorPalette) {
        const targetX = this.width * (0.35 + Math.random() * 0.3);
        const targetY = this.height * 0.25;

        this.launchSmallFlowerRocket(targetX, targetY, true, colorPalette);
        this.spawnBloomingFlower(targetX, targetY);
        
        this.floatingTexts.push({
            text: `🌸 ${message} 🌸`,
            x: targetX,
            y: targetY - 40,
            alpha: 1.5,
            scale: 0.7,
            maxScale: 1.1
        });
    }

    toggleGrandCelebration(active) {
        this.autoFireworks = active;
        if (this.autoFireworks) {
            this.autoInterval = setInterval(() => {
                if (this.rockets.length >= 3) return;
                const targetX = this.width * (0.2 + Math.random() * 0.6);
                const targetY = this.height * (0.15 + Math.random() * 0.35);
                const isHeart = Math.random() < 0.4;
                const fPalette = this.floralPalettes[Math.floor(Math.random() * this.floralPalettes.length)];
                this.launchSmallFlowerRocket(targetX, targetY, isHeart, fPalette.sparks);
            }, 750);
        } else {
            if (this.autoInterval) {
                clearInterval(this.autoInterval);
                this.autoInterval = null;
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // --- Render Fireworks & Blooming Flowers Canvas ---
        this.fwCtx.globalCompositeOperation = 'destination-out';
        this.fwCtx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.fwCtx.fillRect(0, 0, this.width, this.height);
        
        // Natural glowing additive blending
        this.fwCtx.globalCompositeOperation = 'lighter';

        // 1. Render Blooming Flowers (Layered Petals Unfurling)
        for (let i = this.bloomingFlowers.length - 1; i >= 0; i--) {
            const fl = this.bloomingFlowers[i];
            
            // Unfurl growth animation
            if (fl.progress < 1) {
                fl.progress += (1 - fl.progress) * 0.12 + 0.01;
                if (fl.progress > 1) fl.progress = 1;
            } else {
                fl.life -= fl.decay;
                if (fl.life <= 0) {
                    this.bloomingFlowers.splice(i, 1);
                    continue;
                }
            }

            fl.rotation += fl.rotSpeed;
            const currentSize = fl.targetSize * fl.progress;
            const alpha = Math.min(1, fl.life);

            this.fwCtx.save();
            this.fwCtx.translate(fl.x, fl.y);
            this.fwCtx.rotate(fl.rotation);
            this.fwCtx.globalAlpha = alpha;

            // Draw Layer 1: Outer Petals (6 petals)
            const petalCount = fl.petalCount;
            for (let p = 0; p < petalCount; p++) {
                const angle = (Math.PI * 2 * p) / petalCount;
                this.fwCtx.save();
                this.fwCtx.rotate(angle);
                this.fwCtx.beginPath();
                this.fwCtx.fillStyle = fl.palette.outer;
                this.fwCtx.ellipse(0, currentSize * 0.55, currentSize * 0.35, currentSize * 0.6, 0, 0, Math.PI * 2);
                this.fwCtx.fill();
                this.fwCtx.restore();
            }

            // Draw Layer 2: Inner Petals (offset angle for depth)
            for (let p = 0; p < petalCount; p++) {
                const angle = (Math.PI * 2 * p) / petalCount + (Math.PI / petalCount);
                this.fwCtx.save();
                this.fwCtx.rotate(angle);
                this.fwCtx.beginPath();
                this.fwCtx.fillStyle = fl.palette.inner;
                this.fwCtx.ellipse(0, currentSize * 0.38, currentSize * 0.28, currentSize * 0.45, 0, 0, Math.PI * 2);
                this.fwCtx.fill();
                this.fwCtx.restore();
            }

            // Draw Layer 3: Golden Glowing Center Stamen
            this.fwCtx.beginPath();
            this.fwCtx.fillStyle = fl.palette.center;
            this.fwCtx.arc(0, 0, currentSize * 0.25, 0, Math.PI * 2);
            this.fwCtx.fill();

            // Core shimmer dot
            this.fwCtx.beginPath();
            this.fwCtx.fillStyle = '#ffffff';
            this.fwCtx.arc(0, 0, currentSize * 0.1, 0, Math.PI * 2);
            this.fwCtx.fill();

            this.fwCtx.restore();
        }

        // 2. Render small delicate rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            r.x += r.vx;
            r.y += r.vy;

            this.fwCtx.beginPath();
            this.fwCtx.arc(r.x, r.y, 2.0, 0, Math.PI * 2);
            this.fwCtx.fillStyle = r.color;
            this.fwCtx.fill();

            if (r.y <= r.targetY || r.vy >= 0) {
                this.explode(r.x, r.y, r.palette, r.isSpecialHeart);
                this.rockets.splice(i, 1);
            }
        }

        // 3. Render delicate floral particles
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

        // 4. Render Canvas sparkles
        if (this.sparkles.length > 0) {
            this.fwCtx.save();
            this.fwCtx.font = '16px sans-serif';
            this.fwCtx.textAlign = 'center';
            for (let i = this.sparkles.length - 1; i >= 0; i--) {
                const s = this.sparkles[i];
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.06;
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

        // 5. Floating celebration texts
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
            this.fwCtx.font = `bold ${Math.round(20 * ft.scale)}px "Lora", "Be Vietnam Pro", serif`;
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

            if (pt.y > this.height + 30 || pt.x < -30 || pt.x > this.width + 30) {
                this.petals[i] = this.createPetal(false);
                continue;
            }

            this.petalCtx.save();
            this.petalCtx.translate(pt.x, pt.y);
            this.petalCtx.rotate((pt.angle * Math.PI) / 180);
            this.petalCtx.scale(Math.cos(pt.flip), 1);

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

window.addEventListener('DOMContentLoaded', () => {
    window.particleCanvas = new ParticleCanvas();
});
