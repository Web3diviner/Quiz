import React, { useState, useRef, useEffect } from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import {
  Trophy,
  Users,
  HelpCircle,
  Settings,
  LayoutDashboard,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Menu,
  X,
  Sparkles,
  Download,
  LucideIcon,
  Music,
  Flame,
  Sliders,
  Heart,
  Crown,
  Radio,
} from 'lucide-react';
import { exportCompetitionBackup } from '../../lib/storage';
import { ViewScreen, MusicType } from '../../types/competition';
import { MUSIC_TRACKS } from '../../lib/audio';

interface NavItem {
  id: ViewScreen;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

export const Navbar: React.FC = () => {
  const {
    state,
    currentScreen,
    navigateTo,
    isPresentationMode,
    togglePresentationMode,
    updateSettings,
    resumeQuiz,
    isMusicPlaying,
    toggleMusic,
    setMusicVolume,
    setSoundVolume,
    setMusicType,
  } = useCompetition();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioPopoverOpen, setAudioPopoverOpen] = useState(false);
  const audioPopoverRef = useRef<HTMLDivElement>(null);

  const hasActiveQuiz = !!(state.activeContestantId && state.activeQuizState);
  const isTournamentActive = !!(state.tournamentState && state.tournamentState.isActive);
  const activeMusicType = state.settings.musicType || 'emotional';

  // Close audio popover on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (audioPopoverRef.current && !audioPopoverRef.current.contains(e.target as Node)) {
        setAudioPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    updateSettings({ soundEnabled: !state.settings.soundEnabled });
  };

  const navItems: NavItem[] = [
    { id: 'landing', label: 'Arena', icon: Sparkles },
    { id: 'tournament', label: 'Tournament', icon: Flame, badge: isTournamentActive ? 'LIVE' : undefined },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contestants', label: 'Contestants', icon: Users, badge: state.contestants.length },
    { id: 'questions', label: 'Question Bank', icon: HelpCircle, badge: state.questions.length },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border/80 bg-surface/90 backdrop-blur-xl no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            {state.competition.logo ? (
              <img src={state.competition.logo} alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
            ) : (
              <Trophy className="w-5 h-5 text-gold" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-white tracking-tight">
                {state.competition.title || 'QuizArena'}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30 rounded-full">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden md:block">
              {state.competition.subtitle || 'Interschool Championship'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/20 text-white border border-primary/40 shadow-sm shadow-primary/20'
                    : 'text-slate-300 hover:text-white hover:bg-surface-hover'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-light' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-extrabold rounded-full ${
                    item.badge === 'LIVE' 
                      ? 'bg-gold text-slate-950 animate-pulse font-mono'
                      : 'bg-surface-card text-slate-300 border border-slate-700/50'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Active Tournament Shortcut */}
          {isTournamentActive && currentScreen !== 'tournament' && (
            <button
              onClick={() => navigateTo('tournament')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gold text-slate-950 shadow-md shadow-gold/20 animate-pulse hover:bg-amber-300 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Active Tournament</span>
            </button>
          )}

          {/* Active Classic Quiz Shortcut */}
          {hasActiveQuiz && currentScreen !== 'quiz' && !isTournamentActive && (
            <button
              onClick={resumeQuiz}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse hover:bg-emerald-500/30 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Quiz</span>
            </button>
          )}

          {/* Audio & Music Popover Button */}
          <div className="relative" ref={audioPopoverRef}>
            <button
              onClick={() => setAudioPopoverOpen(prev => !prev)}
              title="Sound & Music Atmosphere Settings"
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                isMusicPlaying
                  ? 'bg-gold/20 border-gold/60 text-gold shadow-md shadow-gold/20'
                  : 'bg-surface-card hover:bg-surface-hover border-surface-border text-slate-300 hover:text-white'
              }`}
            >
              {isMusicPlaying ? (
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-3.5 bg-gold animate-music-bar-1 rounded-full" />
                  <span className="w-0.5 h-4 bg-gold animate-music-bar-2 rounded-full" />
                  <span className="w-0.5 h-2 bg-gold animate-music-bar-3 rounded-full" />
                </div>
              ) : state.settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Audio Dropdown Popover */}
            {audioPopoverOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm max-h-[85vh] overflow-y-auto bg-surface-card border-2 border-surface-border rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl z-50 animate-scale-up space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-gold" />
                    <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Atmospheric Audio</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Web Audio API</span>
                </div>

                {/* Music Play / Pause Ribbon */}
                <div className="p-3 rounded-2xl bg-surface border border-surface-border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Soundtrack Atmosphere</span>
                      {isMusicPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Live procedural ambient engine</p>
                  </div>
                  <button
                    onClick={toggleMusic}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      isMusicPlaying
                        ? 'bg-gold text-slate-950 shadow-md shadow-gold/20'
                        : 'bg-surface-card border border-surface-border text-slate-300 hover:text-white'
                    }`}
                  >
                    {isMusicPlaying ? 'Active' : 'Play'}
                  </button>
                </div>

                {/* Music Style / Genre Selector (Emotional, Classical, Growth, Suspense) */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                    Soundtrack Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {MUSIC_TRACKS.map(track => {
                      const isSelected = activeMusicType === track.id;
                      return (
                        <button
                          key={track.id}
                          onClick={() => setMusicType(track.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary/25 border-primary text-white shadow-md ring-1 ring-primary/40'
                              : 'bg-surface border-surface-border text-slate-400 hover:border-slate-600 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-extrabold truncate">{track.title}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                          </div>
                          <span className="text-[9px] text-slate-400 leading-tight block truncate">
                            {track.genre}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Music Volume Slider */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                    <span>Music Volume</span>
                    <span className="font-mono text-gold">{Math.round(state.settings.musicVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={state.settings.musicVolume}
                    onChange={e => setMusicVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-surface rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>

                {/* Sound FX Volume Slider */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                    <span>Sound Effects FX</span>
                    <span className="font-mono text-primary-light">{Math.round(state.settings.soundVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={state.settings.soundVolume}
                    onChange={e => setSoundVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Master Mute Toggle */}
                <div className="pt-2 border-t border-surface-border flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Master Audio Engine</span>
                  <button
                    onClick={toggleSound}
                    className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                      state.settings.soundEnabled ? 'text-emerald-400 hover:text-emerald-300' : 'text-rose-400 hover:text-rose-300'
                    }`}
                  >
                    {state.settings.soundEnabled ? 'Enabled' : 'Muted'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Presentation Mode */}
          <button
            onClick={togglePresentationMode}
            title={isPresentationMode ? "Exit Presentation Mode" : "Enter Projector / Presentation Mode"}
            className={`p-2 rounded-xl border transition-colors ${
              isPresentationMode 
                ? 'bg-gold/20 border-gold/50 text-gold' 
                : 'bg-surface-card hover:bg-surface-hover border-surface-border text-slate-300 hover:text-white'
            }`}
          >
            {isPresentationMode ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Quick Export Backup */}
          <button
            onClick={() => exportCompetitionBackup(state)}
            title="Download Competition Backup (.json)"
            className="hidden sm:flex p-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-xl bg-surface-card border border-surface-border text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-border bg-surface-card/95 px-4 pt-2 pb-4 space-y-1 animate-slide-up">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-primary/20 text-white border border-primary/30'
                    : 'text-slate-300 hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary-light' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    item.badge === 'LIVE'
                      ? 'bg-gold text-slate-950 font-mono'
                      : 'bg-surface text-slate-300 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
