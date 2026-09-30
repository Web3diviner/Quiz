import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { OptionKey } from '../../types/competition';
import {
  Zap,
  Clock,
  School,
  Play,
  CheckCircle,
  XCircle,
  SkipForward,
  Flame,
  Award,
  AlertCircle
} from 'lucide-react';

export const Phase2SpeedRunStage: React.FC = () => {
  const {
    state,
    startPhase2ContestantRun,
    submitPhase2Answer,
    finishPhase2ContestantRun,
  } = useCompetition();

  const tournament = state.tournamentState;
  if (!tournament || !tournament.phase2) return null;

  const p2 = tournament.phase2;
  const currentContestantId = p2.activeContestantId;
  const currentContestant = state.contestants.find(c => c.id === currentContestantId);

  if (!currentContestant) return null;

  const currentQ = p2.currentQuestion;
  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
  const isUrgent = p2.isTimerRunning && p2.timerRemaining <= 10;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col gap-4 sm:gap-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-surface-card rounded-2xl border border-emerald-500/40 p-3 sm:p-4 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-white">
                Phase 2: Speed Run Hot-Seat ("Beat the Clock")
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                Contestant {p2.activeContestantIndex + 1} of {p2.contestantIds.length}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Each contestant gets {state.settings.phaseSettings.phase2SpeedRunSeconds || 45} seconds on the hot-seat. Answer as many as possible! Top {state.settings.phaseSettings.phase2AdvancingCount || 3} advance to Grand Finale.
            </p>
          </div>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 font-mono font-black text-xl sm:text-2xl shadow-xl transition-all ${
              p2.timerRemaining === 0
                ? 'bg-rose-950/90 border-rose-500 text-rose-300'
                : isUrgent
                ? 'bg-rose-950/70 border-rose-500 text-rose-300 animate-pulse scale-105'
                : p2.isTimerRunning
                ? 'bg-surface border-emerald-500 text-emerald-400 glow-success'
                : 'bg-surface border-slate-700 text-slate-400'
            }`}
          >
            <span>{p2.timerRemaining}s</span>
          </div>
        </div>
      </div>

      {/* Contestant Spotlight Card */}
      <div className="bg-surface-card rounded-2xl border border-surface-border p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center font-display font-black text-lg sm:text-xl text-primary-light shrink-0">
            {currentContestant.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              In The Hot-Seat:
            </span>
            <h3 className="font-display font-extrabold text-base sm:text-xl text-white truncate">
              {currentContestant.name}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
              <School className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate">{currentContestant.school}</span>
            </p>
          </div>
        </div>

        {/* Speed Run Stats Ticker */}
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-border">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Correct</span>
            <span className="font-mono font-black text-xl sm:text-2xl text-emerald-400">{p2.correctInRun}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Attempted</span>
            <span className="font-mono font-black text-xl sm:text-2xl text-slate-300">{p2.questionsAnsweredInRun}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Speed Score</span>
            <span className="font-mono font-black text-xl sm:text-2xl text-gold">+{p2.scoreInRun} pts</span>
          </div>
        </div>
      </div>

      {/* Not started ready prompt */}
      {!p2.isTimerRunning && p2.timerRemaining > 0 && (
        <div className="bg-surface-card/90 rounded-3xl border-2 border-emerald-500/50 p-6 sm:p-10 text-center shadow-2xl flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3">
            <Clock className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white mb-2">
            Ready, {currentContestant.name}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-5">
            You will have <strong className="text-emerald-400 font-mono font-bold">{state.settings.phaseSettings.phase2SpeedRunSeconds || 45} seconds</strong> to answer as many rapid-fire questions as you can.
          </p>
          <button
            onClick={startPhase2ContestantRun}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-display font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Rapid Run Clock!</span>
          </button>
        </div>
      )}

      {/* Time Expired / Run Complete Action */}
      {p2.timerRemaining === 0 && (
        <div className="bg-surface-card rounded-3xl border border-gold p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center">
          <Award className="w-12 h-12 text-gold mb-2" />
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-1">
            Time's Up! Rapid Run Complete
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            {currentContestant.name} answered <strong className="text-emerald-400">{p2.correctInRun} correct</strong> out of {p2.questionsAnsweredInRun} attempted, scoring <strong className="text-gold font-mono">+{p2.scoreInRun} points</strong>!
          </p>
          <button
            onClick={finishPhase2ContestantRun}
            className="px-7 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl"
          >
            {p2.activeContestantIndex + 1 < p2.contestantIds.length ? 'Queue Next Contestant' : 'View Phase 2 Standings'}
          </button>
        </div>
      )}

      {/* Live Question Display during speed run */}
      {p2.isTimerRunning && currentQ && (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 lg:p-8 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
              {currentQ.category || 'General Knowledge'} (+{currentQ.points} pts)
            </span>
            <h1 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white leading-snug">
              {currentQ.question}
            </h1>
          </div>

          {/* 4 Fast Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {optionKeys.map(key => (
              <button
                key={key}
                onClick={() => submitPhase2Answer(key, false)}
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-surface-card hover:bg-primary/20 hover:border-primary border-2 border-surface-border text-left transition-all flex items-center gap-3 active:scale-95 shadow-md"
              >
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface border border-surface-border flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-slate-300 shrink-0">
                  {key}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white">
                  {currentQ.options[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Pass / Skip button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={() => submitPhase2Answer(null, true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-surface hover:bg-surface-hover border border-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              <SkipForward className="w-4 h-4 text-amber-400" />
              <span>Pass / Skip Question (0 pts)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
