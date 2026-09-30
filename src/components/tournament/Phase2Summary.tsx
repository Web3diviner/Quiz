import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import {
  Crown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  School,
  Zap,
  Flame,
  Award
} from 'lucide-react';

export const Phase2Summary: React.FC = () => {
  const { state, advanceToPhase3 } = useCompetition();

  const tournament = state.tournamentState;
  if (!tournament || !tournament.phase2) return null;

  const p2 = tournament.phase2;
  const advancing = p2.advancingContestantIds;
  const eliminated = p2.eliminatedContestantIds;

  const ranked = [...p2.contestantIds].sort((a, b) => {
    const scoreA = p2.completedScores[a]?.score || 0;
    const scoreB = p2.completedScores[b]?.score || 0;
    return scoreB - scoreA;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col gap-5 sm:gap-8 text-center animate-fade-in">
      
      {/* Celebration Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-card via-surface/95 to-surface-card border-2 border-emerald-500/50 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl flex flex-col items-center">
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mb-3 sm:mb-4 shadow-xl">
          <Crown className="w-7 sm:w-9 h-7 sm:h-9 text-gold animate-bounce" />
        </div>

        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
          Phase 2 Speed Run Concluded
        </span>

        <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-2">
          Top 3 Finalists Decided!
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-5 sm:mb-6">
          The <strong className="text-gold">Top 3 contestants</strong> will now enter the Grand Finale for the Championship Podium!
        </p>

        {/* Action Button */}
        <button
          onClick={advanceToPhase3}
          className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-slate-950 font-display font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-gold/30 hover:scale-105 active:scale-95 transition-all"
        >
          <Crown className="w-5 h-5 fill-current" />
          <span>Advance to Phase 3: Grand Finale Showdown</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Standings Table */}
      <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 shadow-xl text-left">
        <h3 className="font-display font-bold text-base sm:text-lg text-white mb-4">
          Speed Run Hot-Seat Performance
        </h3>

        <div className="space-y-2.5">
          {ranked.map((id, index) => {
            const contestant = state.contestants.find(c => c.id === id);
            if (!contestant) return null;
            const isAdvancing = advancing.includes(id);
            const stats = p2.completedScores[id];

            return (
              <div
                key={id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isAdvancing
                    ? 'bg-emerald-950/30 border-emerald-600/50 shadow-md'
                    : 'bg-rose-950/20 border-rose-900/40 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-8 h-8 rounded-xl font-mono font-bold text-sm flex items-center justify-center ${
                    isAdvancing ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'bg-surface text-slate-500 border border-slate-700'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <div className="font-display font-bold text-base text-white">
                      {contestant.name}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{contestant.school}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-extrabold text-lg text-gold">
                      +{stats?.score || 0} <span className="text-xs text-slate-400 font-sans">pts</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {stats?.correct || 0} / {stats?.attempted || 0} in speed run
                    </div>
                  </div>

                  {isAdvancing ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/20 text-gold-light border border-gold/40 flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5" />
                      Grand Finalist
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Eliminated
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
