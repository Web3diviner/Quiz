import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { ScoreLadder } from './ScoreLadder';
import { LifelineBar } from './LifelineBar';
import { AudiencePollModal } from './AudiencePollModal';
import { HostControls } from './HostControls';
import { OptionKey } from '../../types/competition';
import {
  Timer,
  Trophy,
  School,
  Lock,
  ArrowRight,
  CheckCircle,
  XCircle,
  Sparkles,
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';
import { CURRENT_AFFAIRS_SNAPSHOT_DATE } from '../../data/sampleQuestions';

export const QuizStage: React.FC = () => {
  const {
    state,
    selectAnswer,
    lockFinalAnswer,
    revealAnswer,
    nextQuestion,
    finishQuizRun,
    useLifelineFiftyFifty,
    useLifelineAudiencePoll,
    closeAudiencePollModal,
    useLifelineSkipQuestion,
    useLifelineExtraTime,
    isPresentationMode,
  } = useCompetition();

  const session = state.activeQuizState;
  const contestant = state.contestants.find(c => c.id === session?.contestantId);

  if (!session || !contestant) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-gold mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold font-display text-white mb-2">No Active Quiz Session</h2>
        <p className="text-slate-400 mb-6 max-w-md">
          Please select a contestant from the Contestants queue or Dashboard to start the competition round.
        </p>
      </div>
    );
  }

  const currentQuestionId = session.questionIds[session.questionIndex];
  const currentQuestion = state.questions.find(q => q.id === currentQuestionId);

  if (!currentQuestion) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Question Not Found</h2>
        <button
          onClick={() => finishQuizRun('completed')}
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold"
        >
          Conclude Round
        </button>
      </div>
    );
  }

  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
  const totalQuestionsInRun = session.questionIds.length;
  const isLastQuestion = session.questionIndex === totalQuestionsInRun - 1;
  const isUrgentTimer = state.settings.timerEnabled && session.timerRemaining <= state.settings.urgentTimerThreshold;

  const handleOptionClick = (key: OptionKey) => {
    if (session.isLocked || session.isRevealed) return;
    if (session.eliminatedIncorrectOptions.includes(key)) return;
    selectAnswer(key);
  };

  const isCurrentAffairs = currentQuestion.category?.includes('Current Affairs');

  return (
    <div className={`w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-col gap-4 sm:gap-6 ${isPresentationMode ? 'scale-[1.02] origin-top transition-transform' : ''}`}>
      
      {/* Quiz Top Stage Bar */}
      <div className="w-full bg-surface-card/90 border border-surface-border rounded-2xl p-3 sm:p-4.5 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Contestant & School Details */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-hover border border-primary-light/40 flex items-center justify-center font-display font-extrabold text-lg sm:text-xl text-white shadow-lg shadow-primary/30 shrink-0">
            {contestant.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-base sm:text-lg lg:text-xl text-white tracking-tight truncate max-w-[200px] sm:max-w-none">
                {contestant.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary-light border border-primary/40 font-mono">
                Q{session.questionIndex + 1} of {totalQuestionsInRun}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium truncate">
              <School className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-md">{contestant.school}</span>
            </div>
          </div>
        </div>

        {/* Live Score & Timer Center/Right */}
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-2.5 sm:pt-0 border-surface-border">
          
          {/* Current Points Score */}
          <div className="flex flex-col items-center sm:items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Current Score</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-gold shrink-0" />
              <span className="font-mono font-extrabold text-xl sm:text-2xl text-gold-light">
                {session.currentScore}
              </span>
              <span className="text-xs font-semibold text-slate-400">pts</span>
            </div>
          </div>

          {/* Live Timer Clock */}
          {state.settings.timerEnabled && (
            <div className="flex items-center gap-2 pl-3 sm:pl-4 border-l border-surface-border">
              <div
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 transition-all font-mono font-extrabold text-lg sm:text-xl shadow-lg ${
                  session.timerRemaining === 0
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300 shadow-rose-600/30'
                    : isUrgentTimer
                    ? 'bg-rose-950/60 border-rose-500 text-rose-400 animate-pulse shadow-rose-500/40'
                    : session.isTimerRunning
                    ? 'bg-surface border-primary/60 text-white shadow-primary/20'
                    : 'bg-surface border-slate-700 text-slate-400'
                }`}
              >
                <span>{session.timerRemaining}</span>
                <span className="absolute -bottom-2 text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-wider px-1 bg-surface-card rounded border border-surface-border text-slate-400">
                  Sec
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Question Arena + Score Ladder Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Question Area (Span 3 on Desktop) */}
        <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6">
          
          {/* Central Question Card */}
          <div className="relative w-full bg-surface-card/95 rounded-3xl border border-surface-border p-4 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[220px]">
            
            {/* Ambient Background Aura */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/15 blur-3xl pointer-events-none rounded-full" />
            
            {/* Category & Metadata Badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap mb-2 sm:mb-4 z-10">
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
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  currentQuestion.difficulty === 'Hard'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : currentQuestion.difficulty === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {currentQuestion.difficulty || 'Standard'}
                </span>
                <span className="px-2.5 sm:px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-gold/20 text-gold border border-gold/40">
                  +{currentQuestion.points} Points
                </span>
              </div>
            </div>

            {/* The Question Text */}
            <div className="my-auto py-2 sm:py-4 z-10">
              <h1 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed tracking-tight text-center sm:text-left">
                {currentQuestion.question}
              </h1>
            </div>

            {/* Suspense status / Reveal Status banner */}
            <div className="mt-2 sm:mt-4 flex items-center justify-between z-10 pt-2 border-t border-surface-border/50 text-xs">
              <div className="text-slate-400">
                {session.isRevealed ? (
                  session.history[session.history.length - 1]?.correct ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-bounce">
                      <CheckCircle className="w-4 h-4" />
                      Correct Answer! (+{currentQuestion.points} pts)
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      Incorrect. Correct answer was {currentQuestion.correctAnswer}.
                    </span>
                  )
                ) : session.isLocked ? (
                  <span className="text-gold font-bold flex items-center gap-1.5 animate-pulse">
                    <Lock className="w-4 h-4" />
                    Answer locked in. Evaluating...
                  </span>
                ) : session.selectedOption ? (
                  <span className="text-slate-300 font-medium">
                    Selected Option <strong className="text-gold">{session.selectedOption}</strong>. Confirm below.
                  </span>
                ) : (
                  <span className="text-slate-400">Select an answer choice to proceed.</span>
                )}
              </div>
            </div>
          </div>

          {/* 4 Answer Options Grid (2x2 on Desktop, Stacked on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
            {optionKeys.map(key => {
              const text = currentQuestion.options[key];
              const isSelected = session.selectedOption === key;
              const isEliminated = session.eliminatedIncorrectOptions.includes(key);
              const isCorrect = key === currentQuestion.correctAnswer;

              // Compute Option Styling
              let cardStyle = "bg-surface-card hover:bg-surface-hover border-surface-border text-slate-200";
              let letterStyle = "bg-surface border-surface-border text-slate-400";

              if (isEliminated) {
                cardStyle = "bg-surface-light/30 border-slate-800 text-slate-600 line-through cursor-not-allowed opacity-40";
                letterStyle = "bg-surface/30 border-slate-800 text-slate-600";
              } else if (session.isRevealed) {
                if (isCorrect) {
                  cardStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 glow-success scale-[1.02] font-bold";
                  letterStyle = "bg-emerald-600 border-emerald-400 text-white font-bold";
                } else if (isSelected && !isCorrect) {
                  cardStyle = "bg-rose-950/80 border-rose-500 text-rose-100 glow-danger animate-shake font-bold";
                  letterStyle = "bg-rose-600 border-rose-400 text-white font-bold";
                } else {
                  cardStyle = "bg-surface-card/50 border-surface-border text-slate-500 opacity-60";
                  letterStyle = "bg-surface border-surface-border text-slate-500";
                }
              } else if (session.isLocked && isSelected) {
                cardStyle = "bg-gold/20 border-gold text-gold-light glow-gold animate-suspense font-bold";
                letterStyle = "bg-gold text-slate-950 font-bold border-gold-light";
              } else if (isSelected) {
                cardStyle = "bg-gold/15 border-gold text-white font-semibold glow-gold scale-[1.01]";
                letterStyle = "bg-gold text-slate-950 font-bold border-gold-light";
              }

              return (
                <button
                  key={key}
                  onClick={() => handleOptionClick(key)}
                  disabled={isEliminated || session.isLocked || session.isRevealed}
                  className={`answer-diamond-btn w-full p-3.5 sm:p-4.5 rounded-2xl border-2 flex items-center gap-3 sm:gap-4 text-left transition-all relative overflow-hidden group shadow-lg ${cardStyle}`}
                >
                  {/* Letter badge (A, B, C, D) */}
                  <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center font-mono font-bold text-sm sm:text-base shrink-0 shadow-sm transition-all ${letterStyle}`}>
                    {key}
                  </span>

                  {/* Option Text */}
                  <span className="flex-1 text-xs sm:text-sm md:text-base font-medium leading-snug">
                    {text}
                  </span>

                  {/* Icon Indicator */}
                  {session.isRevealed && isCorrect && (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0 animate-scale-in" />
                  )}
                  {session.isRevealed && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 shrink-0 animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Bar (Final Answer / Next Question) + Lifelines Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-surface-card border border-surface-border">
            
            {/* Lifelines Toolbar */}
            <LifelineBar
              settings={state.settings}
              lifelinesUsed={session.lifelinesUsedInRun}
              disabled={session.isLocked || session.isRevealed}
              onFiftyFifty={useLifelineFiftyFifty}
              onAudiencePoll={useLifelineAudiencePoll}
              onSkipQuestion={useLifelineSkipQuestion}
              onExtraTime={useLifelineExtraTime}
            />

            {/* Primary Action Button */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              {!session.isLocked && !session.isRevealed && (
                <button
                  onClick={lockFinalAnswer}
                  disabled={!session.selectedOption}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-slate-950 shadow-lg shadow-gold/30 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Final Answer</span>
                </button>
              )}

              {session.isLocked && !session.isRevealed && (
                <button
                  onClick={revealAnswer}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/40 animate-pulse transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal Answer</span>
                </button>
              )}

              {session.isRevealed && (
                <button
                  onClick={nextQuestion}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>{isLastQuestion ? 'View Final Results' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Score Ladder Sidebar (Span 1 on Desktop) */}
        <div className="lg:col-span-1">
          <ScoreLadder
            questions={session.questionIds.map(id => state.questions.find(q => q.id === id)).filter(Boolean) as any}
            currentQuestionIndex={session.questionIndex}
            settings={state.settings}
          />
        </div>
      </div>

      {/* Host Controls Panel Drawer */}
      <HostControls />

      {/* Ask the Audience Modal */}
      {session.audiencePollData && (
        <AudiencePollModal
          pollData={session.audiencePollData}
          onClose={closeAudiencePollModal}
          onApplyOverride={(custom) => useLifelineAudiencePoll(custom)}
        />
      )}
    </div>
  );
};
