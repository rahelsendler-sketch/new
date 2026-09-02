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
    // Upbeat Cheerful Web Audio Background Music (BGM)
    startBGM() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        if (this.bgmPlaying) return;

        this.bgmPlaying = true;
        this.bgmStep = 0;

        // Upbeat major chords & melody notes in Hz (C4 major progression: C - G - Am - F)
        const bassLine = [261.63, 261.63, 196.00, 196.00, 220.00, 220.00, 174.61, 174.61]; // C - G - Am - F
        const melodyLine = [
            523.25, 659.25, 783.99, 659.25, // C E G E
            392.00, 493.88, 587.33, 493.88, // G B D B
            440.00, 523.25, 659.25, 523.25, // A C E C
            349.23, 440.00, 523.25, 440.00  // F A C A
        ];
        const arpeggiator = [1046.50, 1318.51, 1567.98, 1318.51]; // C6 E6 G6 E6 sparkler

        this.bgmInterval = setInterval(() => {
            if (!this.bgmPlaying || !this.enabled || !this.ctx) return;
            const now = this.ctx.currentTime;

            // 1. Play Bass Synth
            const bassFreq = bassLine[Math.floor(this.bgmStep / 2) % bassLine.length];
            const bassOsc = this.ctx.createOscillator();
            const bassGain = this.ctx.createGain();
            bassOsc.type = 'triangle';
            bassOsc.frequency.setValueAtTime(bassFreq * 0.5, now);
            bassGain.gain.setValueAtTime(0.08, now);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            bassOsc.connect(bassGain);
            bassGain.connect(this.ctx.destination);
            bassOsc.start(now);
            bassOsc.stop(now + 0.23);

            // 2. Play Cheerful Chiptune Melody
            const melFreq = melodyLine[this.bgmStep % melodyLine.length];
            const melOsc = this.ctx.createOscillator();
            const melGain = this.ctx.createGain();
            melOsc.type = 'sine';
            melOsc.frequency.setValueAtTime(melFreq, now);
            melGain.gain.setValueAtTime(0.06, now);
            melGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            melOsc.connect(melGain);
            melGain.connect(this.ctx.destination);
            melOsc.start(now);
            melOsc.stop(now + 0.19);

            // 3. Upbeat Hi-Hat / Snare pop every 4 steps
            if (this.bgmStep % 2 === 1) {
                const hatOsc = this.ctx.createOscillator();
                const hatGain = this.ctx.createGain();
                hatOsc.type = 'square';
                hatOsc.frequency.setValueAtTime(1200, now);
                hatGain.gain.setValueAtTime(0.02, now);
                hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                hatOsc.connect(hatGain);
                hatGain.connect(this.ctx.destination);
                hatOsc.start(now);
                hatOsc.stop(now + 0.06);
            }

            this.bgmStep = (this.bgmStep + 1) % 16;
        }, 220); // ~136 BPM lively upbeat pace
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

