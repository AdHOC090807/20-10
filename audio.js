// audio.js - Audio Engine with uploaded custom song 'music.mp3'
// Always-on continuous background music with interactive sound effects

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.bgMusic = new Audio('music.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.65;
        this.isPlayingMusic = false;
        this.isMuted = false;

        this.initAutoPlay();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initAutoPlay() {
        // Try autoplaying immediately
        const startMusic = () => {
            if (this.isPlayingMusic) return;
            const promise = this.bgMusic.play();
            if (promise !== undefined) {
                promise.then(() => {
                    this.isPlayingMusic = true;
                    if (window.app && window.app.updateMusicUI) {
                        window.app.updateMusicUI(true);
                    }
                }).catch(() => {
                    // Browser requires user gesture - listen for first interaction
                    const unlock = () => {
                        this.init();
                        this.bgMusic.play().then(() => {
                            this.isPlayingMusic = true;
                            if (window.app && window.app.updateMusicUI) {
                                window.app.updateMusicUI(true);
                            }
                        }).catch(() => {});
                        window.removeEventListener('pointerdown', unlock);
                        window.removeEventListener('keydown', unlock);
                        window.removeEventListener('touchstart', unlock);
                    };
                    window.addEventListener('pointerdown', unlock, { once: true });
                    window.addEventListener('keydown', unlock, { once: true });
                    window.addEventListener('touchstart', unlock, { once: true });
                });
            }
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            startMusic();
        } else {
            window.addEventListener('DOMContentLoaded', startMusic);
        }
    }

    // Toggle mute/unmute or play/pause
    toggleMusic(onUpdate) {
        this.init();
        if (this.isPlayingMusic && !this.bgMusic.paused) {
            this.bgMusic.pause();
            this.isPlayingMusic = false;
        } else {
            this.bgMusic.play().then(() => {
                this.isPlayingMusic = true;
            }).catch(() => {});
        }
        if (onUpdate) onUpdate(this.isPlayingMusic);
        return this.isPlayingMusic;
    }

    startMusic() {
        this.bgMusic.play().then(() => {
            this.isPlayingMusic = true;
        }).catch(() => {});
    }

    stopMusic() {
        this.bgMusic.pause();
        this.isPlayingMusic = false;
    }

    // Lightweight Synthesized Sound Effects (No lag)
    playTone(freq, duration = 0.4, type = 'sine', volume = 0.05) {
        if (this.isMuted) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(volume, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }

    playFireworkSound() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(70, now + 0.25);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } catch (e) {}
    }

    playSparkle() {
        this.playTone(1318.51, 0.25, 'triangle', 0.04); // E6
    }

    playEnvelopeOpen() {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 0.4, 'sine', 0.04), idx * 80);
        });
    }

    playGiftFanfare() {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 0.5, 'sine', 0.05), idx * 90);
        });
    }
}

// Global instance
window.soundEngine = new SoundEngine();
