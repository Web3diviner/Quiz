import React, { useMemo } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { calculateLeaderboard, RankedContestant } from '../lib/scoring';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  School,
  ArrowRight,
  Printer,
  Sparkles,
  LayoutDashboard,
  Users,
  ShieldCheck
} from 'lucide-react';
import { Contestant, ContestantAttempt, AnswerRecord } from '../types/competition';

export const ResultPage: React.FC = () => {
  const { state, viewingContestantId, navigateTo, startQuiz } = useCompetition();

  const contestant = state.contestants.find((c: Contestant) => c.id === viewingContestantId);
  const attempt = state.attempts.find((a: ContestantAttempt) => a.contestantId === viewingContestantId);

  const leaderboard = useMemo(() => {
    return calculateLeaderboard(state.contestants, state.attempts);
  }, [state.contestants, state.attempts]);

  const rankingEntry = leaderboard.find((l: RankedContestant) => l.contestant.id === viewingContestantId);

  // Find next queued contestant
  const nextQueuedContestant = state.contestants.find((c: Contestant) => c.status === 'not_started');

  if (!contestant || !attempt) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Trophy className="w-16 h-16 text-gold mb-4" />
        <h2 className="text-2xl font-bold font-display text-white mb-2">No Result Record Selected</h2>
        <p className="text-slate-400 mb-6">Select a contestant attempt from the Leaderboard or Dashboard.</p>
        <button
          onClick={() => navigateTo('dashboard')}
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const accuracy = attempt.answers.length > 0
    ? Math.round((attempt.correctAnswers / attempt.answers.length) * 100)
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8">
      
      {/* Result Certificate Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-card via-surface/95 to-surface-card border-2 border-primary/40 p-5 sm:p-8 md:p-12 shadow-2xl backdrop-blur-2xl text-center flex flex-col items-center">
        
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/25 blur-3xl pointer-events-none rounded-full" />
        
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gold/20 border border-gold/60 flex items-center justify-center text-gold mb-3 sm:mb-4 shadow-xl shadow-gold/20">
          <Trophy className="w-7 h-7 sm:w-9 sm:h-9" />
        </div>

        <span className="px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30 mb-2 sm:mb-3">
          Official Performance Report
        </span>

        <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-1 sm:mb-2">
          {contestant.name}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium flex items-center gap-2 mb-4 sm:mb-6">
          <School className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
          <span>{contestant.school}</span>
        </p>

        {/* Primary Score & Standing Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-3xl my-2 sm:my-4">
          
          <div className="p-3 sm:p-4 rounded-2xl bg-surface/80 border border-surface-border flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Final Score</span>
            <div className="font-mono font-black text-2xl sm:text-3xl text-gold-light">
              {contestant.score}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Points</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-surface/80 border border-surface-border flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Current Standing</span>
            <div className="font-mono font-black text-2xl sm:text-3xl text-primary-light">
              #{rankingEntry?.rank || 1}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">on Leaderboard</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-surface/80 border border-surface-border flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Correct Answers</span>
            <div className="font-mono font-black text-2xl sm:text-3xl text-emerald-400">
              {attempt.correctAnswers} <span className="text-sm sm:text-base text-slate-500 font-normal">/ {attempt.answers.length}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{accuracy}% accuracy</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-surface/80 border border-surface-border flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Total Time</span>
            <div className="font-mono font-black text-2xl sm:text-3xl text-sky-400">
              {attempt.totalTimeSeconds}s
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Recorded duration</span>
          </div>

        </div>

        {/* Lifelines summary if used */}
        {attempt.lifelinesUsed.length > 0 && (
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs text-slate-400 flex-wrap justify-center">
            <span>Lifelines used:</span>
            {attempt.lifelinesUsed.map((l: string) => (
              <span key={l} className="px-2 py-0.5 rounded-md bg-surface border border-surface-border text-slate-200 font-bold font-mono text-[11px]">
                {l}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl no-print">
          {nextQueuedContestant && (
            <button
              onClick={() => startQuiz(nextQueuedContestant.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 transition-all"
            >
              <span>Next Contestant ({nextQueuedContestant.name})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => navigateTo('leaderboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 transition-all"
          >
            <Trophy className="w-4 h-4" />
            <span>View Leaderboard</span>
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 font-semibold text-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Report</span>
          </button>
        </div>

      </div>

      {/* Question-by-Question Attempt Breakdown Table */}
      <div className="bg-surface-card rounded-3xl border border-surface-border p-6 shadow-xl space-y-4">
        <h3 className="font-display font-bold text-lg text-white">
          Question-by-Question Evaluation
        </h3>

        <div className="space-y-3">
          {attempt.answers.map((ans: AnswerRecord, idx: number) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                ans.correct
                  ? 'bg-emerald-950/30 border-emerald-800/40 text-slate-200'
                  : 'bg-rose-950/30 border-rose-800/40 text-slate-200'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs text-slate-400">
                    Q{idx + 1}
                  </span>
                  {ans.category && (
                    <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-surface border border-surface-border text-slate-300">
                      {ans.category}
                    </span>
                  )}
                  {ans.correct ? (
                    <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Correct (+{ans.pointsAwarded} pts)
                    </span>
                  ) : (
                    <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Incorrect (0 pts)
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-white">
                  {ans.questionText}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                <div>
                  <span className="text-slate-400 block text-[10px]">Selected:</span>
                  <span className={`font-bold ${ans.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                    Option {ans.selectedAnswer || 'None'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Correct:</span>
                  <span className="font-bold text-emerald-400">
                    Option {ans.correctAnswer}
                  </span>
                </div>

                {ans.timeTakenSeconds !== undefined && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Time:</span>
                    <span className="text-slate-300">{ans.timeTakenSeconds}s</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
