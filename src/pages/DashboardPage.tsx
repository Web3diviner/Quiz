import React from 'react';
import { useCompetition } from '../context/CompetitionContext';
import {
  Users,
  Trophy,
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  ArrowRight,
  Download,
  Settings,
  School,
  AlertCircle,
  Crown,
  Zap,
  Sparkles
} from 'lucide-react';
import { calculateLeaderboard } from '../lib/scoring';
import { exportCompetitionBackup } from '../lib/storage';
import { Contestant } from '../types/competition';

export const DashboardPage: React.FC = () => {
  const {
    state,
    navigateTo,
    startQuiz,
    resumeQuiz,
    resetContestantAttempt,
    startTournament,
  } = useCompetition();

  const totalContestants = state.contestants.length;
  const completedContestants = state.contestants.filter((c: Contestant) => c.status === 'completed' || c.status === 'eliminated').length;
  const remainingContestants = state.contestants.filter((c: Contestant) => c.status === 'not_started').length;
  const activeQuizContestant = state.contestants.find((c: Contestant) => c.id === state.activeContestantId);

  const tournament = state.tournamentState;
  const isTournamentActive = !!(tournament && tournament.isActive);

  const leaderboard = calculateLeaderboard(state.contestants, state.attempts);
  const currentLeader = leaderboard.length > 0 && leaderboard[0].score > 0 ? leaderboard[0] : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
            Organizer Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {state.competition.title} • {state.competition.date || new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            onClick={() => navigateTo('tournament')}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-gold to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-gold/20 transition-all"
          >
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>{isTournamentActive ? 'Tournament (Active)' : 'Tournament Arena'}</span>
          </button>

          <button
            onClick={() => navigateTo('contestants')}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contestant</span>
          </button>

          <button
            onClick={() => exportCompetitionBackup(state)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {/* Tournament Active Spotlight Banner */}
      {isTournamentActive && (
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-gold/20 via-surface-card to-surface-card border-2 border-gold shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-scale-up">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold text-slate-950 flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg shadow-gold/30 animate-pulse shrink-0">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/40">
                  LIVE TOURNAMENT IN PROGRESS
                </span>
                <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              </div>
              <h3 className="font-display font-black text-base sm:text-xl text-white mt-1 truncate">
                Active Phase: {tournament.currentPhase.replace(/_/g, ' ').toUpperCase()}
              </h3>
              <p className="text-xs text-slate-300">
                {tournament.participatingContestantIds.length} Contestants competing across Qualifiers, Speed Runs & Grand Finale.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('tournament')}
            className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-2xl bg-gold hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-gold/30 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Jump to Stage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Classic Session Spotlight Banner */}
      {!isTournamentActive && activeQuizContestant && state.activeQuizState && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-surface-card to-surface-card border-2 border-emerald-500/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 animate-pulse-glow">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-lg sm:text-xl shrink-0">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Live Classic Round In Progress
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white truncate">
                {activeQuizContestant.name} ({activeQuizContestant.school})
              </h3>
              <p className="text-xs text-slate-400">
                Question {state.activeQuizState.questionIndex + 1} • Current Score: <strong className="text-gold">{state.activeQuizState.currentScore} pts</strong>
              </p>
            </div>
          </div>

          <button
            onClick={resumeQuiz}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 transition-all shrink-0"
          >
            Resume Live Stage
          </button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-surface-border flex items-center gap-3 sm:gap-4 shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Contestants</span>
            <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {totalContestants}
            </div>
            <span className="text-[11px] text-slate-400">
              {completedContestants} done • {remainingContestants} queued
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-surface-border flex items-center gap-3 sm:gap-4 shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Progress</span>
            <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {totalContestants > 0 ? Math.round((completedContestants / totalContestants) * 100) : 0}%
            </div>
            <span className="text-[11px] text-slate-400">
              {completedContestants} of {totalContestants} finished
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-surface-border flex items-center gap-3 sm:gap-4 shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shrink-0">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Question Bank</span>
            <div className="font-display font-extrabold text-xl sm:text-2xl text-gold-light">
              {state.questions.length}
            </div>
            <span className="text-[11px] text-slate-400">
              {state.settings.questionsPerContestant > 0 ? `${state.settings.questionsPerContestant} / run` : '100 Verified Qs'}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-surface-border flex items-center gap-3 sm:gap-4 shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Leader</span>
            <div className="font-display font-bold text-sm sm:text-base lg:text-lg text-white truncate max-w-[140px]">
              {currentLeader ? currentLeader.contestant.name : '—'}
            </div>
            <span className="text-[11px] text-gold font-mono font-semibold">
              {currentLeader ? `${currentLeader.score} pts` : 'No scores yet'}
            </span>
          </div>
        </div>

      </div>

      {/* Contestant Roster & Quick Launch Table */}
      <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-light" />
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              Contestant Roster & Launch Queue
            </h2>
          </div>
          <button
            onClick={() => navigateTo('contestants')}
            className="text-xs font-bold text-primary-light hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Manage All ({totalContestants})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {state.contestants.length === 0 ? (
          <div className="text-center py-10">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No contestants registered yet.</p>
            <button
              onClick={() => navigateTo('contestants')}
              className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
            >
              Add First Contestant
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-surface-border">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Contestant</th>
                  <th className="py-3 px-4">School Represented</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Score</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50">
                {state.contestants.map((c: Contestant, index: number) => {
                  let statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">
                      Not Started
                    </span>
                  );

                  if (c.status === 'playing') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        In Arena
                      </span>
                    );
                  } else if (c.status === 'qualified_phase2') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary-light border border-primary/40">
                        Qualified Phase 2
                      </span>
                    );
                  } else if (c.status === 'qualified_phase3') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold/20 text-gold border border-gold/40">
                        Finalist (Phase 3)
                      </span>
                    );
                  } else if (c.status === 'champion') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-gold text-slate-950">
                        🥇 Champion
                      </span>
                    );
                  } else if (c.status === 'runner_up') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-300 text-slate-950">
                        🥈 2nd Place
                      </span>
                    );
                  } else if (c.status === 'third_place') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                        🥉 3rd Place
                      </span>
                    );
                  } else if (c.status === 'completed') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary-light border border-primary/30">
                        Completed
                      </span>
                    );
                  } else if (c.status === 'eliminated') {
                    statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Eliminated
                      </span>
                    );
                  }

                  return (
                    <tr key={c.id} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-xs">
                        {index + 1}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {c.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="truncate max-w-[200px]">{c.school}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {statusBadge}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-gold">
                        {c.score} pts
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {c.status === 'not_started' ? (
                            <button
                              onClick={() => startQuiz(c.id)}
                              className="px-3 py-1 rounded-lg bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 transition-all"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Start Quiz</span>
                            </button>
                          ) : c.status === 'playing' ? (
                            <button
                              onClick={resumeQuiz}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 transition-all"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Resume</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => navigateTo('results', c.id)}
                                className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-medium"
                              >
                                Result
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Reset attempt for ${c.name}?`)) {
                                    resetContestantAttempt(c.id);
                                  }
                                }}
                                title="Reset Attempt"
                                className="p-1 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-400 hover:text-gold"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
