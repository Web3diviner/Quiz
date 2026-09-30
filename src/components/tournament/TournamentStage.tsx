import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { TournamentOverview } from './TournamentOverview';
import { Phase1AlternatingStage } from './Phase1AlternatingStage';
import { Phase1Summary } from './Phase1Summary';
import { Phase2SpeedRunStage } from './Phase2SpeedRunStage';
import { Phase2Summary } from './Phase2Summary';
import { Phase3FinaleStage } from './Phase3FinaleStage';
import { TournamentPodium } from './TournamentPodium';
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Flame,
  Zap,
  Crown,
  Trophy
} from 'lucide-react';

export const TournamentStage: React.FC = () => {
  const {
    state,
    resetTournament,
    setTournamentPhase,
    toggleMusic,
    isMusicPlaying,
    navigateTo
  } = useCompetition();

  const tournament = state.tournamentState;

  if (!tournament || !tournament.isActive || tournament.currentPhase === 'overview') {
    return <TournamentOverview />;
  }

  const phaseStepBadge = (phase: string) => {
    switch (phase) {
      case 'phase1_qualifiers':
      case 'phase1_summary':
        return { label: 'Phase 1: Qualifiers', icon: Flame, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' };
      case 'phase2_speedrun':
      case 'phase2_summary':
        return { label: 'Phase 2: Speed Run', icon: Zap, color: 'text-primary-light bg-primary/10 border-primary/30' };
      case 'phase3_finale':
        return { label: 'Phase 3: Grand Finale', icon: Crown, color: 'text-gold bg-gold/10 border-gold/30' };
      case 'podium':
        return { label: 'Championship Podium', icon: Trophy, color: 'text-gold bg-gold/15 border-gold/40' };
      default:
        return { label: 'Tournament', icon: Sparkles, color: 'text-white bg-surface border-surface-border' };
    }
  };

  const currentBadge = phaseStepBadge(tournament.currentPhase);
  const IconComponent = currentBadge.icon;

  return (
    <div className="w-full flex-1 flex flex-col pb-6 sm:pb-10">
      
      {/* Tournament Top Control & Progress Ribbon */}
      <div className="w-full border-b border-surface-border/60 bg-surface/80 backdrop-blur-md px-3 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Phase Indicator Breadcrumb */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${currentBadge.color}`}>
            <IconComponent className="w-3.5 h-3.5 shrink-0" />
            <span>{currentBadge.label}</span>
          </div>
        </div>

        {/* Host Live Actions */}
        <div className="flex items-center gap-2">
          {/* Tension Music Toggle */}
          <button
            onClick={toggleMusic}
            title={isMusicPlaying ? 'Pause Tension Music' : 'Play Tension Music'}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isMusicPlaying
                ? 'bg-gold/20 border-gold text-gold shadow-sm'
                : 'bg-surface border-surface-border text-slate-400 hover:text-white'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{isMusicPlaying ? 'Music: ON' : 'Music: OFF'}</span>
          </button>

          {/* Reset Tournament Host Button */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to end or reset the active tournament?')) {
                resetTournament();
              }
            }}
            title="Reset Tournament"
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-surface hover:bg-rose-950/40 border border-surface-border hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Tournament</span>
          </button>
        </div>
      </div>

      {/* Render Active Tournament Sub-View */}
      <div className="flex-1 flex flex-col justify-center py-4">
        {tournament.currentPhase === 'phase1_qualifiers' && <Phase1AlternatingStage />}
        {tournament.currentPhase === 'phase1_summary' && <Phase1Summary />}
        {tournament.currentPhase === 'phase2_speedrun' && <Phase2SpeedRunStage />}
        {tournament.currentPhase === 'phase2_summary' && <Phase2Summary />}
        {tournament.currentPhase === 'phase3_finale' && <Phase3FinaleStage />}
        {tournament.currentPhase === 'podium' && <TournamentPodium />}
      </div>

    </div>
  );
};
