import React, { useEffect } from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  ArrowRight,
  Download,
  RotateCcw,
  BarChart3,
  Share2,
  CheckCircle2,
  Layers,
  Printer
} from 'lucide-react';
import { fireVictoryFireworks, fireConfettiCelebration } from '../../lib/confetti';
import { exportResultsToCsv } from '../../lib/storage';

export const TournamentPodium: React.FC = () => {
  const { state, finishTournament, resetTournament, navigateTo } = useCompetition();
  const tournament = state.tournamentState;

  useEffect(() => {
    fireVictoryFireworks();
    const timer = setTimeout(() => {
      fireConfettiCelebration();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!tournament) return null;

  const finalistIds = tournament.phase3.winnerRankings.length > 0
    ? tournament.phase3.winnerRankings
    : tournament.phase3.finalistIds;

  // Retrieve finalist contestants in ranked order
  const champion = state.contestants.find(c => c.id === finalistIds[0]);
  const runnerUp = state.contestants.find(c => c.id === finalistIds[1]);
  const thirdPlace = state.contestants.find(c => c.id === finalistIds[2]);

  const handleExportCsv = () => {
    exportResultsToCsv(state.contestants, state.attempts);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col items-center gap-6 sm:gap-8 animate-fade-in">
      
      {/* Top Victory Banner */}
      <div className="text-center max-w-3xl flex flex-col items-center gap-2 sm:gap-3">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs sm:text-sm font-extrabold uppercase tracking-widest animate-bounce">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>TOURNAMENT GRAND FINALE</span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-white drop-shadow-lg">
          Championship Victory Podium
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300">
          Congratulations to our top finalists and all participating scholars in the {state.competition.title || 'Quiz Competition'}!
        </p>
      </div>

      {/* 3-Tier Spectacular Podium */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end pt-4 sm:pt-6 pb-2">
        
        {/* 2nd Place: Silver Runner-Up (Left) */}
        {runnerUp && (
          <div className="order-2 md:order-1 flex flex-col items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            {/* Contestant Card */}
            <div className="w-full bg-surface-card rounded-3xl border-2 border-slate-400/50 p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-xl backdrop-blur-xl relative mb-[-12px] z-10 hover:border-slate-300 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-950 font-black text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white/60 mb-2 sm:mb-3">
                🥈
              </div>
              <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-slate-400/20 text-slate-300 border border-slate-400/30 mb-1.5 sm:mb-2">
                2nd Place — Silver
              </span>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-white truncate max-w-full">{runnerUp.name}</h3>
              <p className="text-xs text-slate-400 truncate max-w-full mb-2 sm:mb-3">{runnerUp.school}</p>
              
              <div className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-surface border border-surface-border flex items-center gap-1.5">
                <span className="font-mono font-black text-lg sm:text-xl text-slate-200">{runnerUp.score}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Points</span>
              </div>
            </div>

            {/* Podium Pillar */}
            <div className="w-full h-20 sm:h-28 md:h-36 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-3xl border-x-2 border-b-2 border-slate-500/40 flex items-center justify-center shadow-2xl">
              <span className="font-display font-black text-4xl sm:text-5xl text-slate-500/50">2</span>
            </div>
          </div>
        )}

        {/* 1st Place: Gold Grand Champion (Center, Elevated) */}
        {champion && (
          <div className="order-1 md:order-2 flex flex-col items-center animate-scale-up z-20">
            {/* Crown & Contestant Card */}
            <div className="w-full bg-gradient-to-b from-gold/30 via-surface-card to-surface-card rounded-3xl border-2 border-gold p-5 sm:p-6 md:p-7 flex flex-col items-center text-center shadow-2xl shadow-gold/25 backdrop-blur-xl relative mb-[-12px] z-10 ring-4 ring-gold/30">
              <div className="absolute -top-5 sm:-top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold text-slate-950 flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-gold via-amber-300 to-amber-500 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl border-2 border-white mb-2 sm:mb-3 mt-1 sm:mt-2 animate-pulse">
                🥇
              </div>
              <span className="px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-gold text-slate-950 border border-white mb-1.5 sm:mb-2 shadow-sm font-mono">
                🏆 Grand Champion
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white truncate max-w-full">{champion.name}</h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-200/90 truncate max-w-full mb-3 sm:mb-4">{champion.school}</p>
              
              <div className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-gold/15 border-2 border-gold/40 flex items-center gap-2 shadow-inner">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                <span className="font-mono font-black text-2xl sm:text-3xl text-gold">{champion.score}</span>
                <span className="text-[10px] sm:text-xs text-amber-300/80 font-black uppercase">Points</span>
              </div>
            </div>

            {/* Podium Pillar */}
            <div className="w-full h-28 sm:h-40 md:h-52 bg-gradient-to-b from-amber-600/60 via-amber-900/80 to-slate-900 rounded-b-3xl border-x-2 border-b-2 border-gold/60 flex items-center justify-center shadow-2xl">
              <span className="font-display font-black text-5xl sm:text-7xl text-gold/40">1</span>
            </div>
          </div>
        )}

        {/* 3rd Place: Bronze (Right) */}
        {thirdPlace && (
          <div className="order-3 md:order-3 flex flex-col items-center animate-slide-up" style={{ animationDelay: '350ms' }}>
            {/* Contestant Card */}
            <div className="w-full bg-surface-card rounded-3xl border-2 border-amber-700/50 p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-xl backdrop-blur-xl relative mb-[-12px] z-10 hover:border-amber-600 transition-all">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-amber-400/60 mb-2 sm:mb-3">
                🥉
              </div>
              <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-amber-900/30 text-amber-300 border border-amber-600/30 mb-1.5 sm:mb-2">
                3rd Place — Bronze
              </span>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-white truncate max-w-full">{thirdPlace.name}</h3>
              <p className="text-xs text-slate-400 truncate max-w-full mb-2 sm:mb-3">{thirdPlace.school}</p>
              
              <div className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-surface border border-surface-border flex items-center gap-1.5">
                <span className="font-mono font-black text-lg sm:text-xl text-amber-300">{thirdPlace.score}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Points</span>
              </div>
            </div>

            {/* Podium Pillar */}
            <div className="w-full h-16 sm:h-22 md:h-28 bg-gradient-to-b from-amber-950 via-slate-900 to-slate-900 rounded-b-3xl border-x-2 border-b-2 border-amber-800/40 flex items-center justify-center shadow-2xl">
              <span className="font-display font-black text-3xl sm:text-4xl text-amber-800/40">3</span>
            </div>
          </div>
        )}

      </div>

      {/* Action Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2">
        <button
          onClick={() => fireVictoryFireworks()}
          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-surface-card hover:bg-surface border border-gold/40 text-gold font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-gold/20 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Fire Fireworks 🎆</span>
        </button>

        <button
          onClick={handleExportCsv}
          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-surface-card hover:bg-surface border border-surface-border text-slate-200 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
        >
          <Download className="w-4 h-4 text-primary-light" />
          <span>Export Results (CSV)</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-surface-card hover:bg-surface border border-surface-border text-slate-200 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
        >
          <Printer className="w-4 h-4 text-slate-400" />
          <span>Print / Certificate</span>
        </button>

        <button
          onClick={finishTournament}
          className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-primary/30 transition-all"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Full Leaderboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={resetTournament}
          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-surface-card hover:bg-rose-950/40 border border-surface-border hover:border-rose-500/40 text-slate-400 hover:text-rose-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start New Tournament</span>
        </button>
      </div>

    </div>
  );
};
