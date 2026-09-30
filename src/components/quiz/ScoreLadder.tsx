import React from 'react';
import { Question, QuizSettings } from '../../types/competition';
import { ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

interface ScoreLadderProps {
  questions: Question[];
  currentQuestionIndex: number;
  settings: QuizSettings;
}

export const ScoreLadder: React.FC<ScoreLadderProps> = ({
  questions,
  currentQuestionIndex,
  settings,
}) => {
  if (questions.length === 0) return null;

  // Reverse list so top prize/question is at the top (TV Game Show style)
  const ladderItems = [...questions].map((q, idx) => ({
    question: q,
    index: idx,
    questionNumber: idx + 1,
    isSafeLevel: settings.safeLevelsEnabled && settings.safeQuestionNumbers.includes(idx + 1),
    isCurrent: idx === currentQuestionIndex,
    isCompleted: idx < currentQuestionIndex,
  })).reverse();

  return (
    <div className="w-full bg-surface-card/90 rounded-2xl border border-surface-border p-3 sm:p-3.5 backdrop-blur-md shadow-xl flex flex-col h-full max-h-[340px] sm:max-h-[460px] lg:max-h-[580px] overflow-hidden">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border">
        <span className="text-xs font-bold uppercase tracking-wider text-gold">Progress Tree</span>
        <span className="text-xs text-slate-400 font-mono">Q{currentQuestionIndex + 1} / {questions.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-1">
        {ladderItems.map(item => {
          let itemStyle = "bg-surface/50 text-slate-400 border-transparent";

          if (item.isCurrent) {
            itemStyle = "bg-gradient-to-r from-gold/25 to-primary/20 text-gold-light border-gold/60 font-bold shadow-lg shadow-gold/20 scale-[1.02]";
          } else if (item.isCompleted) {
            itemStyle = "bg-emerald-950/40 text-emerald-300 border-emerald-800/40 font-medium";
          } else if (item.isSafeLevel) {
            itemStyle = "bg-surface-light text-slate-200 border-gold/30 font-semibold";
          }

          return (
            <div
              key={item.index}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs transition-all ${itemStyle}`}
            >
              <div className="flex items-center gap-2">
                {item.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : item.isCurrent ? (
                  <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                ) : item.isSafeLevel ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-gold/80 shrink-0" />
                ) : (
                  <span className="w-3.5 text-center font-mono text-[10px] text-slate-500 shrink-0">
                    {item.questionNumber}
                  </span>
                )}
                <span className="font-mono">
                  Q{item.questionNumber}
                  {item.isSafeLevel && (
                    <span className="ml-1 text-[10px] text-gold uppercase tracking-tight font-sans">
                      Safe
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`font-bold font-mono ${item.isCurrent ? 'text-gold' : item.isCompleted ? 'text-emerald-400' : 'text-slate-300'}`}>
                  +{item.question.points} pts
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
