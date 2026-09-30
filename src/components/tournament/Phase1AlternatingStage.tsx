import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { OptionKey } from '../../types/competition';
import {
  Users,
  Trophy,
  School,
  Lock,
  ArrowRight,
  CheckCircle,
  XCircle,
  Sparkles,
  Layers,
  Flame,
  Clock
} from 'lucide-react';
import { CURRENT_AFFAIRS_SNAPSHOT_DATE } from '../../data/sampleQuestions';

export const Phase1AlternatingStage: React.FC = () => {
  const {
    state,
    selectPhase1Option,
    lockPhase1Answer,
    revealPhase1Answer,
    nextPhase1Turn,
  } = useCompetition();

  const tournament = state.tournamentState;
  if (!tournament || !tournament.phase1) return null;

  const p1 = tournament.phase1;
  const activeContestantId = p1.contestantIds[p1.currentTurnIndex];
  const activeContestant = state.contestants.find(c => c.id === activeContestantId);

  const currentQuestion = state.questions.find(q => q.id === p1.currentQuestionId);
  if (!currentQuestion || !activeContestant) return null;

  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
  const isCurrentAffairs = currentQuestion.category?.includes('Current Affairs');

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col gap-4 sm:gap-6">
      
      {/* Top Banner: Phase 1 Qualifiers & Round/Cycle */}
      <div className="bg-surface-card rounded-2xl border border-primary/40 p-3 sm:p-4 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light font-bold shrink-0">
            <Flame className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-white">
                Phase 1: Alternating Qualifier Round
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/15 text-gold border border-gold/30 font-mono">
                Cycle {p1.cycleNumber} of {p1.totalCycles}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Contestants take turns answering questions. Top {state.settings.phaseSettings.phase1AdvancingCount || 4} advance to Phase 2.
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 font-mono font-extrabold text-lg sm:text-xl shadow-lg transition-all ${
              p1.timerRemaining <= 5
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-surface border-primary/60 text-white'
            }`}
          >
            <span>{p1.timerRemaining}</span>
          </div>
        </div>
      </div>

      {/* Contestants Live Turn Ticker (Shows all participants & highlights current turn) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {p1.contestantIds.map((id, index) => {
          const c = state.contestants.find(item => item.id === id);
          if (!c) return null;
          const isCurrentTurn = index === p1.currentTurnIndex;
          const score = p1.scores[id] || 0;

          return (
            <div
              key={id}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                isCurrentTurn
                  ? 'bg-gradient-to-b from-gold/25 via-surface-card to-surface-card border-gold shadow-lg shadow-gold/20 scale-[1.02] z-10'
                  : 'bg-surface-card/70 border-surface-border text-slate-400 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isCurrentTurn ? 'text-gold' : 'text-slate-500'}`}>
                  {isCurrentTurn ? '🔥 CURRENT' : `Slot #${index + 1}`}
                </span>
                <span className="font-mono font-extrabold text-xs text-white">
                  {score} pts
                </span>
              </div>

              <div className="font-bold text-xs text-white truncate" title={c.name}>
                {c.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1" title={c.school}>
                <School className="w-2.5 h-2.5 text-gold shrink-0" />
                <span className="truncate">{c.school}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="relative w-full bg-surface-card/95 rounded-3xl border border-surface-border p-4 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[220px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/15 blur-3xl pointer-events-none rounded-full" />
        
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2 sm:mb-3 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface border border-surface-border text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary-light" />
              {currentQuestion.category || 'General'}
            </span>
            {isCurrentAffairs && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gold/15 border border-gold/30 text-gold-light">
                Snapshot: {CURRENT_AFFAIRS_SNAPSHOT_DATE}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 sm:px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-gold/20 text-gold border border-gold/40">
              +{currentQuestion.points} Points
            </span>
          </div>
        </div>

        {/* Turn callout banner */}
        <div className="py-1 z-10">
          <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Question for {activeContestant.name} ({activeContestant.school}):
          </span>
          <h1 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed tracking-tight">
            {currentQuestion.question}
          </h1>
        </div>

        {/* Status */}
        <div className="mt-2 sm:mt-4 pt-2 border-t border-surface-border/50 text-xs z-10">
          {p1.isRevealed ? (
            p1.selectedOption === currentQuestion.correctAnswer ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-bounce">
                <CheckCircle className="w-4 h-4" />
                Correct! {activeContestant.name} earned +{currentQuestion.points} points.
              </span>
            ) : (
              <span className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Incorrect. Correct answer was {currentQuestion.correctAnswer}. (0 pts)
              </span>
            )
          ) : p1.isLocked ? (
            <span className="text-gold font-bold flex items-center gap-1.5 animate-pulse">
              <Lock className="w-4 h-4" />
              Locked in. Revealing answer...
            </span>
          ) : p1.selectedOption ? (
            <span className="text-slate-300 font-medium">
              Option <strong className="text-gold">{p1.selectedOption}</strong> selected. Lock final answer below.
            </span>
          ) : (
            <span className="text-slate-400">Select an answer choice for {activeContestant.name}.</span>
          )}
        </div>
      </div>

      {/* 4 Choices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
        {optionKeys.map(key => {
          const text = currentQuestion.options[key];
          const isSelected = p1.selectedOption === key;
          const isCorrect = key === currentQuestion.correctAnswer;

          let cardStyle = "bg-surface-card hover:bg-surface-hover border-surface-border text-slate-200";
          let letterStyle = "bg-surface border-surface-border text-slate-400";

          if (p1.isRevealed) {
            if (isCorrect) {
              cardStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 glow-success font-bold";
              letterStyle = "bg-emerald-600 border-emerald-400 text-white font-bold";
            } else if (isSelected && !isCorrect) {
              cardStyle = "bg-rose-950/80 border-rose-500 text-rose-100 glow-danger animate-shake font-bold";
              letterStyle = "bg-rose-600 border-rose-400 text-white font-bold";
            } else {
              cardStyle = "bg-surface-card/50 border-surface-border text-slate-500 opacity-50";
              letterStyle = "bg-surface border-surface-border text-slate-500";
            }
          } else if (p1.isLocked && isSelected) {
            cardStyle = "bg-gold/20 border-gold text-gold-light glow-gold animate-suspense font-bold";
            letterStyle = "bg-gold text-slate-950 font-bold border-gold-light";
          } else if (isSelected) {
            cardStyle = "bg-gold/15 border-gold text-white font-semibold glow-gold";
            letterStyle = "bg-gold text-slate-950 font-bold border-gold-light";
          }

          return (
            <button
              key={key}
              onClick={() => {
                if (!p1.isLocked && !p1.isRevealed) selectPhase1Option(key);
              }}
              disabled={p1.isLocked || p1.isRevealed}
              className={`answer-diamond-btn w-full p-3.5 sm:p-4.5 rounded-2xl border-2 flex items-center gap-3 sm:gap-3.5 text-left transition-all relative overflow-hidden shadow-lg ${cardStyle}`}
            >
              <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center font-mono font-bold text-sm sm:text-base shrink-0 shadow-sm transition-all ${letterStyle}`}>
                {key}
              </span>
              <span className="flex-1 text-xs sm:text-sm md:text-base font-medium leading-snug">
                {text}
              </span>
              {p1.isRevealed && isCorrect && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />}
              {p1.isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-surface-card border border-surface-border">
        <div className="text-xs text-slate-400">
          Turn: <strong className="text-white">{p1.currentTurnIndex + 1} / {p1.contestantIds.length}</strong> in Cycle {p1.cycleNumber}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          {!p1.isLocked && !p1.isRevealed && (
            <button
              onClick={lockPhase1Answer}
              disabled={!p1.selectedOption}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-gold to-gold-dark text-slate-950 shadow-lg shadow-gold/20 disabled:opacity-40 hover:scale-105 active:scale-95 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Final Answer</span>
            </button>
          )}

          {p1.isLocked && !p1.isRevealed && (
            <button
              onClick={revealPhase1Answer}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-primary text-white shadow-lg shadow-primary/30 animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reveal Answer</span>
            </button>
          )}

          {p1.isRevealed && (
            <button
              onClick={nextPhase1Turn}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Next Turn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
