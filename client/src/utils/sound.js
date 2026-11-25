const SOUND_PREF_KEY = "cyber_code_breaker_muted_v1";

class SoundEngine {
  constructor() {
    this.ctx = null;
    try {
      const saved = localStorage.getItem(SOUND_PREF_KEY);
      this.muted = saved === "true";
    } catch {
      this.muted = false;
    }
  }

  getContext() {
    if (this.muted || typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  isMuted() {
    return this.muted;
  }

  setMuted(value) {
    this.muted = Boolean(value);
    try {
      localStorage.setItem(SOUND_PREF_KEY, String(this.muted));
    } catch {
      // Ignore storage errors
    }
    return this.muted;
  }

  toggleMute() {
    return this.setMuted(!this.muted);
  }

  playTone({
    freq = 440,
    endFreq = null,
    type = "sine",
    duration = 0.08,
    gain = 0.08,
    delay = 0,
  }) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(20, endFreq),
        now + duration
      );
    }

    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(gain, now + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(amp);
    amp.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playClick() {
    this.playTone({
      freq: 820,
      endFreq: 520,
      type: "triangle",
      duration: 0.045,
      gain: 0.05,
    });
  }

  playPin() {
    this.playTone({
      freq: 560,
      endFreq: 880,
      type: "sine",
      duration: 0.075,
      gain: 0.07,
    });
    this.playTone({
      freq: 1046,
      type: "triangle",
      duration: 0.09,
      gain: 0.05,
      delay: 0.055,
    });
  }

  playUnpin() {
    this.playTone({
      freq: 620,
      endFreq: 380,
      type: "sine",
      duration: 0.065,
      gain: 0.05,
    });
  }

  playError() {
    this.playTone({
      freq: 210,
      endFreq: 130,
      type: "sawtooth",
      duration: 0.14,
      gain: 0.08,
    });
    this.playTone({
      freq: 165,
      endFreq: 110,
      type: "square",
      duration: 0.16,
      gain: 0.06,
      delay: 0.11,
    });
  }

  playTick(urgent = false) {
    this.playTone({
      freq: urgent ? 1180 : 880,
      endFreq: urgent ? 740 : 620,
      type: urgent ? "square" : "triangle",
      duration: urgent ? 0.07 : 0.05,
      gain: urgent ? 0.075 : 0.045,
    });
  }

  playBossAlarm() {
    this.playTone({
      freq: 440,
      endFreq: 220,
      type: "sawtooth",
      duration: 0.25,
      gain: 0.08,
    });
    this.playTone({
      freq: 440,
      endFreq: 220,
      type: "sawtooth",
      duration: 0.25,
      gain: 0.08,
      delay: 0.28,
    });
  }

  playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => {
      this.playTone({
        freq,
        type: index === 3 ? "triangle" : "sine",
        duration: index === 3 ? 0.34 : 0.15,
        gain: 0.08,
        delay: index * 0.075,
      });
    });
  }

  playVictoryFanfare() {
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
    chord.forEach((freq, idx) => {
      this.playTone({
        freq,
        type: idx % 2 === 0 ? "triangle" : "sine",
        duration: 0.45,
        gain: 0.07,
        delay: idx * 0.085,
      });
    });
  }

  playTypeTick() {
    this.playTone({
      freq: 950 + Math.random() * 180,
      type: "square",
      duration: 0.018,
      gain: 0.018,
    });
  }
}

export const soundFX = new SoundEngine();
export default soundFX;
