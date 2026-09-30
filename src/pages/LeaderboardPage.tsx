import React, { useState, useMemo } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { calculateLeaderboard, RankedContestant } from '../lib/scoring';
import { exportLeaderboardCSV } from '../lib/storage';
import {
  Trophy,
  Medal,
  Crown,
  Search,
  Download,
  Printer,
  School,
  Maximize2
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { state, navigateTo, togglePresentationMode, isPresentationMode } = useCompetition();
  const [searchTerm, setSearchTerm] = useState('');

  const rankedData = useMemo(() => {
    return calculateLeaderboard(state.contestants, state.attempts);
  }, [state.contestants, state.attempts]);

  const filteredRankings = useMemo(() => {
    return rankedData.filter((item: RankedContestant) => 
      item.contestant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contestant.school.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rankedData, searchTerm]);

  // Top 3 Podium entries
  const top1 = rankedData[0];
  const top2 = rankedData[1];
  const top3 = rankedData[2];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8 ${isPresentationMode ? 'scale-[1.01] origin-top transition-transform' : ''}`}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-gold animate-float shrink-0" />
            <h1 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Official Leaderboard & Standings
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {state.competition.title} • Automatically ranked by total score, correct answers, and speed.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            onClick={() => exportLeaderboardCSV(rankedData)}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-primary-light" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print</span>
          </button>

          <button
            onClick={togglePresentationMode}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-gold/20 transition-all"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Projector</span>
          </button>
        </div>
      </div>

      {/* Top 3 Championship Podium Cards */}
      {rankedData.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-2 items-end">
          
          {/* 2nd Place Podium */}
          {top2 && (
            <div className="order-2 md:order-1 p-4 sm:p-5 md:p-6 rounded-3xl bg-gradient-to-b from-slate-800/80 to-surface-card border border-slate-400/40 text-center shadow-xl relative overflow-hidden flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-300/20 border border-slate-300/50 flex items-center justify-center text-slate-200 font-display font-extrabold text-xl sm:text-2xl mb-2 sm:mb-3 shadow-lg">
                <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />
              </div>
              <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase bg-slate-300/20 text-slate-200 border border-slate-300/30 mb-1.5 sm:mb-2 font-mono">
                2nd Place (Silver)
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white truncate max-w-[220px]">
                {top2.contestant.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[200px] mb-2 sm:mb-3">
                {top2.contestant.school}
              </p>
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-200 mb-1">
                {top2.score} <span className="text-xs text-slate-400 font-sans">pts</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>{top2.correctAnswers} correct</span>
                <span>•</span>
                <span>{top2.accuracy}% accuracy</span>
              </div>
            </div>
          )}

          {/* 1st Place Podium (Grand Champion) */}
          {top1 && (
            <div className="order-1 md:order-2 p-5 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-b from-gold/30 via-surface-card to-surface-card border-2 border-gold text-center shadow-2xl relative overflow-hidden flex flex-col items-center md:scale-105 z-10 glow-gold">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold/20 border border-gold/60 flex items-center justify-center text-gold font-display font-extrabold text-2xl sm:text-3xl mb-2 sm:mb-3 shadow-xl">
                <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-gold animate-bounce" />
              </div>
              <span className="px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-gold text-slate-950 shadow-md mb-1.5 sm:mb-2">
                🏆 Champion (Gold)
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white truncate max-w-[240px]">
                {top1.contestant.name}
              </h2>
              <p className="text-xs text-gold-light font-medium truncate max-w-[220px] mb-3 sm:mb-4">
                {top1.contestant.school}
              </p>
              <div className="font-mono font-black text-3xl sm:text-4xl text-gold-light mb-1">
                {top1.score} <span className="text-xs sm:text-sm text-slate-300 font-sans">pts</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                <span>{top1.correctAnswers} correct</span>
                <span>•</span>
                <span>{top1.accuracy}% accuracy</span>
              </div>
            </div>
          )}

          {/* 3rd Place Podium */}
          {top3 && (
            <div className="order-3 md:order-3 p-4 sm:p-5 md:p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 to-surface-card border border-amber-700/50 text-center shadow-xl relative overflow-hidden flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-700/20 border border-amber-700/50 flex items-center justify-center text-amber-500 font-display font-extrabold text-xl sm:text-2xl mb-2 sm:mb-3 shadow-lg">
                <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
              </div>
              <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase bg-amber-700/20 text-amber-400 border border-amber-700/30 mb-1.5 sm:mb-2 font-mono">
                3rd Place (Bronze)
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white truncate max-w-[220px]">
                {top3.contestant.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[200px] mb-2 sm:mb-3">
                {top3.contestant.school}
              </p>
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-amber-400 mb-1">
                {top3.score} <span className="text-xs text-slate-400 font-sans">pts</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>{top3.correctAnswers} correct</span>
                <span>•</span>
                <span>{top3.accuracy}% accuracy</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Search Filter */}
      <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-surface-card rounded-2xl border border-surface-border no-print">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter rankings by contestant or school..."
          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Comprehensive Leaderboard Table */}
      <div className="bg-surface-card rounded-3xl border border-surface-border overflow-hidden shadow-2xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-surface-border bg-surface/60">
                <th className="py-4 px-4 text-center">Rank</th>
                <th className="py-4 px-4">Contestant</th>
                <th className="py-4 px-4">School Represented</th>
                <th className="py-4 px-4 text-center">Correct / Total</th>
                <th className="py-4 px-4 text-center">Accuracy</th>
                <th className="py-4 px-4 text-center">Time</th>
                <th className="py-4 px-4 text-right">Score</th>
                <th className="py-4 px-4 text-center no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/50">
              {filteredRankings.map((item: RankedContestant) => {
                const isGold = item.rank === 1 && item.score > 0;
                const isSilver = item.rank === 2 && item.score > 0;
                const isBronze = item.rank === 3 && item.score > 0;

                let rankBadge = (
                  <span className="font-mono font-bold text-slate-400 text-sm">
                    #{item.rank}
                  </span>
                );

                if (isGold) {
                  rankBadge = (
                    <span className="w-8 h-8 rounded-xl bg-gold/20 border border-gold/60 text-gold flex items-center justify-center font-bold text-sm mx-auto shadow-md shadow-gold/20">
                      1
                    </span>
                  );
                } else if (isSilver) {
                  rankBadge = (
                    <span className="w-8 h-8 rounded-xl bg-slate-300/20 border border-slate-300/50 text-slate-200 flex items-center justify-center font-bold text-sm mx-auto">
                      2
                    </span>
                  );
                } else if (isBronze) {
                  rankBadge = (
                    <span className="w-8 h-8 rounded-xl bg-amber-700/20 border border-amber-700/50 text-amber-500 flex items-center justify-center font-bold text-sm mx-auto">
                      3
                    </span>
                  );
                }

                return (
                  <tr
                    key={item.contestant.id}
                    className={`hover:bg-surface-hover/60 transition-colors ${isGold ? 'bg-gold/5' : ''}`}
                  >
                    <td className="py-4 px-4 text-center">
                      {rankBadge}
                    </td>
                    <td className="py-4 px-4 font-bold text-white text-base">
                      {item.contestant.name}
                    </td>
                    <td className="py-4 px-4 text-slate-300 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{item.contestant.school}</span>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-medium text-slate-300">
                      <span className="text-emerald-400 font-bold">{item.correctAnswers}</span> / {item.totalQuestions}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold">
                      <span className={item.accuracy >= 70 ? 'text-emerald-400' : 'text-slate-300'}>
                        {item.accuracy}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-slate-400 text-xs">
                      {item.totalTimeSeconds > 0 ? `${item.totalTimeSeconds}s` : '—'}
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-extrabold text-lg text-gold">
                      {item.score} <span className="text-xs text-slate-400 font-sans">pts</span>
                    </td>
                    <td className="py-4 px-4 text-center no-print">
                      {item.attempt ? (
                        <button
                          onClick={() => navigateTo('results', item.contestant.id)}
                          className="px-3 py-1 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 text-xs font-semibold"
                        >
                          View Breakdown
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic">No attempt</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
