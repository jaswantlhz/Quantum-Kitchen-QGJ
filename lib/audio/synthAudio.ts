/**
 * Quantum Kitchen Unified Audio Engine
 * Combines high-precision Web Audio procedural synthesizers with
 * zero-latency cached audio samples (/sounds/*.wav, *.ogg).
 */

class QuantumAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  // Real Audio Sample Elements / Buffers
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Pre-heat audio elements
      this.preloadSample('bell', '/sounds/Bell.wav');
      this.preloadSample('ticket', '/sounds/Ticket.wav');
      this.preloadSample('upgrade', '/sounds/Upgrade.wav');
    }
  }

  private preloadSample(key: string, url: string) {
    if (typeof window === 'undefined') return;
    try {
      const audio = new Audio(url);
      audio.preload = 'auto';
      this.audioCache.set(key, audio);
    } catch {
      // Audio preload fallback
    }
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.35;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.35, this.ctx.currentTime);
    }
    if (this.bgmAudio) {
      this.bgmAudio.muted = muted;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /* =========================================================================
   * 1. Sample-Based SFX (Bell.wav, Ticket.wav, Upgrade.wav)
   * ========================================================================= */

  /**
   * Classic Service Bell ("Order up!" / Fusion Plating / Kitchen Entry)
   */
  public playBell() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      let audio = this.audioCache.get('bell');
      if (!audio) {
        audio = new Audio('/sounds/Bell.wav');
        this.audioCache.set('bell', audio);
      }
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = 0.65;
      clone.play().catch(() => {});
    } catch {
      this.playSuccessChime(); // Fallback to synth chime
    }
  }

  /**
   * Tactile Order Ticket Slip (Recipe Switching / Ticket Flipping)
   */
  public playTicket() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      let audio = this.audioCache.get('ticket');
      if (!audio) {
        audio = new Audio('/sounds/Ticket.wav');
        this.audioCache.set('ticket', audio);
      }
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = 0.55;
      clone.play().catch(() => {});
    } catch {
      this.playPluck(1, true); // Fallback
    }
  }

  /**
   * Tech Upgrade / Hardware Unlock Chime (Pantry Tool Purchase)
   */
  public playUpgrade() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      let audio = this.audioCache.get('upgrade');
      if (!audio) {
        audio = new Audio('/sounds/Upgrade.wav');
        this.audioCache.set('upgrade', audio);
      }
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = 0.7;
      clone.play().catch(() => {});
    } catch {
      this.playSuccessChime(); // Fallback
    }
  }

  /* =========================================================================
   * 2. Background Ambient BGM (Quantum Minecraft.ogg)
   * ========================================================================= */

  public startBGM() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.bgmAudio) {
        this.bgmAudio = new Audio('/sounds/Quantum Minecraft.ogg');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.28;
      }
      if (this.bgmPlaying && !this.bgmAudio.paused) {
        this.bgmAudio.muted = this.isMuted;
        return;
      }
      this.bgmAudio.muted = this.isMuted;
      this.bgmAudio.play().then(() => {
        this.bgmPlaying = true;
      }).catch(() => {
        // Autoplay policy waiting for user interaction
      });
    } catch {
      // Audio error fallback
    }
  }

  public stopBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmPlaying = false;
    }
  }

  public toggleBGM(): boolean {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public isBGMActive(): boolean {
    return this.bgmPlaying;
  }

  /* =========================================================================
   * 3. Procedural Web Audio Synthesizers (Braid Plucks, Mascot Chirps)
   * ========================================================================= */

  /**
   * Tactile Harp Pluck on Braid Crossing
   */
  public playPluck(lane: number, isOver: boolean) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const baseFreq = lane === 1 ? 523.25 : 659.25;
    const freq = isOver ? baseFreq : baseFreq * 0.8909;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();

    osc1.type = isOver ? 'triangle' : 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc1.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 0.25);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isOver ? 3200 : 1800, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.3);

    snapGain.gain.setValueAtTime(0.001, now);
    snapGain.gain.linearRampToValueAtTime(0.4, now + 0.015);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(snapGain);
    snapGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  /**
   * Shimmering quantum bubbles as ingredients swirl
   */
  public playFusionShimmer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const pitches = [523.25, 659.25, 783.99, 1046.5, 1318.5];

    pitches.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, delay + 0.4);

      gain.gain.setValueAtTime(0.001, delay);
      gain.gain.linearRampToValueAtTime(0.15, delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, delay + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(delay);
      osc.stop(delay + 0.55);
    });
  }

  /**
   * Victory dish chime
   */
  public playSuccessChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const chord = [440, 554.37, 659.25, 880, 1108.73];

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.04 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.04);
      osc.stop(now + 1.3);
    });
  }

  /**
   * Decoherence glitch sound
   */
  public playGlitchSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(60, now + 0.3);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Playful mascot chirp / bloop
   */
  public playMascotChirp(pitchVariant: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const baseFreq = 587.33 * Math.pow(1.059, pitchVariant);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.16);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const soundFx = new QuantumAudioEngine();
