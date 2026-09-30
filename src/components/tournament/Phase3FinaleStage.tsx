import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { OptionKey } from '../../types/competition';
import {
  Trophy,
  Crown,
  Lock,
  ArrowRight,
  CheckCircle,
  XCircle,
  Sparkles,
  Flame,
  Zap,
  Volume2
} from 'lucide-react';
import { CURRENT_AFFAIRS_SNAPSHOT_DATE } from '../../data/sampleQuestions';

export const Phase3FinaleStage: React.FC = () => {
  const {
    state,
    selectPhase3Option,
    lockPhase3Answer,
    revealPhase3Answer,
    nextPhase3Turn,
  } = useCompetition();

  const tournament = state.tournamentState;
  if (!tournament || !tournament.phase3) return null;

  const p3 = tournament.phase3;
  const activeFinalistId = p3.finalistIds[p3.activeTurnIndex];
  const activeContestant = state.contestants.find(c => c.id === activeFinalistId);
  const currentQuestion = p3.currentQuestion;

  if (!currentQuestion || !activeContestant) return null;

  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
  const isCurrentAffairs = currentQuestion.category?.includes('Current Affairs');

  // Sorted live rankings for the 3 finalists
  const rankedFinalists = [...p3.finalistIds]
    .map(id => {
      const c = state.contestants.find(item => item.id === id);
      return {
        id,
        name: c?.name || 'Contestant',
        school: c?.school || '',
        score: c?.score || 0,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col gap-4 sm:gap-6 animate-fade-in">
      
      {/* Top Banner: Grand Finale Showdown Header */}
      <div className="bg-gradient-to-r from-surface-card via-primary-dark/40 to-surface-card rounded-3xl border-2 border-gold/50 p-3.5 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-gold via-amber-300 to-amber-500 border-2 border-white/40 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-gold/30 animate-pulse shrink-0">
            <Crown className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-black text-base sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-white">
                Phase 3: Grand Finale Showdown
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-gold text-slate-950 border border-white font-mono shadow-sm">
                Round {p3.cycleNumber} / {p3.totalCycles}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              High-stakes championship showdown! 15s rapid clocks & +10 bonus points per correct answer!
            </p>
          </div>
        </div>

        {/* Rapid 15s Tension Clock */}
        <div className="flex items-center gap-3">
          <div
            className={`flex flex-col items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 min-w-[70px] sm:min-w-[80px] rounded-2xl border-2 font-mono font-black text-xl sm:text-2xl shadow-xl transition-all ${
              p3.timerRemaining <= 5
                ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-ping-slow'
                : 'bg-surface border-gold/60 text-gold shadow-gold/20'
            }`}
          >
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">TIME</span>
            <span className="leading-tight">{p3.timerRemaining}s</span>
          </div>
        </div>
      </div>

      {/* 3 Finalists Standings Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        {p3.finalistIds.map((id, index) => {
          const c = state.contestants.find(item => item.id === id);
          if (!c) return null;
          const isCurrentTurn = index === p3.activeTurnIndex;
          const currentRank = rankedFinalists.findIndex(item => item.id === id) + 1;

          const rankBadge =
            currentRank === 1 ? '🥇 1st' :
            currentRank === 2 ? '🥈 2nd' : '🥉 3rd';

          return (
            <div
              key={id}
              className={`p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                isCurrentTurn
                  ? 'bg-gradient-to-b from-gold/20 via-surface-card to-surface-card border-gold shadow-xl shadow-gold/20 scale-[1.01] ring-2 ring-gold/50'
                  : 'bg-surface-card/80 border-surface-border opacity-85'
              }`}
            >
              {isCurrentTurn && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
              )}
              
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isCurrentTurn 
                    ? 'bg-gold text-slate-950 font-mono shadow-sm'
                    : 'bg-surface text-slate-400 border border-surface-border'
                }`}>
                  {isCurrentTurn ? '🔥 STAGE NOW' : `Finalist #${index + 1}`}
                </span>
                <span className="text-xs font-bold text-amber-300 font-mono bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">
                  {rankBadge}
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 mt-1">
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 ${
                  isCurrentTurn 
                    ? 'bg-gold text-slate-950 shadow-md' 
                    : 'bg-surface-border text-slate-300'
                }`}>
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-white text-sm sm:text-base truncate">{c.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{c.school}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-black text-lg sm:text-xl text-gold">{c.score}</div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">PTS</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Finale Question Arena */}
      <div className="bg-surface-card rounded-3xl border-2 border-gold/40 p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Question Header & Category */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-surface-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold text-xs">
              {currentQuestion.category || 'Championship Finale'}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-surface border border-surface-border text-slate-300 font-mono text-xs">
              Valued at {currentQuestion.points + 10} pts
            </span>
          </div>

          {isCurrentAffairs && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Snapshot: {CURRENT_AFFAIRS_SNAPSHOT_DATE}</span>
            </div>
          )}
        </div>

        {/* Contestant Prompt Banner */}
        <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-xs font-bold">
          <Flame className="w-4 h-4 text-gold" />
          <span>Final Question for {activeContestant.name} ({activeContestant.school})</span>
        </div>

        {/* Question Text */}
        <h1 className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-snug mb-5 sm:mb-6">
          {currentQuestion.question}
        </h1>

        {/* 4 Multi-Choice Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 mb-6">
          {optionKeys.map(key => {
            const isSelected = p3.selectedOption === key;
            const isCorrectAnswer = currentQuestion.correctAnswer === key;
            
            let btnStyle = 'bg-surface/80 border-surface-border text-slate-200 hover:border-gold/60 hover:bg-surface';

            if (isSelected && !p3.isLocked && !p3.isRevealed) {
              btnStyle = 'bg-primary/30 border-primary text-white ring-2 ring-primary/50 shadow-lg shadow-primary/20';
            } else if (p3.isLocked && !p3.isRevealed) {
              if (isSelected) {
                btnStyle = 'bg-amber-500/20 border-gold text-gold ring-2 ring-gold/60 animate-pulse';
              } else {
                btnStyle = 'bg-surface/40 border-surface-border text-slate-500 opacity-60';
              }
            } else if (p3.isRevealed) {
              if (isCorrectAnswer) {
                btnStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-200 ring-2 ring-emerald-400 font-bold shadow-lg shadow-emerald-900/40';
              } else if (isSelected && !isCorrectAnswer) {
                btnStyle = 'bg-rose-500/25 border-rose-500 text-rose-200 ring-2 ring-rose-400 opacity-90';
              } else {
                btnStyle = 'bg-surface/30 border-surface-border text-slate-500 opacity-40';
              }
            }

            return (
              <button
                key={key}
                disabled={p3.isLocked || p3.isRevealed}
                onClick={() => selectPhase3Option(key)}
                className={`p-3.5 sm:p-4.5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3 sm:gap-4 ${btnStyle}`}
              >
                <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-mono font-black text-xs sm:text-sm border shrink-0 ${
                  isSelected 
                    ? 'bg-gold text-slate-950 border-gold shadow-sm'
                    : 'bg-surface border-surface-border text-slate-300'
                }`}>
                  {key}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium flex-1">
                  {currentQuestion.options[key]}
                </span>

                {p3.isRevealed && isCorrectAnswer && (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0 animate-scale-up" />
                )}
                {p3.isRevealed && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 shrink-0 animate-scale-up" />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions & Host Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-surface-border">
          <div className="text-xs text-slate-400">
            {!p3.selectedOption && !p3.isRevealed && 'Select an option to lock in the finalist answer.'}
            {p3.selectedOption && !p3.isLocked && !p3.isRevealed && 'Option selected. Click "Lock Final Answer".'}
            {p3.isLocked && !p3.isRevealed && 'Locked in! Revealing result...'}
            {p3.isRevealed && (
              <span className="font-bold text-white">
                {p3.selectedOption === currentQuestion.correctAnswer
                  ? '🎉 Correct! +25 Points awarded!'
                  : `❌ Incorrect! The correct answer was (${currentQuestion.correctAnswer}).`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Lock Button */}
            {!p3.isRevealed && (
              <button
                disabled={!p3.selectedOption || p3.isLocked}
                onClick={lockPhase3Answer}
                className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gold to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-gold/20 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Lock Answer</span>
              </button>
            )}

            {/* Host Reveal (Manual override if needed) */}
            {p3.isLocked && !p3.isRevealed && (
              <button
                onClick={revealPhase3Answer}
                className="flex-1 sm:flex-none px-5 py-2.5 sm:py-3 rounded-xl bg-surface hover:bg-surface-card border border-surface-border text-slate-200 font-bold text-xs sm:text-sm"
              >
                Reveal Now
              </button>
            )}

            {/* Next Turn / Complete Finals Button */}
            {p3.isRevealed && (
              <button
                onClick={nextPhase3Turn}
                className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all animate-bounce"
              >
                <span>
                  {p3.activeTurnIndex + 1 >= p3.finalistIds.length && p3.cycleNumber >= p3.totalCycles
                    ? '🏆 View Championship Podium'
                    : 'Next Finalist Turn'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
