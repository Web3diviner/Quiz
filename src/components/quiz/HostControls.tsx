import React, { useState, useEffect } from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import {
  Sliders,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Plus,
  Minus,
  Check,
  X,
  Eye,
  SkipForward,
  RotateCcw,
  StopCircle,
  HelpCircle,
  Keyboard,
} from 'lucide-react';
import { OptionKey } from '../../types/competition';

export const HostControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const {
    state,
    selectAnswer,
    lockFinalAnswer,
    revealAnswer,
    nextQuestion,
    hostToggleTimer,
    hostAdjustTime,
    hostManualMark,
    hostEmergencyEnd,
    hostUndoLastReveal,
  } = useCompetition();

  const session = state.activeQuizState;

  // Global Keyboard Host Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input, textarea, or select
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (!session) return;

      if (e.key === '1') selectAnswer('A');
      else if (e.key === '2') selectAnswer('B');
      else if (e.key === '3') selectAnswer('C');
      else if (e.key === '4') selectAnswer('D');
      else if (e.key === 'Enter') {
        if (!session.isLocked) {
          lockFinalAnswer();
        } else if (!session.isRevealed) {
          revealAnswer();
        } else {
          nextQuestion();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        hostToggleTimer();
      } else if (e.key.toLowerCase() === 'n' && session.isRevealed) {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, selectAnswer, lockFinalAnswer, revealAnswer, nextQuestion, hostToggleTimer]);

  if (!session) return null;

  return (
    <div className="w-full bg-surface-card/95 border border-surface-border/90 rounded-2xl p-3 shadow-2xl backdrop-blur-xl transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/20 text-primary-light">
            <Sliders className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Host Controls Panel
          </span>
          <button
            onClick={() => setShowShortcuts(prev => !prev)}
            title="Keyboard Shortcuts Cheatsheet"
            className="p-1 text-slate-400 hover:text-gold transition-colors ml-1"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick primary actions visible even when collapsed */}
          {!session.isRevealed ? (
            <button
              onClick={revealAnswer}
              disabled={!session.isLocked && !session.selectedOption}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal</span>
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Next Q</span>
            </button>
          )}

          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-300 transition-colors"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Controls Drawer */}
      {isOpen && (
        <div className="mt-3 pt-3 border-t border-surface-border/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          
          {/* Timer Controls */}
          <div className="p-2 rounded-xl bg-surface/60 border border-surface-border space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Timer Controls</span>
            <div className="flex items-center gap-1">
              <button
                onClick={hostToggleTimer}
                className="flex-1 py-1 rounded-lg bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-200 font-medium flex items-center justify-center gap-1"
              >
                {session.isTimerRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{session.isTimerRunning ? 'Pause' : 'Resume'}</span>
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => hostAdjustTime(10)}
                className="flex-1 py-0.5 rounded bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-[11px]"
              >
                +10s
              </button>
              <button
                onClick={() => hostAdjustTime(-10)}
                className="flex-1 py-0.5 rounded bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 text-[11px]"
              >
                -10s
              </button>
            </div>
          </div>

          {/* Manual Scoring Override */}
          <div className="p-2 rounded-xl bg-surface/60 border border-surface-border space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Manual Override</span>
            <button
              onClick={() => hostManualMark(true)}
              className="w-full py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 font-semibold flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Correct</span>
            </button>
            <button
              onClick={() => hostManualMark(false)}
              className="w-full py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-rose-300 font-semibold flex items-center justify-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Mark Incorrect</span>
            </button>
          </div>

          {/* Undo / Reset */}
          <div className="p-2 rounded-xl bg-surface/60 border border-surface-border space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Session History</span>
            <button
              onClick={hostUndoLastReveal}
              disabled={!session.isRevealed}
              className="w-full py-1 rounded-lg bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-300 font-medium flex items-center justify-center gap-1 disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
              <span>Undo Reveal</span>
            </button>
          </div>

          {/* Emergency Stop */}
          <div className="p-2 rounded-xl bg-surface/60 border border-surface-border space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">End Session</span>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to conclude this contestant run now?')) {
                  hostEmergencyEnd();
                }
              }}
              className="w-full py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-200 font-bold flex items-center justify-center gap-1"
            >
              <StopCircle className="w-3.5 h-3.5" />
              <span>End Contestant Run</span>
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      {showShortcuts && (
        <div className="mt-3 p-3 rounded-xl bg-surface border border-gold/30 text-xs space-y-2 animate-fade-in">
          <div className="flex items-center justify-between font-bold text-gold">
            <span className="flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5" />
              Host Keyboard Shortcuts
            </span>
            <button onClick={() => setShowShortcuts(false)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
            <div><kbd className="px-1.5 py-0.5 bg-surface-card rounded border border-slate-700 font-mono text-gold">1, 2, 3, 4</kbd> Choose Options A, B, C, D</div>
            <div><kbd className="px-1.5 py-0.5 bg-surface-card rounded border border-slate-700 font-mono text-gold">Enter</kbd> Lock / Reveal / Next</div>
            <div><kbd className="px-1.5 py-0.5 bg-surface-card rounded border border-slate-700 font-mono text-gold">Space</kbd> Pause / Resume Timer</div>
            <div><kbd className="px-1.5 py-0.5 bg-surface-card rounded border border-slate-700 font-mono text-gold">N</kbd> Advance to Next Question</div>
          </div>
        </div>
      )}
    </div>
  );
};
