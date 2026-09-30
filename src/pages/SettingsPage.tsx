import React, { useState } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { QuizSettings, CompetitionState, PhaseSettings, MusicType } from '../types/competition';
import {
  Settings,
  ShieldCheck,
  Clock,
  Zap,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  Upload,
  Image as ImageIcon,
  Save,
  Sliders,
  AlertTriangle,
  Flame,
  Crown,
  Music,
  Play,
  Sparkles,
  Heart,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { exportCompetitionBackup, validateCompetitionImport } from '../lib/storage';
import { soundEngine, MUSIC_TRACKS } from '../lib/audio';

export const SettingsPage: React.FC = () => {
  const {
    state,
    updateSettings,
    updateCompetitionMeta,
    resetScoresOnly,
    resetEntireCompetition,
    importCompetitionState,
    showToast,
    isMusicPlaying,
    toggleMusic,
    setMusicVolume,
    setSoundVolume,
    setMusicType,
  } = useCompetition();

  const [formSettings, setFormSettings] = useState<QuizSettings>(state.settings);
  const [formMeta, setFormMeta] = useState<CompetitionState['competition']>(state.competition);
  const [safeLevelsInput, setSafeLevelsInput] = useState<string>(
    state.settings.safeQuestionNumbers.join(', ')
  );

  const [backupJsonText, setBackupJsonText] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmationText, setResetConfirmationText] = useState('');

  const handlePhaseSettingChange = <K extends keyof PhaseSettings>(key: K, value: PhaseSettings[K]) => {
    setFormSettings(prev => ({
      ...prev,
      phaseSettings: {
        ...prev.phaseSettings,
        [key]: value,
      },
    }));
  };

  const handleMusicTypeSelect = (type: MusicType) => {
    setFormSettings(prev => ({ ...prev, musicType: type }));
    setMusicType(type);
    showToast(`Soundtrack changed to: ${type.toUpperCase()}`, 'info');
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse safe levels
    const parsedSafeLevels = safeLevelsInput
      .split(',')
      .map((s: string) => parseInt(s.trim()))
      .filter((n: number) => !isNaN(n) && n > 0);

    const updated = {
      ...formSettings,
      safeQuestionNumbers: parsedSafeLevels,
    };

    updateSettings(updated);
    updateCompetitionMeta(formMeta);
    showToast('Competition settings saved successfully!', 'success');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image file exceeds 2MB limit.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target?.result as string;
      if (b64) {
        setFormMeta((prev: CompetitionState['competition']) => ({ ...prev, logo: b64 }));
        showToast('Logo uploaded to local state', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImportBackup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupJsonText.trim()) return;

    const validation = validateCompetitionImport(backupJsonText);
    if (!validation.valid || !validation.state) {
      showToast(`Import error: ${validation.error}`, 'error');
      return;
    }

    if (window.confirm('Importing this backup will replace existing competition data. Proceed?')) {
      importCompetitionState(validation.state);
      setBackupJsonText('');
    }
  };

  const handleBackupFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setBackupJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  const pSettings = formSettings.phaseSettings || {
    phase1QuestionsPerContestant: 3,
    phase1SecondsPerQuestion: 25,
    phase1AdvancingCount: 4,
    phase2SpeedRunSeconds: 45,
    phase2AdvancingCount: 3,
    phase3QuestionsPerFinalist: 4,
    phase3SecondsPerQuestion: 15,
  };

  const activeMusic = formSettings.musicType || 'emotional';

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-5 sm:gap-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary-light" />
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Competition Configuration
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure 3-Phase Tournament rules, music soundtrack themes, countdown timers, lifelines, and event backups.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6 sm:space-y-8">
        
        {/* Section 1: Music Soundtrack Themes (Emotional, Classical, Growth, Suspense) */}
        <div className="bg-surface-card rounded-3xl border-2 border-primary/40 p-4 sm:p-6 md:p-8 shadow-2xl space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-white">
                  Soundtrack Atmosphere & Music Themes
                </h2>
                <p className="text-xs text-slate-400">
                  Select your preferred procedural musical style. Generates 100% offline in browser.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleMusic}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                isMusicPlaying
                  ? 'bg-gold text-slate-950 shadow-md shadow-gold/20'
                  : 'bg-surface hover:bg-surface-hover border border-surface-border text-slate-300'
              }`}
            >
              <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
              <span>{isMusicPlaying ? 'Soundtrack: Active' : 'Start Music Preview'}</span>
            </button>
          </div>

          {/* Classical & Procedural Soundtrack Masterpieces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MUSIC_TRACKS.map(track => {
              const isSelected = activeMusic === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => handleMusicTypeSelect(track.id)}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-primary/25 via-surface-card to-surface-card border-primary ring-2 ring-primary/40 shadow-xl scale-[1.01]'
                      : 'bg-surface/60 border-surface-border text-slate-300 hover:border-slate-500 hover:bg-surface'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${track.color}`}>
                        {track.genre}
                      </span>
                      
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-slate-600'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>

                    <h3 className="font-display font-extrabold text-base text-white">{track.title}</h3>
                    <p className="text-xs text-gold font-medium mt-0.5">{track.subtitle}</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{track.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">Procedural Web Audio</span>
                    <span className={`font-bold ${isSelected ? 'text-primary-light' : 'text-slate-400'}`}>
                      {isSelected ? '✓ Currently Active' : 'Click to Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Volume Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-surface border border-surface-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Music Volume</span>
                <span className="font-mono text-xs text-gold">{Math.round(formSettings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={formSettings.musicVolume}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  setFormSettings(prev => ({ ...prev, musicVolume: val }));
                  setMusicVolume(val);
                }}
                className="w-full accent-gold cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-surface-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Sound Effects FX</span>
                <span className="font-mono text-xs text-primary-light">{Math.round(formSettings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={formSettings.soundVolume}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  setFormSettings(prev => ({ ...prev, soundVolume: val }));
                  setSoundVolume(val);
                }}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 3-Phase Tournament Architecture Settings */}
        <div className="bg-surface-card rounded-3xl border-2 border-gold/40 p-4 sm:p-6 md:p-8 shadow-2xl space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-white">
                  3-Phase Tournament Championship Configuration
                </h2>
                <p className="text-xs text-slate-400">
                  Tailor question distribution, timers, and advancement cutoffs across all 3 phases.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold/15 text-gold border border-gold/30">
              Tournament Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Phase 1 Settings */}
            <div className="p-4 rounded-2xl bg-surface border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Phase 1: Alternating Qualifiers</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Questions Per Contestant (Cycles)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={pSettings.phase1QuestionsPerContestant}
                  onChange={e => handlePhaseSettingChange('phase1QuestionsPerContestant', parseInt(e.target.value) || 3)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Timer Per Turn (Seconds)
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={pSettings.phase1SecondsPerQuestion}
                  onChange={e => handlePhaseSettingChange('phase1SecondsPerQuestion', parseInt(e.target.value) || 25)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Contestants Advancing to Phase 2
                </label>
                <input
                  type="number"
                  min="2"
                  max="8"
                  value={pSettings.phase1AdvancingCount}
                  onChange={e => handlePhaseSettingChange('phase1AdvancingCount', parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Bottom scorers eliminated</span>
              </div>
            </div>

            {/* Phase 2 Settings */}
            <div className="p-4 rounded-2xl bg-surface border border-primary/30 space-y-3">
              <div className="flex items-center gap-2 text-primary-light font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Phase 2: Speed Run ("Beat Clock")</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Speed Run Hot-Seat Clock (Seconds)
                </label>
                <input
                  type="number"
                  min="15"
                  max="120"
                  value={pSettings.phase2SpeedRunSeconds}
                  onChange={e => handlePhaseSettingChange('phase2SpeedRunSeconds', parseInt(e.target.value) || 45)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Default: 45 seconds continuous</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Finalists Advancing to Phase 3
                </label>
                <input
                  type="number"
                  min="2"
                  max="4"
                  value={pSettings.phase2AdvancingCount}
                  onChange={e => handlePhaseSettingChange('phase2AdvancingCount', parseInt(e.target.value) || 3)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Top 3 advance to Grand Finale</span>
              </div>
            </div>

            {/* Phase 3 Settings */}
            <div className="p-4 rounded-2xl bg-surface border border-gold/30 space-y-3">
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
                <Crown className="w-4 h-4" />
                <span>Phase 3: Grand Finale Showdown</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Questions Per Finalist (Rounds)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={pSettings.phase3QuestionsPerFinalist}
                  onChange={e => handlePhaseSettingChange('phase3QuestionsPerFinalist', parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Rapid Tension Timer (Seconds)
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={pSettings.phase3SecondsPerQuestion}
                  onChange={e => handlePhaseSettingChange('phase3SecondsPerQuestion', parseInt(e.target.value) || 15)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono focus:border-primary"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Short suspense clock (e.g. 15s)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Competition Identity */}
        <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Sliders className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-lg text-white">Event Branding & Metadata</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Competition Title
              </label>
              <input
                type="text"
                value={formMeta.title || ''}
                onChange={(e) => setFormMeta((prev: CompetitionState['competition']) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Competition Subtitle
              </label>
              <input
                type="text"
                value={formMeta.subtitle || ''}
                onChange={(e) => setFormMeta((prev: CompetitionState['competition']) => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Organizer Committee
              </label>
              <input
                type="text"
                value={formMeta.organizer || ''}
                onChange={(e) => setFormMeta((prev: CompetitionState['competition']) => ({ ...prev, organizer: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Competition Date
              </label>
              <input
                type="date"
                value={formMeta.date || ''}
                onChange={(e) => setFormMeta((prev: CompetitionState['competition']) => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Logo upload */}
          <div className="pt-2 flex items-center gap-4">
            {formMeta.logo && (
              <img src={formMeta.logo} alt="Logo" className="w-12 h-12 object-contain rounded-xl bg-surface border border-surface-border p-1" />
            )}
            <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-xs text-slate-300 font-semibold cursor-pointer">
              <ImageIcon className="w-4 h-4 text-gold" />
              <span>Upload Custom Logo (.png, .jpg)</span>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
            {formMeta.logo && (
              <button
                type="button"
                onClick={() => setFormMeta((prev: CompetitionState['competition']) => ({ ...prev, logo: undefined }))}
                className="text-xs text-rose-400 hover:underline"
              >
                Remove Logo
              </button>
            )}
          </div>
        </div>

        {/* Section 4: Classic Quiz Engine & Rules */}
        <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Zap className="w-5 h-5 text-primary-light" />
            <h2 className="font-display font-bold text-lg text-white">Classic Quiz Engine & Lifelines</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Questions Per Contestant
              </label>
              <input
                type="number"
                min="0"
                value={formSettings.questionsPerContestant}
                onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, questionsPerContestant: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm font-mono focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">0 = Use all questions in bank</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Suspense Reveal Delay (ms)
              </label>
              <input
                type="number"
                step="100"
                min="0"
                value={formSettings.suspenseDelayMs}
                onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, suspenseDelayMs: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm font-mono focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Default: 1200ms</span>
            </div>

            <div className="flex flex-col justify-center space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={formSettings.randomizeQuestions}
                  onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, randomizeQuestions: e.target.checked }))}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Randomize Question Order</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={formSettings.showCorrectAnswerAfterEach}
                  onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, showCorrectAnswerAfterEach: e.target.checked }))}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Show Correct Answer on Reveal</span>
              </label>
            </div>
          </div>

          {/* Lifelines toggles */}
          <div className="pt-3 border-t border-surface-border">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Classic Lifelines
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-border cursor-pointer text-xs font-semibold text-slate-200">
                <input
                  type="checkbox"
                  checked={formSettings.enableFiftyFifty}
                  onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, enableFiftyFifty: e.target.checked }))}
                  className="rounded text-primary focus:ring-0"
                />
                <span>50:50 Lifeline</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-border cursor-pointer text-xs font-semibold text-slate-200">
                <input
                  type="checkbox"
                  checked={formSettings.enableAudiencePoll}
                  onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, enableAudiencePoll: e.target.checked }))}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Ask the Audience</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-border cursor-pointer text-xs font-semibold text-slate-200">
                <input
                  type="checkbox"
                  checked={formSettings.enableSkipQuestion}
                  onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, enableSkipQuestion: e.target.checked }))}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Skip Question</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-border cursor-pointer text-xs font-semibold text-slate-200">
                <input
                  type="checkbox"
                  checked={formSettings.enableExtraTime}
                  onChange={(e) => setFormSettings((prev: QuizSettings) => ({ ...prev, enableExtraTime: e.target.checked }))}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Extra Time</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save All Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-display font-bold text-sm uppercase tracking-wider shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Save All Competition Settings</span>
          </button>
        </div>
      </form>

      {/* Backup & Restore Section */}
      <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
          <Download className="w-5 h-5 text-primary-light" />
          <h2 className="font-display font-bold text-lg text-white">Full Event Backup & Restore</h2>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Export your entire competition state (contestants, scores, verified questions, and configuration) to a portable JSON backup file.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => exportCompetitionBackup(state)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup (.json)</span>
          </button>

          <label className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 font-semibold text-xs cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-primary-light" />
            <span>Upload Backup File</span>
            <input type="file" accept=".json" onChange={handleBackupFileUpload} className="hidden" />
          </label>
        </div>

        {backupJsonText && (
          <form onSubmit={handleImportBackup} className="mt-4 p-4 rounded-2xl bg-surface border border-primary/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold">Ready to Restore Backup JSON</span>
              <button type="button" onClick={() => setBackupJsonText('')} className="text-xs text-slate-400 hover:text-white">Cancel</button>
            </div>
            <textarea
              rows={4}
              value={backupJsonText}
              onChange={(e) => setBackupJsonText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-card border border-surface-border text-white text-xs font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Confirm & Restore Backup
            </button>
          </form>
        )}
      </div>

      {/* Danger Zone: Resets */}
      <div className="bg-rose-950/20 rounded-3xl border border-rose-900/50 p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-rose-900/40">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h2 className="font-display font-bold text-lg text-rose-300">Danger Zone & Reset Hub</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-white">Reset Scores Only</h4>
            <p className="text-xs text-slate-400">
              Clears all contestant attempts and resets scores to 0, preserving registered contestants and question bank.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all scores and attempts? Contestant names will remain.')) {
                resetScoresOnly();
              }
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-slate-700 text-slate-300 text-xs font-semibold shrink-0"
          >
            Reset Scores
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-rose-900/30">
          <div>
            <h4 className="font-bold text-sm text-rose-300">Factory Reset Competition</h4>
            <p className="text-xs text-slate-400">
              Deletes all contestants, restores 100 default verified questions, and resets all settings to defaults.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-rose-200 text-xs font-bold uppercase tracking-wider border border-rose-700 shrink-0"
          >
            Factory Reset
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-md bg-surface-card rounded-3xl border border-rose-500/50 p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-display font-bold text-lg text-white">Confirm Factory Reset</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              This action will erase all custom data and restore default competition settings. To confirm, type <strong className="text-rose-400 font-mono">RESET</strong> below:
            </p>
            <input
              type="text"
              value={resetConfirmationText}
              onChange={(e) => setResetConfirmationText(e.target.value)}
              placeholder="Type RESET"
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-rose-600/50 text-white font-mono text-sm focus:outline-none mb-4"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setResetConfirmationText('');
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={resetConfirmationText !== 'RESET'}
                onClick={() => {
                  resetEntireCompetition();
                  setShowResetModal(false);
                  setResetConfirmationText('');
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-40"
              >
                Permanently Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
