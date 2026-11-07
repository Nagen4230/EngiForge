// Cyber sound synthesizer using standard Web Audio API
class CyberAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft tone generator
  playTone(freq: number, duration: number = 0.1, type: OscillatorType = 'sine', gainVal: number = 0.15) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Catch sound tailored per discipline
  playCatchSound(field: 'cs' | 'mech' | 'elec' | 'civil') {
    if (!this.enabled) return;
    const freqs: Record<string, number[]> = {
      cs: [520, 780, 1040], // high tech arpeggio
      mech: [220, 330, 440], // mechanical bass chord
      elec: [600, 900, 1200], // electric zap
      civil: [300, 450, 600] // solid harmonic
    };

    const notes = freqs[field] || [440, 660, 880];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.08, field === 'elec' ? 'sawtooth' : 'triangle', 0.12);
      }, idx * 35);
    });
  }

  // UI Click sound
  playClick() {
    if (!this.enabled) return;
    this.playTone(850, 0.04, 'sine', 0.1);
  }

  // Success / Transmission chime
  playSuccess() {
    if (!this.enabled) return;
    [400, 600, 800, 1200].forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.12, 'sine', 0.15);
      }, i * 70);
    });
  }

  // Power switch / warp sound
  playWarp() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new CyberAudioEngine();
