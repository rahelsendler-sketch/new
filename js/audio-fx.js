/**
 * KFC (Kentucky Fried Chat) - Web Audio API Sound Synthesizer
 * Generates crispy crunch, sizzle, chat pops, and emote chimes dynamically in real-time.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Realistic Crispy Fried Chicken Crunch Sound
    playCrunch() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const duration = 0.28;

        // Noise Buffer for crisp texture
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        // Highpass Filter for the snap
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, now);
        filter.frequency.exponentialRampToValueAtTime(450, now + duration);
        filter.Q.setValueAtTime(4.0, now);

        // Gain Envelope
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        whiteNoise.start(now);
        whiteNoise.stop(now + duration);

        // Add a low bass thump for juicy bite
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
        oscGain.gain.setValueAtTime(0.5, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Message Pop Bubble Sound
    playPop() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Hot Sizzle Sound (Balado / Fire)
    playSizzle() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const duration = 0.5;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.sin(i * 0.05);
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2500, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + duration);
    }

    // Melty Cheese Drip Sound
    playCheese() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(320, now + 0.18);
        osc.frequency.linearRampToValueAtTime(450, now + 0.3);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    // Chicken Dance Melody Beat
    playDance() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        const times = [0, 0.08, 0.16, 0.24, 0.32, 0.40];
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + times[idx]);

            gain.gain.setValueAtTime(0.12, now + times[idx]);
            gain.gain.exponentialRampToValueAtTime(0.001, now + times[idx] + 0.07);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + times[idx]);
            osc.stop(now + times[idx] + 0.08);
        });
    }

    // Spicy Gasp / Wah Effect
    playSpicy() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }
    // Upbeat Cheerful Endless Background Music (BGM Infinite Loop)
    startBGM() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        if (this.bgmPlaying) return;

        this.bgmPlaying = true;
        this.bgmStep = 0;

        // Catchy 32-step melody & chord progression in Hz (C major -> G major -> A minor -> F major)
        const melodyLine = [
            523.25, 659.25, 783.99, 659.25, 1046.50, 783.99, 659.25, 783.99, // C4 E4 G4 E4 C5 G4 E4 G4
            392.00, 493.88, 587.33, 493.88,  783.99, 587.33, 493.88, 587.33, // G3 B3 D4 B3 G4 D4 B3 D4
            440.00, 523.25, 659.25, 523.25,  880.00, 659.25, 523.25, 659.25, // A3 C4 E4 C4 A4 E4 C4 E4
            349.23, 440.00, 523.25, 440.00,  698.46, 523.25, 440.00, 523.25  // F3 A3 C4 A3 F4 C4 A3 C4
        ];
        const bassLine = [
            130.81, 130.81, 196.00, 130.81, // C3
            98.00,  98.00,  146.83, 98.00,  // G2
            110.00, 110.00, 164.81, 110.00, // A2
            87.31,  87.31,  130.81, 87.31   // F2
        ];

        this.bgmInterval = setInterval(() => {
            if (!this.bgmPlaying || !this.enabled || !this.ctx) return;
            const now = this.ctx.currentTime;

            // 1. Play Bass Synth (Punchy Warm Bass)
            const bassIndex = Math.floor(this.bgmStep / 2) % bassLine.length;
            const bassFreq = bassLine[bassIndex];
            const bassOsc = this.ctx.createOscillator();
            const bassGain = this.ctx.createGain();
            bassOsc.type = 'triangle';
            bassOsc.frequency.setValueAtTime(bassFreq, now);
            bassGain.gain.setValueAtTime(0.09, now);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
            bassOsc.connect(bassGain);
            bassGain.connect(this.ctx.destination);
            bassOsc.start(now);
            bassOsc.stop(now + 0.21);

            // 2. Play Main Cheerful Synth Melody
            const melFreq = melodyLine[this.bgmStep % melodyLine.length];
            const melOsc = this.ctx.createOscillator();
            const melGain = this.ctx.createGain();
            melOsc.type = 'sine';
            melOsc.frequency.setValueAtTime(melFreq, now);
            melGain.gain.setValueAtTime(0.07, now);
            melGain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
            melOsc.connect(melGain);
            melGain.connect(this.ctx.destination);
            melOsc.start(now);
            melOsc.stop(now + 0.18);

            // 3. Upbeat Rhythm Percussion Pop (Hi-hats & Snares)
            if (this.bgmStep % 2 === 1) {
                const hatOsc = this.ctx.createOscillator();
                const hatGain = this.ctx.createGain();
                hatOsc.type = 'square';
                hatOsc.frequency.setValueAtTime(1400, now);
                hatGain.gain.setValueAtTime(0.025, now);
                hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                hatOsc.connect(hatGain);
                hatGain.connect(this.ctx.destination);
                hatOsc.start(now);
                hatOsc.stop(now + 0.05);
            }

            // Infinite loop counter reset
            this.bgmStep = (this.bgmStep + 1) % 32;
        }, 200); // 150 BPM energetic endless BGM pace
    }

    stopBGM() {
        this.bgmPlaying = false;
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
    }

    toggleBGM() {
        if (this.bgmPlaying) {
            this.stopBGM();
            return false;
        } else {
            this.startBGM();
            return true;
        }
    }
}

const soundFX = new SoundEngine();

