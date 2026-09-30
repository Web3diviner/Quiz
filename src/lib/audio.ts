// Web Audio API Sound Effects & Classical / Cinematic Orchestral Soundtrack Engine
// 100% self-contained, offline-ready, zero external dependencies required
import { MusicType } from '../types/competition';

export interface MusicTrackInfo {
  id: MusicType;
  composer: string;
  title: string;
  subtitle: string;
  genre: string;
  description: string;
  color: string;
  badge: string;
}

export const MUSIC_TRACKS: MusicTrackInfo[] = [
  {
    id: 'mozart_nachtmusik',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: Eine kleine Nachtmusik',
    subtitle: 'Serenade No. 13 in G Major, K. 525: Allegro & Romance',
    genre: 'Classical Symphony',
    description: 'Mozart\'s legendary Allegro serenade with crisp chamber string quartets, classical counterpoint, and celebratory academic prestige.',
    color: 'text-gold border-gold/40 bg-gold/10',
    badge: '🎼 Halidon Classical Top 1'
  },
  {
    id: 'mozart_symphony40',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: Symphony No. 40 in G Minor',
    subtitle: 'Molto Allegro, K. 550 • Passionate Orchestral',
    genre: 'Dramatic Orchestral',
    description: 'Mozart\'s intense and passionate G-minor masterpiece featuring driving melodic momentum and soaring orchestral violins.',
    color: 'text-rose-400 border-rose-400/40 bg-rose-400/10',
    badge: '🔥 Dramatic Allegro'
  },
  {
    id: 'mozart_figaro',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: The Marriage of Figaro',
    subtitle: 'Le nozze di Figaro, K. 492: Overture Presto',
    genre: 'Joyful Operatic Overture',
    description: 'Sparkling, buoyant woodwinds, whisper-fast strings, and sudden orchestral bursts of triumphant academic celebration.',
    color: 'text-amber-300 border-amber-300/40 bg-amber-300/10',
    badge: '🎭 Operatic Masterpiece'
  },
  {
    id: 'mozart_flute',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: The Magic Flute',
    subtitle: 'Die Zauberflöte, K. 620: Overture & Fugue',
    genre: 'Grand Masonic Symphony',
    description: 'Majestic triple-chord opening fanfares followed by a brilliant, lightning-fast classical contrapuntal string fugue.',
    color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    badge: '✨ Grand Overture'
  },
  {
    id: 'mozart_alla_turca',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: Rondo Alla Turca',
    subtitle: 'Turkish March • Piano Sonata No. 11 in A, K. 331',
    genre: 'Virtuoso Classical Rondo',
    description: 'Energetic martial rhythm, playful ascending chromatic arpeggios, and victorious classical piano flourishes.',
    color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    badge: '🎹 Piano Triumph'
  },
  {
    id: 'mozart_concerto21',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: Piano Concerto No. 21 in C',
    subtitle: 'II. Andante "Elvira Madigan", K. 467',
    genre: 'Poetic Serenade',
    description: 'Dreamy, ethereal pizzicato bass with floating legato melodies and serene orchestral harmonies.',
    color: 'text-teal-400 border-teal-400/40 bg-teal-400/10',
    badge: '💫 Floating Harmony'
  },
  {
    id: 'mozart_clarinet',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: Clarinet Concerto in A',
    subtitle: 'II. Adagio, K. 622 • Soulful Serenade',
    genre: 'Chamber Woodwinds',
    description: 'Warm, deeply touching lyrical clarinet lead with gentle orchestral swells and noble pastoral grace.',
    color: 'text-indigo-400 border-indigo-400/40 bg-indigo-400/10',
    badge: '🎷 Pure Elegance'
  },
  {
    id: 'mozart_requiem',
    composer: 'Wolfgang Amadeus Mozart',
    title: 'Mozart: Requiem in D Minor',
    subtitle: 'Lacrimosa & Dies Irae, K. 626',
    genre: 'Epic Choral & Brass',
    description: 'Solemn, monumental string weeping followed by earth-shattering dramatic tension and intense minor harmonies.',
    color: 'text-fuchsia-400 border-fuchsia-400/40 bg-fuchsia-400/10',
    badge: '⚡ Epic Grandeur'
  },
  {
    id: 'handel_sarabande',
    composer: 'George Frideric Handel',
    title: 'Handel: Sarabande in D Minor',
    subtitle: 'HWV 437 • Dramatic Royal Strings & Timpani',
    genre: 'Baroque Masterpiece',
    description: 'The iconic, dramatic orchestral theme from Handel featuring solemn minor strings, majestic harpsichord continuo, and deep timpani bass pulse.',
    color: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    badge: '👑 Royal Masterpiece'
  },
  {
    id: 'emotional',
    composer: 'Cinematic Chamber',
    title: 'Cinematic Emotional Strings',
    subtitle: 'Evocative D-Minor 9th & Crystal Bells',
    genre: 'Cinematic Ambient',
    description: 'Lush breathing analog string pads with slow resonant filter swells, tender celestial crystal bells, and deep heartbeat sub-bass.',
    color: 'text-sky-400 border-sky-400/40 bg-sky-400/10',
    badge: '🎻 Poignant & Deep'
  },
  {
    id: 'growth',
    composer: 'Mindset Symphony',
    title: 'Growth & Inspiring Mindset',
    subtitle: 'Uplifting C-Major 7th & Sparkling Arpeggios',
    genre: 'Growth Mindset',
    description: 'Bright, optimistic harmonic progressions with sparkling ascending synth arpeggios and motivating forward rhythm.',
    color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    badge: '🌱 Inspiring Mindset'
  },
  {
    id: 'suspense',
    composer: 'Game-Show Orchestra',
    title: 'Game-Show Climax Suspense',
    subtitle: 'Low Sub-Drone & Urgent Clock Ticks',
    genre: 'Tension Soundtrack',
    description: 'Heavy low-frequency drone, rising harmonic tension, and rapid suspense clicks for high-stakes countdown showdowns.',
    color: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
    badge: '⚡ High Tension'
  }
];

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private soundVolume: number = 0.6;
  private musicVolume: number = 0.45;
  private currentMusicType: MusicType = 'handel_sarabande';

  // Music state & active nodes
  private isMusicPlaying: boolean = false;
  private musicIntensity: 1 | 2 | 3 = 1;
  private musicMasterGain: GainNode | null = null;
  private musicTimerId: number | null = null;
  private chordTimerId: number | null = null;
  
  // Pad & String synth voices
  private activePadOscillators: OscillatorNode[] = [];
  private activePadGains: GainNode[] = [];
  private padFilterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(muted ? 0 : this.musicVolume * 0.45, this.ctx.currentTime);
    }
  }

  public setSoundVolume(vol: number) {
    this.soundVolume = Math.max(0, Math.min(1, vol));
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicMasterGain && this.ctx && !this.isMuted) {
      this.musicMasterGain.gain.setValueAtTime(this.musicVolume * 0.45, this.ctx.currentTime);
    }
  }

  public setMusicType(type: MusicType) {
    if (this.currentMusicType === type) return;
    this.currentMusicType = type;
    if (this.isMusicPlaying) {
      this.stopTensionMusic();
      this.startTensionMusic(this.musicIntensity);
    }
  }

  public getSoundVolume(): number {
    return this.soundVolume;
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getMusicType(): MusicType {
    return this.currentMusicType;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isMusicActive(): boolean {
    return this.isMusicPlaying;
  }

  // =========================================================================
  // CLASSICAL & MULTI-GENRE PROCEDURAL ORCHESTRA ENGINE
  // =========================================================================

  public startTensionMusic(intensity: 1 | 2 | 3 = 1) {
    this.musicIntensity = intensity;
    if (this.isMusicPlaying) {
      this.setTensionIntensity(intensity);
      return;
    }

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.isMusicPlaying = true;
      const now = ctx.currentTime;

      // Master Music Gain with smooth fade in
      this.musicMasterGain = ctx.createGain();
      this.musicMasterGain.gain.setValueAtTime(0.001, now);
      this.musicMasterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.musicVolume * 0.45, now + 1.0);
      this.musicMasterGain.connect(ctx.destination);

      // Lowpass resonant filter with slow LFO breath
      this.padFilterNode = ctx.createBiquadFilter();
      this.padFilterNode.type = 'lowpass';
      
      const filterBaseFreq = 
        this.currentMusicType === 'mozart_nachtmusik' ? 850 :
        this.currentMusicType === 'mozart_symphony40' ? 750 :
        this.currentMusicType === 'growth' ? 680 :
        this.currentMusicType === 'handel_sarabande' ? 520 : 400;

      this.padFilterNode.frequency.setValueAtTime(filterBaseFreq, now);
      this.padFilterNode.Q.setValueAtTime(2.0, now);

      // LFO for slow emotional filter swell
      this.lfoNode = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      this.lfoNode.frequency.setValueAtTime(0.18, now);
      lfoGain.gain.setValueAtTime(120, now);
      this.lfoNode.connect(lfoGain);
      lfoGain.connect(this.padFilterNode.frequency);
      this.lfoNode.start(now);

      this.padFilterNode.connect(this.musicMasterGain);

      // Orchestral Scores & Chord Data
      let chordProgressions: number[][];
      let melodicMotifs: number[][];
      let chordIntervalMs = 4500;
      let beatIntervalMs = 650;
      let padWaveform: OscillatorType = 'sawtooth';
      let melodicWaveform: OscillatorType = 'triangle';

      if (this.currentMusicType === 'handel_sarabande') {
        // ==========================================
        // HANDEL: SARABANDE IN D MINOR (HWV 437)
        // ==========================================
        // Majestic Baroque Chords: D minor -> A Major -> F Major -> C Major -> G minor -> D minor -> A7 -> Dm
        chordProgressions = [
          [73.42, 110.00, 146.83, 220.00, 293.66], // D minor (D2, A2, D3, A3, D4)
          [55.00, 110.00, 138.59, 220.00, 277.18], // A Major (A1, A2, C#3, A3, C#4)
          [87.31, 130.81, 174.61, 220.00, 349.23], // F Major (F2, C3, F3, A3, F4)
          [65.41, 130.81, 164.81, 196.00, 261.63], // C Major (C2, C3, E3, G3, C4)
          [49.00, 98.00, 146.83, 196.00, 293.66],  // G minor (G1, G2, D3, G3, D4)
          [73.42, 110.00, 146.83, 220.00, 293.66], // D minor (D2, A2, D3, A3, D4)
          [55.00, 110.00, 138.59, 196.00, 277.18], // A7 (A1, A2, C#3, G3, C#4)
          [73.42, 110.00, 146.83, 220.00, 293.66], // D minor final cadence
        ];
        // Handel's Iconic Sarabande Dotted-Rhythm Melody (D4, E4, F4, E4, D4, C#4, D4)
        melodicMotifs = [
          [293.66, 329.63, 349.23, 329.63], // D4, E4, F4, E4
          [277.18, 293.66, 329.63, 277.18], // C#4, D4, E4, C#4
          [349.23, 392.00, 440.00, 392.00], // F4, G4, A4, G4
          [261.63, 293.66, 329.63, 261.63], // C4, D4, E4, C4
          [293.66, 329.63, 349.23, 293.66], // D4, E4, F4, D4
          [220.00, 261.63, 293.66, 220.00], // A3, C4, D4, A3
          [277.18, 329.63, 277.18, 220.00], // C#4, E4, C#4, A3
          [293.66, 440.00, 293.66, 146.83], // D4, A4, D4, D3
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2400 : 3600;
        beatIntervalMs = this.musicIntensity === 3 ? 360 : 480;
        padWaveform = 'sawtooth';
        melodicWaveform = 'triangle';

      } else if (this.currentMusicType === 'mozart_nachtmusik') {
        // ==========================================
        // MOZART: EINE KLEINE NACHTMUSIK (K. 525)
        // ==========================================
        // Classical Allegro G Major -> D Major -> G Major -> C Major -> D7 -> G
        chordProgressions = [
          [98.00, 146.83, 196.00, 246.94, 293.66], // G Major (G2, D3, G3, B3, D4)
          [73.42, 110.00, 146.83, 220.00, 293.66], // D Major (D2, A2, D3, A3, D4)
          [98.00, 146.83, 196.00, 246.94, 392.00], // G Major (G2, D3, G3, B3, G4)
          [65.41, 130.81, 164.81, 196.00, 261.63], // C Major (C2, C3, E3, G3, C4)
          [73.42, 110.00, 146.83, 246.94, 349.23], // D7 (D2, A2, D3, B3, F4)
          [98.00, 146.83, 196.00, 246.94, 392.00], // G Major resolve
        ];
        // Mozart's Famous Opening Allegro Motif: G4-D4-G4-D4-G4-B4-D5 / C5-A4-C5-A4-F#4-D4
        melodicMotifs = [
          [392.00, 293.66, 392.00, 493.88, 587.33], // G4, D4, G4, B4, D5
          [523.25, 440.00, 523.25, 440.00, 369.99], // C5, A4, C5, A4, F#4
          [392.00, 493.88, 587.33, 783.99],         // G4, B4, D5, G5
          [523.25, 659.25, 783.99, 523.25],         // C5, E5, G5, C5
          [587.33, 493.88, 440.00, 369.99],         // D5, B4, A4, F#4
          [392.00, 587.33, 392.00, 196.00],         // G4, D5, G4, G3
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2000 : 3000;
        beatIntervalMs = this.musicIntensity === 3 ? 240 : 340; // Lively Mozart tempo
        padWaveform = 'triangle';
        melodicWaveform = 'sawtooth';

      } else if (this.currentMusicType === 'mozart_symphony40') {
        // ==========================================
        // MOZART: SYMPHONY NO. 40 IN G MINOR (K. 550)
        // ==========================================
        // Dramatic G Minor Molto Allegro: G minor -> Eb Major -> D7 -> G minor
        chordProgressions = [
          [49.00, 98.00, 146.83, 196.00, 293.66],  // G minor (G1, G2, D3, G3, D4)
          [77.78, 116.54, 155.56, 196.00, 311.13], // Eb Major (Eb2, Bb2, Eb3, G3, Eb4)
          [73.42, 110.00, 146.83, 220.00, 277.18], // D7 (D2, A2, D3, A3, C#4)
          [49.00, 98.00, 146.83, 196.00, 293.66],  // G minor
        ];
        // Immortal G minor motif: Eb5-D5-D5, Eb5-D5-D5, Eb5-D5-Bb4
        melodicMotifs = [
          [622.25, 587.33, 587.33, 622.25, 587.33, 466.16], // Eb5, D5, D5, Eb5, D5, Bb4
          [466.16, 440.00, 440.00, 466.16, 440.00, 392.00], // Bb4, A4, A4, Bb4, A4, G4
          [587.33, 554.37, 554.37, 587.33, 554.37, 440.00], // D5, C#5, C#5, D5, C#5, A4
          [392.00, 466.16, 587.33, 783.99],                 // G4, Bb4, D5, G5
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2200 : 3200;
        beatIntervalMs = this.musicIntensity === 3 ? 260 : 360;
        padWaveform = 'sawtooth';
        melodicWaveform = 'triangle';

      } else if (this.currentMusicType === 'mozart_figaro') {
        // ==========================================
        // MOZART: THE MARRIAGE OF FIGARO (K. 492) - OVERTURE PRESTO
        // ==========================================
        // D Major -> G Major -> E minor -> A7 -> D Major
        chordProgressions = [
          [73.42, 146.83, 220.00, 293.66, 369.99], // D Major (D2, D3, A3, D4, F#4)
          [98.00, 146.83, 196.00, 246.94, 293.66], // G Major (G2, D3, G3, B3, D4)
          [82.41, 123.47, 164.81, 246.94, 329.63], // E minor (E2, B2, E3, B3, E4)
          [55.00, 110.00, 164.81, 220.00, 277.18], // A7 (A1, A2, E3, A3, C#4)
          [73.42, 146.83, 220.00, 293.66, 440.00], // D Major resolve (D2, D3, A3, D4, A4)
        ];
        // Figaro's ultra-fast, playful overture violin whispers and crescendo runs
        melodicMotifs = [
          [293.66, 329.63, 369.99, 440.00, 493.88], // D4, E4, F#4, A4, B4
          [587.33, 554.37, 493.88, 440.00, 369.99], // D5, C#5, B4, A4, F#4
          [329.63, 369.99, 392.00, 440.00, 493.88], // E4, F#4, G4, A4, B4
          [440.00, 554.37, 659.25, 739.99, 880.00], // A4, C#5, E5, F#5, A5
          [587.33, 440.00, 293.66, 587.33],         // D5, A4, D4, D5
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 1600 : 2400;
        beatIntervalMs = this.musicIntensity === 3 ? 180 : 250; // Super lively Presto
        padWaveform = 'triangle';
        melodicWaveform = 'sawtooth';

      } else if (this.currentMusicType === 'mozart_flute') {
        // ==========================================
        // MOZART: THE MAGIC FLUTE (K. 620) - OVERTURE & FUGATO
        // ==========================================
        // Majestic Masonic Eb Major chords: Eb Major -> Cm -> Ab -> Bb7 -> Eb
        chordProgressions = [
          [77.78, 155.56, 196.00, 233.08, 311.13], // Eb Major (Eb2, Eb3, G3, Bb3, Eb4)
          [65.41, 130.81, 155.56, 196.00, 261.63], // C minor (C2, C3, Eb3, G3, C4)
          [51.91, 103.83, 155.56, 207.65, 261.63], // Ab Major (Ab1, Ab2, Eb3, Ab3, C4)
          [58.27, 116.54, 174.61, 233.08, 293.66], // Bb7 (Bb1, Bb2, F3, Bb3, D4)
          [77.78, 155.56, 196.00, 311.13, 392.00], // Eb Major fanfare
        ];
        // Overture Fugue theme: Bb4-Bb4-Bb4-Bb4, C5-Bb4-Ab4-G4
        melodicMotifs = [
          [466.16, 466.16, 466.16, 466.16, 523.25], // Bb4, Bb4, Bb4, Bb4, C5
          [466.16, 415.30, 392.00, 349.23, 311.13], // Bb4, Ab4, G4, F4, Eb4
          [523.25, 587.33, 622.25, 698.46, 783.99], // C5, D5, Eb5, F5, G5
          [466.16, 622.25, 783.99, 932.33],         // Bb4, Eb5, G5, Bb5
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2200 : 3400;
        beatIntervalMs = this.musicIntensity === 3 ? 260 : 360;
        padWaveform = 'sawtooth';
        melodicWaveform = 'triangle';

      } else if (this.currentMusicType === 'mozart_alla_turca') {
        // ==========================================
        // MOZART: RONDO ALLA TURCA / TURKISH MARCH (K. 331)
        // ==========================================
        // A minor -> E minor -> A minor -> A Major triumph (F#-G#-A)
        chordProgressions = [
          [55.00, 110.00, 164.81, 220.00, 261.63], // A minor (A1, A2, E3, A3, C4)
          [82.41, 123.47, 164.81, 196.00, 246.94], // E minor (E2, B2, E3, G3, B3)
          [55.00, 110.00, 164.81, 220.00, 261.63], // A minor (A1, A2, E3, A3, C4)
          [55.00, 110.00, 138.59, 220.00, 277.18], // A Major (A1, A2, C#3, A3, C#4)
        ];
        // Legendary Alla Turca Motif: B4-A4-G#4-A4-C5 / D5-C5-B4-C5-E5 / F5-E5-D#5-E5-B5-A5-G#5-A5-B5-A5
        melodicMotifs = [
          [493.88, 440.00, 415.30, 440.00, 523.25], // B4, A4, G#4, A4, C5
          [587.33, 523.25, 493.88, 523.25, 659.25], // D5, C5, B4, C5, E5
          [698.46, 659.25, 622.25, 659.25, 880.00], // F5, E5, D#5, E5, A5
          [880.00, 739.99, 659.25, 554.37, 440.00], // A5, F#5, E5, C#5, A4
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 1800 : 2600;
        beatIntervalMs = this.musicIntensity === 3 ? 200 : 280; // Quick rhythmic cadence
        padWaveform = 'triangle';
        melodicWaveform = 'sawtooth';

      } else if (this.currentMusicType === 'mozart_concerto21') {
        // ==========================================
        // MOZART: PIANO CONCERTO NO. 21 IN C (K. 467) - II. ANDANTE
        // ==========================================
        // Dreamy serene F Major -> D minor -> Gm7 -> C7 -> F Major
        chordProgressions = [
          [87.31, 130.81, 174.61, 220.00, 261.63], // F Major (F2, C3, F3, A3, C4)
          [73.42, 110.00, 146.83, 220.00, 293.66], // D minor (D2, A2, D3, A3, D4)
          [98.00, 146.83, 233.08, 293.66, 349.23], // Gm7 (G2, D3, Bb3, D4, F4)
          [65.41, 130.81, 164.81, 233.08, 261.63], // C7 (C2, C3, E3, Bb3, C4)
          [87.31, 130.81, 174.61, 261.63, 349.23], // F Major resolve
        ];
        // Lyrical, heavenly floating legato melody (A4-C5-F5-E5-D5-C5-B4-C5)
        melodicMotifs = [
          [440.00, 523.25, 698.46, 659.25], // A4, C5, F5, E5
          [587.33, 523.25, 493.88, 523.25], // D5, C5, B4, C5
          [466.16, 587.33, 698.46, 880.00], // Bb4, D5, F5, A5
          [659.25, 523.25, 440.00, 349.23], // E5, C5, A4, F4
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 3200 : 4800;
        beatIntervalMs = this.musicIntensity === 3 ? 420 : 600; // Slow, poetic tempo
        padWaveform = 'triangle';
        melodicWaveform = 'sine';

      } else if (this.currentMusicType === 'mozart_clarinet') {
        // ==========================================
        // MOZART: CLARINET CONCERTO IN A MAJOR (K. 622) - II. ADAGIO
        // ==========================================
        // D Major / A Major noble pastoral chords
        chordProgressions = [
          [73.42, 110.00, 146.83, 220.00, 293.66], // D Major (D2, A2, D3, A3, D4)
          [55.00, 110.00, 138.59, 220.00, 277.18], // A Major (A1, A2, C#3, A3, C#4)
          [98.00, 146.83, 196.00, 246.94, 293.66], // G Major (G2, D3, G3, B3, D4)
          [73.42, 110.00, 146.83, 220.00, 369.99], // D Major (D2, A2, D3, A3, F#4)
        ];
        // Soulful, warm clarinet melody
        melodicMotifs = [
          [293.66, 369.99, 440.00, 587.33], // D4, F#4, A4, D5
          [554.37, 493.88, 440.00, 369.99], // C#5, B4, A4, F#4
          [392.00, 440.00, 493.88, 587.33], // G4, A4, B4, D5
          [440.00, 369.99, 293.66, 220.00], // A4, F#4, D4, A3
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 3000 : 4400;
        beatIntervalMs = this.musicIntensity === 3 ? 400 : 580;
        padWaveform = 'triangle';
        melodicWaveform = 'sine';

      } else if (this.currentMusicType === 'mozart_requiem') {
        // ==========================================
        // MOZART: REQUIEM IN D MINOR (K. 626) - LACRIMOSA & DIES IRAE
        // ==========================================
        // Solemn D minor -> Bb Major -> G minor -> A7sus4 -> A7 -> Dm
        chordProgressions = [
          [73.42, 110.00, 146.83, 220.00, 293.66], // D minor (D2, A2, D3, A3, D4)
          [58.27, 116.54, 146.83, 233.08, 293.66], // Bb Major (Bb1, Bb2, D3, Bb3, D4)
          [49.00, 98.00, 146.83, 196.00, 293.66],  // G minor (G1, G2, D3, G3, D4)
          [55.00, 110.00, 146.83, 220.00, 277.18], // A7 (A1, A2, D3, A3, C#4)
          [73.42, 110.00, 146.83, 220.00, 349.23], // Dm (D2, A2, D3, A3, F4)
        ];
        // Lacrimosa crying strings & dramatic dies irae tension
        melodicMotifs = [
          [293.66, 311.13, 293.66, 277.18], // D4, Eb4, D4, C#4
          [349.23, 369.99, 349.23, 329.63], // F4, F#4, F4, E4
          [392.00, 440.00, 466.16, 523.25], // G4, A4, Bb4, C5
          [587.33, 554.37, 440.00, 293.66], // D5, C#5, A4, D4
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2400 : 3800;
        beatIntervalMs = this.musicIntensity === 3 ? 320 : 460;
        padWaveform = 'sawtooth';
        melodicWaveform = 'triangle';

      } else if (this.currentMusicType === 'growth') {
        // Growth Mindset: C Major 7 -> F Major 9 -> A minor 7 -> G sus4 -> G Major
        chordProgressions = [
          [65.41, 130.81, 196.00, 246.94, 329.63], // C Maj7 (C2, C3, G3, B3, E4)
          [87.31, 130.81, 174.61, 261.63, 329.63], // F Maj9 (F2, C3, F3, C4, E4)
          [110.00, 164.81, 220.00, 261.63, 329.63], // Am7 (A2, E3, A3, C4, E4)
          [98.00, 146.83, 196.00, 293.66, 392.00], // G Major (G2, D3, G3, D4, G4)
        ];
        melodicMotifs = [
          [523.25, 659.25, 783.99, 987.77],
          [698.46, 783.99, 1046.50, 1318.51],
          [880.00, 1046.50, 1318.51, 1567.98],
          [783.99, 880.00, 1174.66, 1567.98],
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2800 : 4000;
        beatIntervalMs = this.musicIntensity === 3 ? 380 : 500;
        padWaveform = 'sawtooth';
        melodicWaveform = 'sine';

      } else if (this.currentMusicType === 'suspense') {
        // Tension: A Minor Dark Drone -> F Minor -> Eb Diminished
        chordProgressions = [
          [55.00, 82.41, 110.00, 164.81, 220.00],
          [43.65, 87.31, 130.81, 174.61, 261.63],
          [61.74, 92.50, 123.47, 185.00, 246.94],
          [48.99, 73.42, 98.00, 146.83, 233.08],
        ];
        melodicMotifs = [
          [440.00, 466.16, 440.00, 415.30],
          [349.23, 370.00, 349.23, 329.63],
          [493.88, 523.25, 493.88, 466.16],
          [392.00, 415.30, 392.00, 370.00],
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 2500 : 3800;
        beatIntervalMs = this.musicIntensity === 3 ? 400 : 550;
        padWaveform = 'sawtooth';
        melodicWaveform = 'sawtooth';

      } else {
        // Default: Cinematic Emotional (D minor 9th -> Bb Maj7 -> F add9 -> Gm7)
        chordProgressions = [
          [73.42, 110.00, 174.61, 261.63, 329.63], // Dm9
          [58.27, 87.31, 146.83, 220.00, 293.66],  // Bb Maj7
          [87.31, 130.81, 220.00, 392.00, 523.25], // F add9
          [98.00, 146.83, 233.08, 349.23, 440.00], // Gm7
        ];
        melodicMotifs = [
          [587.33, 659.25, 523.25, 440.00],
          [466.16, 587.33, 659.25, 880.00],
          [698.46, 659.25, 587.33, 523.25],
          [783.99, 698.46, 587.33, 493.88],
        ];
        chordIntervalMs = this.musicIntensity === 3 ? 3000 : 4500;
        beatIntervalMs = this.musicIntensity === 3 ? 450 : 650;
        padWaveform = 'sawtooth';
        melodicWaveform = 'sine';
      }

      let chordIndex = 0;

      // Play continuous crossfading pad / string chords
      const playChord = (chordFreqs: number[]) => {
        if (!this.isMusicPlaying || !this.ctx || !this.padFilterNode) return;
        const t = this.ctx.currentTime;
        const chordDuration = chordIntervalMs / 1000;

        // Clear previous voices gracefully
        this.activePadOscillators.forEach(osc => {
          try { osc.stop(t + 1.2); } catch {}
        });
        this.activePadOscillators = [];
        this.activePadGains = [];

        // Spawn rich multi-oscillator voices
        chordFreqs.forEach((freq, idx) => {
          if (!this.ctx || !this.padFilterNode) return;

          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const voiceGain = this.ctx.createGain();

          osc1.type = idx < 2 ? padWaveform : 'triangle';
          osc2.type = 'sine';

          // Micro detuning for orchestral width and chorus
          osc1.frequency.setValueAtTime(freq * 0.998, t);
          osc2.frequency.setValueAtTime(freq * 1.002, t);

          const baseVolume = idx === 0 ? 0.22 : idx === 1 ? 0.18 : 0.12;

          voiceGain.gain.setValueAtTime(0.001, t);
          voiceGain.gain.linearRampToValueAtTime(baseVolume, t + 1.0);
          voiceGain.gain.setValueAtTime(baseVolume, t + chordDuration - 0.8);
          voiceGain.gain.exponentialRampToValueAtTime(0.001, t + chordDuration + 1.0);

          osc1.connect(voiceGain);
          osc2.connect(voiceGain);
          voiceGain.connect(this.padFilterNode);

          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + chordDuration + 1.2);
          osc2.stop(t + chordDuration + 1.2);

          this.activePadOscillators.push(osc1, osc2);
          this.activePadGains.push(voiceGain);
        });
      };

      // Trigger initial chord immediately
      playChord(chordProgressions[0]);

      // Chord Progression Loop
      this.chordTimerId = window.setInterval(() => {
        if (!this.isMusicPlaying) return;
        chordIndex = (chordIndex + 1) % chordProgressions.length;
        playChord(chordProgressions[chordIndex]);
      }, chordIntervalMs);

      // Classical Melodic Violin / Harpsichord / Heartbeat Sequencer
      let beatStep = 0;

      this.musicTimerId = window.setInterval(() => {
        if (!this.isMusicPlaying || !this.ctx || !this.musicMasterGain) return;
        const t = this.ctx.currentTime;
        beatStep++;

        // 1. Cello / Double-Bass / Timpani Pulse
        if (beatStep % 2 === 0 || this.currentMusicType === 'handel_sarabande' || this.currentMusicType === 'mozart_nachtmusik') {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();

          bassOsc.type = this.currentMusicType.includes('mozart') ? 'triangle' : 'sine';
          const bassFreq = chordProgressions[chordIndex][0] || 73.42;
          bassOsc.frequency.setValueAtTime(bassFreq, t);
          bassOsc.frequency.exponentialRampToValueAtTime(bassFreq * 0.8, t + 0.26);

          const bassVol = this.musicIntensity === 3 ? 0.38 : 0.24;
          bassGain.gain.setValueAtTime(0.001, t);
          bassGain.gain.linearRampToValueAtTime(bassVol * this.musicVolume, t + 0.03);
          bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

          bassOsc.connect(bassGain);
          bassGain.connect(this.musicMasterGain);

          bassOsc.start(t);
          bassOsc.stop(t + 0.35);
        }

        // 2. Classical Melodic Lines (Handel Sarabande, Mozart Allegro, Bells)
        const notes = melodicMotifs[chordIndex % melodicMotifs.length];
        const activeNote = notes[beatStep % notes.length];

        const melodyOsc = this.ctx.createOscillator();
        const melodyGain = this.ctx.createGain();

        melodyOsc.type = melodicWaveform;
        melodyOsc.frequency.setValueAtTime(activeNote, t);

        const decayTime = this.currentMusicType === 'handel_sarabande' ? 0.65 : this.currentMusicType.includes('mozart') ? 0.32 : 0.6;
        const melodyVol = this.musicIntensity === 3 ? 0.20 : 0.14;

        melodyGain.gain.setValueAtTime(0.001, t);
        melodyGain.gain.linearRampToValueAtTime(melodyVol * this.musicVolume, t + 0.02);
        melodyGain.gain.exponentialRampToValueAtTime(0.0001, t + decayTime);

        melodyOsc.connect(melodyGain);
        melodyGain.connect(this.musicMasterGain);

        melodyOsc.start(t);
        melodyOsc.stop(t + decayTime + 0.05);

      }, beatIntervalMs);

    } catch (e) {
      console.warn('AudioContext playback restricted or suspended:', e);
    }
  }

  public setTensionIntensity(intensity: 1 | 2 | 3) {
    if (this.musicIntensity === intensity) return;
    this.musicIntensity = intensity;

    if (this.isMusicPlaying && this.ctx && this.padFilterNode) {
      const now = this.ctx.currentTime;
      const targetFreq = 
        intensity === 3 ? 1100 : 
        intensity === 2 ? 750 : 500;
      this.padFilterNode.frequency.linearRampToValueAtTime(targetFreq, now + 1.5);
    }
  }

  public stopTensionMusic() {
    this.isMusicPlaying = false;
    
    if (this.chordTimerId) {
      clearInterval(this.chordTimerId);
      this.chordTimerId = null;
    }
    if (this.musicTimerId) {
      clearInterval(this.musicTimerId);
      this.musicTimerId = null;
    }

    if (this.lfoNode) {
      try { this.lfoNode.stop(); } catch {}
      this.lfoNode = null;
    }

    this.activePadOscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.activePadOscillators = [];
    this.activePadGains = [];

    if (this.musicMasterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.musicMasterGain.gain.linearRampToValueAtTime(0.001, now + 0.4);
      setTimeout(() => {
        try { this.musicMasterGain?.disconnect(); } catch {}
        this.musicMasterGain = null;
      }, 450);
    }
  }

  public toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopTensionMusic();
    } else {
      this.startTensionMusic(1);
    }
  }

  // ==========================================
  // SOUND EFFECTS
  // ==========================================

  public playSelect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(this.soundVolume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  public playLock() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.linearRampToValueAtTime(130.81, now + 0.4);

      osc2.frequency.setValueAtTime(164.81, now);
      osc2.frequency.linearRampToValueAtTime(196.00, now + 0.4);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.soundVolume * 0.4, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch {}
  }

  public playCorrect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.35, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.65);
      });
    } catch {}
  }

  public playIncorrect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(146.83, now);
      osc1.frequency.linearRampToValueAtTime(103.83, now + 0.5);

      osc2.frequency.setValueAtTime(138.59, now);
      osc2.frequency.linearRampToValueAtTime(98.00, now + 0.5);

      gain.gain.setValueAtTime(this.soundVolume * 0.3, now);
      gain.gain.linearRampToValueAtTime(this.soundVolume * 0.35, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
    } catch {}
  }

  public playTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.03);

      gain.gain.setValueAtTime(this.soundVolume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  public playUrgentTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(this.soundVolume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  public playLifeline() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.25, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {}
  }

  public playVictory() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const fanfare = [
        { freq: 261.63, start: 0, dur: 0.2 },
        { freq: 392.00, start: 0.18, dur: 0.2 },
        { freq: 523.25, start: 0.36, dur: 0.3 },
        { freq: 659.25, start: 0.65, dur: 0.25 },
        { freq: 783.99, start: 0.90, dur: 0.25 },
        { freq: 1046.50, start: 1.15, dur: 0.9 },
      ];

      fanfare.forEach(item => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + item.start;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.4, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, start + item.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + item.dur + 0.05);
      });
    } catch {}
  }

  public playPhaseAdvance() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [329.63, 440.00, 554.37, 659.25, 880.00];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.3, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {}
  }

  public playElimination() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [293.66, 261.63, 220.00, 174.61, 146.83];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.25, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.55);
      });
    } catch {}
  }
}

export const soundEngine = new SoundEffectsEngine();
