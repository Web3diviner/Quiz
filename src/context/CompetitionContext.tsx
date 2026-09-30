import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import {
  CompetitionState,
  Contestant,
  Question,
  QuizSettings,
  ViewScreen,
  OptionKey,
  ActiveQuizSession,
  AnswerRecord,
  ContestantAttempt,
  TournamentState,
  TournamentPhase,
  MusicType,
} from '../types/competition';
import {
  loadCompetitionState,
  saveCompetitionState,
  getInitialState,
} from '../lib/storage';
import { DEFAULT_QUESTIONS } from '../data/sampleQuestions';
import { soundEngine } from '../lib/audio';
import { fireConfettiCelebration, fireVictoryFireworks } from '../lib/confetti';
import { getSafeLevelScore } from '../lib/scoring';

interface ToastNotification {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface CompetitionContextType {
  state: CompetitionState;
  currentScreen: ViewScreen;
  viewingContestantId: string | null;
  isPresentationMode: boolean;
  toasts: ToastNotification[];
  isMusicPlaying: boolean;
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
  navigateTo: (screen: ViewScreen, contestantId?: string) => void;
  togglePresentationMode: () => void;
  
  // Audio & Music
  toggleMusic: () => void;
  setMusicVolume: (vol: number) => void;
  setSoundVolume: (vol: number) => void;
  setMusicType: (type: MusicType) => void;

  // Contestant actions
  addContestant: (name: string, school: string) => void;
  addContestantsBulk: (list: Array<{ name: string; school: string }>) => void;
  updateContestant: (id: string, updates: Partial<Contestant>) => void;
  deleteContestant: (id: string) => void;
  resetContestantAttempt: (id: string) => void;
  clearAllContestants: () => void;

  // Question actions
  addQuestion: (q: Omit<Question, 'id'>) => void;
  updateQuestion: (id: string, q: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  reorderQuestions: (startIndex: number, endIndex: number) => void;
  importQuestions: (questions: Question[], mode: 'replace' | 'append') => void;
  resetToDefaultQuestions: () => void;
  clearAllQuestions: () => void;

  // Settings & Meta
  updateSettings: (settings: Partial<QuizSettings>) => void;
  updateCompetitionMeta: (meta: Partial<CompetitionState['competition']>) => void;
  resetScoresOnly: () => void;
  resetEntireCompetition: () => void;
  importCompetitionState: (newState: CompetitionState) => void;

  // Classic Quiz Engine
  startQuiz: (contestantId: string) => void;
  resumeQuiz: () => void;
  selectAnswer: (option: OptionKey) => void;
  lockFinalAnswer: () => void;
  revealAnswer: () => void;
  nextQuestion: () => void;
  finishQuizRun: (reason?: 'completed' | 'eliminated' | 'host_ended') => void;
  
  // Lifelines
  useLifelineFiftyFifty: () => void;
  useLifelineAudiencePoll: (overrideData?: Record<OptionKey, number>) => void;
  closeAudiencePollModal: () => void;
  useLifelineSkipQuestion: () => void;
  useLifelineExtraTime: (seconds?: number) => void;

  // Host Controls
  hostToggleTimer: () => void;
  hostAdjustTime: (deltaSeconds: number) => void;
  hostManualMark: (correct: boolean) => void;
  hostEmergencyEnd: () => void;
  hostUndoLastReveal: () => void;

  // ==========================================
  // 3-PHASE TOURNAMENT ENGINE
  // ==========================================
  startTournament: (selectedContestantIds?: string[]) => void;
  setTournamentPhase: (phase: TournamentPhase) => void;
  
  // Phase 1: Alternating Qualifiers
  selectPhase1Option: (option: OptionKey) => void;
  lockPhase1Answer: () => void;
  revealPhase1Answer: () => void;
  nextPhase1Turn: () => void;
  advanceToPhase2: () => void;

  // Phase 2: Speed Run Hot-Seat
  startPhase2ContestantRun: () => void;
  submitPhase2Answer: (option: OptionKey | null, isPass?: boolean) => void;
  finishPhase2ContestantRun: () => void;
  advanceToPhase3: () => void;

  // Phase 3: Grand Finale
  selectPhase3Option: (option: OptionKey) => void;
  lockPhase3Answer: () => void;
  revealPhase3Answer: () => void;
  nextPhase3Turn: () => void;
  finishTournament: () => void;
  resetTournament: () => void;
}

const CompetitionContext = createContext<CompetitionContextType | null>(null);

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CompetitionState>(() => loadCompetitionState());
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('landing');
  const [viewingContestantId, setViewingContestantId] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Sync sound & music engine with settings
  useEffect(() => {
    soundEngine.setMuted(!state.settings.soundEnabled);
    soundEngine.setSoundVolume(state.settings.soundVolume);
    soundEngine.setMusicVolume(state.settings.musicVolume);
    soundEngine.setMusicType(state.settings.musicType || 'emotional');
    if (!state.settings.musicEnabled) {
      soundEngine.stopTensionMusic();
      setIsMusicPlaying(false);
    }
  }, [state.settings.soundEnabled, state.settings.soundVolume, state.settings.musicEnabled, state.settings.musicVolume, state.settings.musicType]);

  // Persist state to localStorage
  useEffect(() => {
    saveCompetitionState(state);
  }, [state]);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `t_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const navigateTo = useCallback((screen: ViewScreen, contestantId?: string) => {
    if (contestantId) {
      setViewingContestantId(contestantId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const togglePresentationMode = useCallback(() => {
    setIsPresentationMode(prev => {
      const next = !prev;
      if (next) {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
      return next;
    });
  }, []);

  // Music controls
  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      soundEngine.stopTensionMusic();
      setIsMusicPlaying(false);
    } else {
      soundEngine.startTensionMusic(1);
      setIsMusicPlaying(true);
    }
  }, [isMusicPlaying]);

  const setMusicVolume = useCallback((vol: number) => {
    soundEngine.setMusicVolume(vol);
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, musicVolume: vol },
    }));
  }, []);

  const setSoundVolume = useCallback((vol: number) => {
    soundEngine.setSoundVolume(vol);
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, soundVolume: vol },
    }));
  }, []);

  const setMusicType = useCallback((type: MusicType) => {
    soundEngine.setMusicType(type);
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, musicType: type },
    }));
  }, []);

  // Contestant actions
  const addContestant = useCallback((name: string, school: string) => {
    if (!name.trim()) {
      showToast('Contestant name cannot be empty', 'warning');
      return;
    }
    const newContestant: Contestant = {
      id: `c_${Date.now()}`,
      name: name.trim(),
      school: school.trim() || 'Independent',
      score: 0,
      currentQuestionIndex: 0,
      status: 'not_started',
    };
    setState(prev => ({
      ...prev,
      contestants: [...prev.contestants, newContestant],
    }));
    showToast(`Added contestant ${newContestant.name}`, 'success');
  }, [showToast]);

  const addContestantsBulk = useCallback((list: Array<{ name: string; school: string }>) => {
    const valid = list
      .filter(item => item.name && item.name.trim().length > 0)
      .map((item, index) => ({
        id: `c_${Date.now()}_${index}`,
        name: item.name.trim(),
        school: (item.school && item.school.trim()) || 'Independent',
        score: 0,
        currentQuestionIndex: 0,
        status: 'not_started' as const,
      }));

    if (valid.length === 0) {
      showToast('No valid contestants found to import', 'warning');
      return;
    }

    setState(prev => ({
      ...prev,
      contestants: [...prev.contestants, ...valid],
    }));
    showToast(`Successfully added ${valid.length} contestants!`, 'success');
  }, [showToast]);

  const updateContestant = useCallback((id: string, updates: Partial<Contestant>) => {
    setState(prev => ({
      ...prev,
      contestants: prev.contestants.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
    showToast('Contestant updated', 'info');
  }, [showToast]);

  const deleteContestant = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      contestants: prev.contestants.filter(c => c.id !== id),
      attempts: prev.attempts.filter(a => a.contestantId !== id),
      activeContestantId: prev.activeContestantId === id ? null : prev.activeContestantId,
      activeQuizState: prev.activeContestantId === id ? null : prev.activeQuizState,
    }));
    showToast('Contestant removed', 'info');
  }, [showToast]);

  const resetContestantAttempt = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      contestants: prev.contestants.map(c => c.id === id ? {
        ...c,
        score: 0,
        currentQuestionIndex: 0,
        status: 'not_started' as const,
        startedAt: undefined,
        completedAt: undefined,
      } : c),
      attempts: prev.attempts.filter(a => a.contestantId !== id),
      activeContestantId: prev.activeContestantId === id ? null : prev.activeContestantId,
      activeQuizState: prev.activeContestantId === id ? null : prev.activeQuizState,
    }));
    showToast('Contestant attempt cleared', 'info');
  }, [showToast]);

  const clearAllContestants = useCallback(() => {
    setState(prev => ({
      ...prev,
      contestants: [],
      attempts: [],
      activeContestantId: null,
      activeQuizState: null,
      tournamentState: null,
    }));
    showToast('All contestants removed', 'info');
  }, [showToast]);

  // Question actions
  const addQuestion = useCallback((q: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...q,
      id: `q_${Date.now()}`,
    };
    setState(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    showToast('Question added to Question Bank', 'success');
  }, [showToast]);

  const updateQuestion = useCallback((id: string, q: Partial<Question>) => {
    setState(prev => ({
      ...prev,
      questions: prev.questions.map(item => item.id === id ? { ...item, ...q } : item),
    }));
    showToast('Question updated', 'info');
  }, [showToast]);

  const deleteQuestion = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      questions: prev.questions.filter(item => item.id !== id),
    }));
    showToast('Question deleted', 'info');
  }, [showToast]);

  const duplicateQuestion = useCallback((id: string) => {
    setState(prev => {
      const target = prev.questions.find(item => item.id === id);
      if (!target) return prev;
      const dup: Question = {
        ...target,
        id: `q_dup_${Date.now()}`,
        question: `${target.question} (Copy)`,
      };
      return {
        ...prev,
        questions: [...prev.questions, dup],
      };
    });
    showToast('Question duplicated', 'info');
  }, [showToast]);

  const reorderQuestions = useCallback((startIndex: number, endIndex: number) => {
    setState(prev => {
      const list = [...prev.questions];
      const [moved] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, moved);
      return { ...prev, questions: list };
    });
  }, []);

  const importQuestions = useCallback((newQuestions: Question[], mode: 'replace' | 'append') => {
    setState(prev => ({
      ...prev,
      questions: mode === 'replace' ? newQuestions : [...prev.questions, ...newQuestions],
    }));
    showToast(`Loaded ${newQuestions.length} questions`, 'success');
  }, [showToast]);

  const resetToDefaultQuestions = useCallback(() => {
    setState(prev => ({
      ...prev,
      questions: DEFAULT_QUESTIONS,
    }));
    showToast('Question bank reset to original 100 verified questions', 'success');
  }, [showToast]);

  const clearAllQuestions = useCallback(() => {
    setState(prev => ({
      ...prev,
      questions: [],
    }));
    showToast('Question bank cleared', 'warning');
  }, [showToast]);

  // Settings & Meta
  const updateSettings = useCallback((newSettings: Partial<QuizSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
    showToast('Settings saved', 'success');
  }, [showToast]);

  const updateCompetitionMeta = useCallback((meta: Partial<CompetitionState['competition']>) => {
    setState(prev => ({
      ...prev,
      competition: { ...prev.competition, ...meta },
    }));
    showToast('Competition details updated', 'success');
  }, [showToast]);

  const resetScoresOnly = useCallback(() => {
    setState(prev => ({
      ...prev,
      contestants: prev.contestants.map(c => ({
        ...c,
        score: 0,
        currentQuestionIndex: 0,
        status: 'not_started',
        startedAt: undefined,
        completedAt: undefined,
      })),
      attempts: [],
      activeContestantId: null,
      activeQuizState: null,
      tournamentState: null,
    }));
    showToast('All scores and attempts have been reset', 'info');
  }, [showToast]);

  const resetEntireCompetition = useCallback(() => {
    const fresh = getInitialState();
    setState(fresh);
    setCurrentScreen('landing');
    setViewingContestantId(null);
    soundEngine.stopTensionMusic();
    setIsMusicPlaying(false);
    showToast('Competition factory reset complete', 'info');
  }, [showToast]);

  const importCompetitionState = useCallback((newState: CompetitionState) => {
    setState(newState);
    setCurrentScreen('dashboard');
    showToast('Competition backup successfully loaded!', 'success');
  }, [showToast]);

  // ==========================================
  // CLASSIC QUIZ ENGINE
  // ==========================================

  const startQuiz = useCallback((contestantId: string) => {
    const contestant = state.contestants.find(c => c.id === contestantId);
    if (!contestant) {
      showToast('Contestant not found', 'error');
      return;
    }

    if (state.questions.length === 0) {
      showToast('Cannot start: Question bank is empty. Add or import questions first.', 'warning');
      navigateTo('questions');
      return;
    }

    let availableQuestions = [...state.questions];
    if (state.settings.randomizeQuestions) {
      availableQuestions.sort(() => Math.random() - 0.5);
    }

    const questionLimit = state.settings.questionsPerContestant > 0
      ? Math.min(state.settings.questionsPerContestant, availableQuestions.length)
      : availableQuestions.length;

    const selectedQuestionIds = availableQuestions.slice(0, questionLimit).map(q => q.id);

    const initialSession: ActiveQuizSession = {
      contestantId: contestant.id,
      questionIndex: 0,
      questionIds: selectedQuestionIds,
      currentScore: 0,
      selectedOption: null,
      isLocked: false,
      isRevealed: false,
      eliminatedIncorrectOptions: [],
      lifelinesUsedInRun: [],
      questionStartTime: Date.now(),
      timerRemaining: state.settings.secondsPerQuestion,
      isTimerRunning: state.settings.timerEnabled,
      audiencePollData: null,
      history: [],
      isCompleted: false,
    };

    const updatedContestant: Contestant = {
      ...contestant,
      status: 'playing',
      startedAt: new Date().toISOString(),
      score: 0,
      currentQuestionIndex: 0,
      activeQuestionIds: selectedQuestionIds,
      totalQuestions: questionLimit,
    };

    setState(prev => ({
      ...prev,
      activeContestantId: contestantId,
      activeQuizState: initialSession,
      contestants: prev.contestants.map(c => c.id === contestantId ? updatedContestant : c),
    }));

    setViewingContestantId(contestantId);
    setCurrentScreen('quiz');
    soundEngine.playSelect();

    if (state.settings.musicEnabled) {
      soundEngine.startTensionMusic(1);
      setIsMusicPlaying(true);
    }
  }, [state.contestants, state.questions, state.settings, showToast, navigateTo]);

  const resumeQuiz = useCallback(() => {
    if (state.tournamentState && state.tournamentState.isActive) {
      setCurrentScreen('tournament');
      return;
    }
    if (state.activeContestantId && state.activeQuizState) {
      setViewingContestantId(state.activeContestantId);
      setCurrentScreen('quiz');
    }
  }, [state.tournamentState, state.activeContestantId, state.activeQuizState]);

  const selectAnswer = useCallback((option: OptionKey) => {
    const session = state.activeQuizState;
    if (!session || session.isLocked || session.isRevealed) return;

    soundEngine.playSelect();
    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          selectedOption: option,
        },
      };
    });
  }, [state.activeQuizState]);

  const lockFinalAnswer = useCallback(() => {
    const session = state.activeQuizState;
    if (!session || !session.selectedOption || session.isLocked || session.isRevealed) return;

    soundEngine.playLock();
    soundEngine.setTensionIntensity(2);

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          isLocked: true,
          isTimerRunning: false,
        },
      };
    });

    if (state.settings.suspenseDelayMs > 0) {
      setTimeout(() => {
        revealAnswer();
      }, state.settings.suspenseDelayMs);
    }
  }, [state.activeQuizState, state.settings.suspenseDelayMs]);

  const revealAnswer = useCallback(() => {
    const session = state.activeQuizState;
    if (!session || session.isRevealed) return;

    const currentQuestionId = session.questionIds[session.questionIndex];
    const currentQuestion = state.questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return;

    const isCorrect = session.selectedOption === currentQuestion.correctAnswer;
    const pointsAwarded = isCorrect ? currentQuestion.points : 0;
    const newScore = session.currentScore + pointsAwarded;
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - session.questionStartTime) / 1000));

    if (isCorrect) {
      soundEngine.playCorrect();
    } else {
      soundEngine.playIncorrect();
    }

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      category: currentQuestion.category,
      selectedAnswer: session.selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      correct: isCorrect,
      pointsAwarded: pointsAwarded,
      timeTakenSeconds: elapsedSeconds,
      lifelinesUsedOnQuestion: [...session.lifelinesUsedInRun],
    };

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          isLocked: true,
          isRevealed: true,
          isTimerRunning: false,
          currentScore: newScore,
          history: [...prev.activeQuizState.history, record],
        },
        contestants: prev.contestants.map(c => c.id === session.contestantId ? {
          ...c,
          score: newScore,
          currentQuestionIndex: session.questionIndex,
        } : c),
      };
    });
  }, [state.activeQuizState, state.questions]);

  const finishQuizRun = useCallback((reason: 'completed' | 'eliminated' | 'host_ended' = 'completed') => {
    const session = state.activeQuizState;
    if (!session) return;

    const contestant = state.contestants.find(c => c.id === session.contestantId);
    if (!contestant) return;

    let finalScore = session.currentScore;
    if (reason === 'eliminated' && state.settings.safeLevelsEnabled) {
      const safeScore = getSafeLevelScore(state.questions, session.questionIndex, state.settings);
      finalScore = Math.max(safeScore, 0);
    }

    const correctCount = session.history.filter(h => h.correct).length;
    const incorrectCount = session.history.length - correctCount;
    const totalTimeSeconds = session.history.reduce((acc, h) => acc + (h.timeTakenSeconds || 0), 0);

    const attempt: ContestantAttempt = {
      contestantId: contestant.id,
      answers: session.history,
      totalScore: finalScore,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      startedAt: contestant.startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      lifelinesUsed: Array.from(new Set(session.lifelinesUsedInRun)),
      totalTimeSeconds: totalTimeSeconds,
    };

    const status: Contestant['status'] = reason === 'eliminated' ? 'eliminated' : 'completed';

    const updatedContestant: Contestant = {
      ...contestant,
      score: finalScore,
      status: status,
      completedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      attempts: [...prev.attempts.filter(a => a.contestantId !== contestant.id), attempt],
      contestants: prev.contestants.map(c => c.id === contestant.id ? updatedContestant : c),
      activeQuizState: null,
      activeContestantId: null,
    }));

    soundEngine.stopTensionMusic();
    setIsMusicPlaying(false);

    if (finalScore > 50) {
      soundEngine.playVictory();
      fireVictoryFireworks();
    } else {
      soundEngine.playVictory();
      fireConfettiCelebration();
    }

    setViewingContestantId(contestant.id);
    setCurrentScreen('results');
  }, [state.activeQuizState, state.contestants, state.questions, state.settings]);

  const nextQuestion = useCallback(() => {
    const session = state.activeQuizState;
    if (!session) return;

    const lastRecord = session.history[session.history.length - 1];
    if (state.settings.mode === 'elimination' && lastRecord && !lastRecord.correct) {
      finishQuizRun('eliminated');
      return;
    }

    const nextIndex = session.questionIndex + 1;
    if (nextIndex >= session.questionIds.length) {
      finishQuizRun('completed');
      return;
    }

    soundEngine.setTensionIntensity(1);

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          questionIndex: nextIndex,
          selectedOption: null,
          isLocked: false,
          isRevealed: false,
          eliminatedIncorrectOptions: [],
          questionStartTime: Date.now(),
          timerRemaining: prev.settings.secondsPerQuestion,
          isTimerRunning: prev.settings.timerEnabled,
          audiencePollData: null,
        },
      };
    });

    soundEngine.playSelect();
  }, [state.activeQuizState, state.settings, finishQuizRun]);

  // Lifelines
  const useLifelineFiftyFifty = useCallback(() => {
    const session = state.activeQuizState;
    if (!session || session.isLocked || session.isRevealed) return;
    if (session.lifelinesUsedInRun.includes('50:50')) {
      showToast('50:50 Lifeline already used in this run', 'warning');
      return;
    }

    const currentQuestionId = session.questionIds[session.questionIndex];
    const currentQuestion = state.questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return;

    const allOptions: OptionKey[] = ['A', 'B', 'C', 'D'];
    const incorrectOptions = allOptions.filter(opt => opt !== currentQuestion.correctAnswer);
    const shuffled = [...incorrectOptions].sort(() => Math.random() - 0.5);
    const toEliminate = shuffled.slice(0, 2);

    soundEngine.playLifeline();

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          eliminatedIncorrectOptions: toEliminate,
          lifelinesUsedInRun: [...prev.activeQuizState.lifelinesUsedInRun, '50:50'],
        },
      };
    });

    showToast('50:50 applied: Two incorrect options eliminated!', 'info');
  }, [state.activeQuizState, state.questions, showToast]);

  const useLifelineAudiencePoll = useCallback((overrideData?: Record<OptionKey, number>) => {
    const session = state.activeQuizState;
    if (!session || session.isLocked || session.isRevealed) return;
    if (session.lifelinesUsedInRun.includes('audience')) {
      showToast('Ask the Audience lifeline already used', 'warning');
      return;
    }

    const currentQuestionId = session.questionIds[session.questionIndex];
    const currentQuestion = state.questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return;

    let pollResults: Record<OptionKey, number>;

    if (overrideData) {
      pollResults = overrideData;
    } else {
      const correctPct = Math.floor(Math.random() * 26) + 55;
      const remainingPct = 100 - correctPct;
      const otherOpts: OptionKey[] = (['A', 'B', 'C', 'D'] as OptionKey[]).filter(o => o !== currentQuestion.correctAnswer);

      const r1 = Math.floor(Math.random() * (remainingPct - 6)) + 2;
      const r2 = Math.floor(Math.random() * (remainingPct - r1 - 3)) + 1;
      const r3 = remainingPct - r1 - r2;

      pollResults = {
        [currentQuestion.correctAnswer]: correctPct,
        [otherOpts[0]]: r1,
        [otherOpts[1]]: r2,
        [otherOpts[2]]: r3,
      } as Record<OptionKey, number>;
    }

    soundEngine.playLifeline();

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          audiencePollData: pollResults,
          lifelinesUsedInRun: [...prev.activeQuizState.lifelinesUsedInRun, 'audience'],
        },
      };
    });
  }, [state.activeQuizState, state.questions, showToast]);

  const closeAudiencePollModal = useCallback(() => {
    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          audiencePollData: null,
        },
      };
    });
  }, []);

  const useLifelineSkipQuestion = useCallback(() => {
    const session = state.activeQuizState;
    if (!session || session.isLocked || session.isRevealed) return;
    if (session.lifelinesUsedInRun.includes('skip')) {
      showToast('Skip Question lifeline already used', 'warning');
      return;
    }

    const unusedQuestions = state.questions.filter(q => !session.questionIds.includes(q.id));
    soundEngine.playLifeline();

    if (unusedQuestions.length > 0) {
      const reserve = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
      const updatedQuestionIds = [...session.questionIds];
      updatedQuestionIds[session.questionIndex] = reserve.id;

      setState(prev => {
        if (!prev.activeQuizState) return prev;
        return {
          ...prev,
          activeQuizState: {
            ...prev.activeQuizState,
            questionIds: updatedQuestionIds,
            selectedOption: null,
            eliminatedIncorrectOptions: [],
            questionStartTime: Date.now(),
            timerRemaining: prev.settings.secondsPerQuestion,
            lifelinesUsedInRun: [...prev.activeQuizState.lifelinesUsedInRun, 'skip'],
          },
        };
      });
      showToast(`Question skipped! Replaced with question from ${reserve.category || 'bank'}.`, 'success');
    } else {
      showToast('Question skipped!', 'info');
      nextQuestion();
    }
  }, [state.activeQuizState, state.questions, showToast, nextQuestion]);

  const useLifelineExtraTime = useCallback((seconds?: number) => {
    const session = state.activeQuizState;
    if (!session || session.isLocked || session.isRevealed) return;
    if (session.lifelinesUsedInRun.includes('extra_time')) {
      showToast('Extra Time lifeline already used', 'warning');
      return;
    }

    const added = seconds || state.settings.extraTimeSeconds || 15;
    soundEngine.playLifeline();

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          timerRemaining: prev.activeQuizState.timerRemaining + added,
          lifelinesUsedInRun: [...prev.activeQuizState.lifelinesUsedInRun, 'extra_time'],
        },
      };
    });

    showToast(`Added +${added} extra seconds to the timer!`, 'success');
  }, [state.activeQuizState, state.settings.extraTimeSeconds, showToast]);

  // Host Controls
  const hostToggleTimer = useCallback(() => {
    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          isTimerRunning: !prev.activeQuizState.isTimerRunning,
        },
      };
    });
  }, []);

  const hostAdjustTime = useCallback((deltaSeconds: number) => {
    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          timerRemaining: Math.max(0, prev.activeQuizState.timerRemaining + deltaSeconds),
        },
      };
    });
  }, []);

  const hostManualMark = useCallback((markCorrect: boolean) => {
    const session = state.activeQuizState;
    if (!session || session.isRevealed) return;

    const currentQuestionId = session.questionIds[session.questionIndex];
    const currentQuestion = state.questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return;

    const chosenOption = markCorrect ? currentQuestion.correctAnswer : (session.selectedOption || 'A');
    const pointsAwarded = markCorrect ? currentQuestion.points : 0;
    const newScore = session.currentScore + pointsAwarded;

    if (markCorrect) {
      soundEngine.playCorrect();
    } else {
      soundEngine.playIncorrect();
    }

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      category: currentQuestion.category,
      selectedAnswer: chosenOption,
      correctAnswer: currentQuestion.correctAnswer,
      correct: markCorrect,
      pointsAwarded: pointsAwarded,
      timeTakenSeconds: Math.round((Date.now() - session.questionStartTime) / 1000),
      lifelinesUsedOnQuestion: [...session.lifelinesUsedInRun],
    };

    setState(prev => {
      if (!prev.activeQuizState) return prev;
      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          selectedOption: chosenOption,
          isLocked: true,
          isRevealed: true,
          isTimerRunning: false,
          currentScore: newScore,
          history: [...prev.activeQuizState.history, record],
        },
        contestants: prev.contestants.map(c => c.id === session.contestantId ? {
          ...c,
          score: newScore,
          currentQuestionIndex: session.questionIndex,
        } : c),
      };
    });

    showToast(`Host override: marked ${markCorrect ? 'CORRECT' : 'INCORRECT'}`, 'info');
  }, [state.activeQuizState, state.questions, showToast]);

  const hostEmergencyEnd = useCallback(() => {
    finishQuizRun('host_ended');
  }, [finishQuizRun]);

  const hostUndoLastReveal = useCallback(() => {
    setState(prev => {
      if (!prev.activeQuizState || !prev.activeQuizState.isRevealed) return prev;
      const historyCopy = [...prev.activeQuizState.history];
      const last = historyCopy.pop();
      const revertedScore = prev.activeQuizState.currentScore - (last?.pointsAwarded || 0);

      return {
        ...prev,
        activeQuizState: {
          ...prev.activeQuizState,
          isLocked: false,
          isRevealed: false,
          isTimerRunning: prev.settings.timerEnabled,
          currentScore: Math.max(0, revertedScore),
          history: historyCopy,
        },
        contestants: prev.contestants.map(c => c.id === prev.activeQuizState?.contestantId ? {
          ...c,
          score: Math.max(0, revertedScore),
        } : c),
      };
    });
    showToast('Undid answer reveal state', 'info');
  }, [showToast]);

  // ==========================================
  // 3-PHASE TOURNAMENT ENGINE IMPLEMENTATION
  // ==========================================

  const startTournament = useCallback((selectedContestantIds?: string[]) => {
    let contestantsToUse = selectedContestantIds && selectedContestantIds.length > 0
      ? state.contestants.filter(c => selectedContestantIds.includes(c.id))
      : state.contestants;

    if (contestantsToUse.length < 3) {
      showToast('Tournament requires at least 3 contestants. Please register contestants first.', 'warning');
      navigateTo('contestants');
      return;
    }

    if (state.questions.length < 15) {
      showToast('Need at least 15 questions in bank to run tournament.', 'warning');
      navigateTo('questions');
      return;
    }

    const contestantIds = contestantsToUse.map(c => c.id);
    const initialScores: Record<string, number> = {};
    contestantIds.forEach(id => { initialScores[id] = 0; });

    const initialQ = state.questions[Math.floor(Math.random() * state.questions.length)];

    const tournament: TournamentState = {
      isActive: true,
      currentPhase: 'phase1_qualifiers',
      participatingContestantIds: contestantIds,
      phase1: {
        contestantIds: contestantIds,
        currentTurnIndex: 0,
        cycleNumber: 1,
        totalCycles: state.settings.phaseSettings.phase1QuestionsPerContestant || 3,
        currentQuestionId: initialQ ? initialQ.id : null,
        selectedOption: null,
        isLocked: false,
        isRevealed: false,
        timerRemaining: state.settings.phaseSettings.phase1SecondsPerQuestion || 25,
        isTimerRunning: true,
        questionStartTime: Date.now(),
        scores: initialScores,
        advancingContestantIds: [],
        eliminatedContestantIds: [],
      },
      phase2: {
        contestantIds: [],
        activeContestantIndex: 0,
        activeContestantId: null,
        timerRemaining: state.settings.phaseSettings.phase2SpeedRunSeconds || 45,
        isTimerRunning: false,
        currentQuestion: null,
        selectedOption: null,
        isRevealed: false,
        questionsAnsweredInRun: 0,
        correctInRun: 0,
        scoreInRun: 0,
        completedScores: {},
        advancingContestantIds: [],
        eliminatedContestantIds: [],
      },
      phase3: {
        finalistIds: [],
        activeTurnIndex: 0,
        cycleNumber: 1,
        totalCycles: state.settings.phaseSettings.phase3QuestionsPerFinalist || 4,
        currentQuestion: null,
        selectedOption: null,
        isLocked: false,
        isRevealed: false,
        timerRemaining: state.settings.phaseSettings.phase3SecondsPerQuestion || 15,
        isTimerRunning: false,
        finalScores: {},
        winnerRankings: [],
      },
    };

    // Reset contestant scores in state
    setState(prev => ({
      ...prev,
      tournamentState: tournament,
      contestants: prev.contestants.map(c => contestantIds.includes(c.id) ? {
        ...c,
        score: 0,
        status: 'playing' as const,
      } : c),
    }));

    setCurrentScreen('tournament');
    soundEngine.playPhaseAdvance();

    if (state.settings.musicEnabled) {
      soundEngine.startTensionMusic(1);
      setIsMusicPlaying(true);
    }
    showToast(`Launched Phase 1 Qualifiers with ${contestantIds.length} Contestants!`, 'success');
  }, [state.contestants, state.questions, state.settings, showToast, navigateTo]);

  const setTournamentPhase = useCallback((phase: TournamentPhase) => {
    setState(prev => {
      if (!prev.tournamentState) return prev;
      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          currentPhase: phase,
        },
      };
    });
  }, []);

  // Phase 1 Option Select
  const selectPhase1Option = useCallback((option: OptionKey) => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase1_qualifiers') return prev;
      const p1 = prev.tournamentState.phase1;
      if (p1.isLocked || p1.isRevealed) return prev;

      soundEngine.playSelect();
      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase1: {
            ...p1,
            selectedOption: option,
          },
        },
      };
    });
  }, []);

  // Phase 1 Lock
  const lockPhase1Answer = useCallback(() => {
    const t = state.tournamentState;
    if (!t || t.currentPhase !== 'phase1_qualifiers' || !t.phase1.selectedOption || t.phase1.isLocked) return;

    soundEngine.playLock();
    soundEngine.setTensionIntensity(2);

    setState(prev => {
      if (!prev.tournamentState) return prev;
      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase1: {
            ...prev.tournamentState.phase1,
            isLocked: true,
            isTimerRunning: false,
          },
        },
      };
    });

    setTimeout(() => {
      revealPhase1Answer();
    }, state.settings.suspenseDelayMs || 1000);
  }, [state.tournamentState, state.settings.suspenseDelayMs]);

  // Phase 1 Reveal
  const revealPhase1Answer = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase1_qualifiers') return prev;
      const p1 = prev.tournamentState.phase1;
      if (p1.isRevealed) return prev;

      const currentQ = prev.questions.find(q => q.id === p1.currentQuestionId);
      if (!currentQ) return prev;

      const activeContestantId = p1.contestantIds[p1.currentTurnIndex];
      const isCorrect = p1.selectedOption === currentQ.correctAnswer;
      const points = isCorrect ? currentQ.points : 0;
      const updatedScores = {
        ...p1.scores,
        [activeContestantId]: (p1.scores[activeContestantId] || 0) + points,
      };

      if (isCorrect) {
        soundEngine.playCorrect();
      } else {
        soundEngine.playIncorrect();
      }

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase1: {
            ...p1,
            isLocked: true,
            isRevealed: true,
            isTimerRunning: false,
            scores: updatedScores,
          },
        },
        contestants: prev.contestants.map(c => c.id === activeContestantId ? {
          ...c,
          score: updatedScores[activeContestantId],
        } : c),
      };
    });
  }, []);

  // Phase 1 Next Turn
  const nextPhase1Turn = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase1_qualifiers') return prev;
      const p1 = prev.tournamentState.phase1;

      const nextTurnIndex = p1.currentTurnIndex + 1;
      let nextCycle = p1.cycleNumber;
      let isPhase1Finished = false;

      if (nextTurnIndex >= p1.contestantIds.length) {
        // One complete circle finished
        nextCycle = p1.cycleNumber + 1;
        if (nextCycle > p1.totalCycles) {
          isPhase1Finished = true;
        }
      }

      const activeIndex = isPhase1Finished ? 0 : nextTurnIndex % p1.contestantIds.length;

      // Pick a fresh question
      const randomQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

      if (isPhase1Finished) {
        // Compute rankings in Phase 1
        const ranked = [...p1.contestantIds].sort((a, b) => (p1.scores[b] || 0) - (p1.scores[a] || 0));
        const advanceCount = Math.min(prev.settings.phaseSettings.phase1AdvancingCount || 4, ranked.length);
        const advancing = ranked.slice(0, advanceCount);
        const eliminated = ranked.slice(advanceCount);

        soundEngine.playPhaseAdvance();
        fireConfettiCelebration();

        return {
          ...prev,
          tournamentState: {
            ...prev.tournamentState,
            currentPhase: 'phase1_summary',
            phase1: {
              ...p1,
              advancingContestantIds: advancing,
              eliminatedContestantIds: eliminated,
            },
            phase2: {
              ...prev.tournamentState.phase2,
              contestantIds: advancing,
            },
          },
          contestants: prev.contestants.map(c => {
            if (advancing.includes(c.id)) return { ...c, status: 'qualified_phase2' };
            if (eliminated.includes(c.id)) return { ...c, status: 'eliminated' };
            return c;
          }),
        };
      }

      soundEngine.setTensionIntensity(1);

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase1: {
            ...p1,
            currentTurnIndex: activeIndex,
            cycleNumber: nextCycle,
            currentQuestionId: randomQ.id,
            selectedOption: null,
            isLocked: false,
            isRevealed: false,
            timerRemaining: prev.settings.phaseSettings.phase1SecondsPerQuestion || 25,
            isTimerRunning: true,
            questionStartTime: Date.now(),
          },
        },
      };
    });
  }, []);

  // Advance Phase 1 -> Phase 2
  const advanceToPhase2 = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState) return prev;
      const advancing = prev.tournamentState.phase1.advancingContestantIds;
      if (advancing.length === 0) return prev;

      const firstContestantId = advancing[0];
      const initialQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

      soundEngine.playPhaseAdvance();

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          currentPhase: 'phase2_speedrun',
          phase2: {
            contestantIds: advancing,
            activeContestantIndex: 0,
            activeContestantId: firstContestantId,
            timerRemaining: prev.settings.phaseSettings.phase2SpeedRunSeconds || 45,
            isTimerRunning: false,
            currentQuestion: initialQ,
            selectedOption: null,
            isRevealed: false,
            questionsAnsweredInRun: 0,
            correctInRun: 0,
            scoreInRun: 0,
            completedScores: {},
            advancingContestantIds: [],
            eliminatedContestantIds: [],
          },
        },
      };
    });
    showToast('Phase 2: Speed Run Hot-Seat ready! Click "Start Rapid Run" when contestant is set.', 'info');
  }, [showToast]);

  // Phase 2 Start Run
  const startPhase2ContestantRun = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase2_speedrun') return prev;
      const p2 = prev.tournamentState.phase2;
      const initialQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

      soundEngine.startTensionMusic(2);
      setIsMusicPlaying(true);

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase2: {
            ...p2,
            timerRemaining: prev.settings.phaseSettings.phase2SpeedRunSeconds || 45,
            isTimerRunning: true,
            currentQuestion: initialQ,
            selectedOption: null,
            isRevealed: false,
            questionsAnsweredInRun: 0,
            correctInRun: 0,
            scoreInRun: 0,
          },
        },
      };
    });
  }, []);

  // Phase 2 Submit Answer
  const submitPhase2Answer = useCallback((option: OptionKey | null, isPass: boolean = false) => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase2_speedrun') return prev;
      const p2 = prev.tournamentState.phase2;
      if (!p2.isTimerRunning || !p2.currentQuestion) return prev;

      const isCorrect = !isPass && option === p2.currentQuestion.correctAnswer;
      const points = isCorrect ? p2.currentQuestion.points : 0;

      if (isCorrect) {
        soundEngine.playCorrect();
      } else if (isPass) {
        soundEngine.playTick();
      } else {
        soundEngine.playIncorrect();
      }

      // Grab next question fast
      const nextQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase2: {
            ...p2,
            questionsAnsweredInRun: p2.questionsAnsweredInRun + 1,
            correctInRun: p2.correctInRun + (isCorrect ? 1 : 0),
            scoreInRun: p2.scoreInRun + points,
            currentQuestion: nextQ,
            selectedOption: null,
          },
        },
      };
    });
  }, []);

  // Phase 2 Finish Contestant Run
  const finishPhase2ContestantRun = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase2_speedrun') return prev;
      const p2 = prev.tournamentState.phase2;
      const currentId = p2.activeContestantId;
      if (!currentId) return prev;

      const updatedCompleted = {
        ...p2.completedScores,
        [currentId]: {
          score: p2.scoreInRun,
          correct: p2.correctInRun,
          attempted: p2.questionsAnsweredInRun,
        },
      };

      // Add to overall contestant score
      const updatedContestants = prev.contestants.map(c => c.id === currentId ? {
        ...c,
        score: c.score + p2.scoreInRun,
      } : c);

      const nextIndex = p2.activeContestantIndex + 1;
      const isAllDone = nextIndex >= p2.contestantIds.length;

      soundEngine.playVictory();

      if (isAllDone) {
        // Rank by Phase 2 score (and total score)
        const ranked = [...p2.contestantIds].sort((a, b) => {
          const scoreA = (updatedCompleted[a]?.score || 0);
          const scoreB = (updatedCompleted[b]?.score || 0);
          return scoreB - scoreA;
        });

        const advanceCount = Math.min(prev.settings.phaseSettings.phase2AdvancingCount || 3, ranked.length);
        const advancing = ranked.slice(0, advanceCount);
        const eliminated = ranked.slice(advanceCount);

        fireConfettiCelebration();

        return {
          ...prev,
          contestants: updatedContestants.map(c => {
            if (advancing.includes(c.id)) return { ...c, status: 'qualified_phase3' as const };
            if (eliminated.includes(c.id)) return { ...c, status: 'eliminated' as const };
            return c;
          }),
          tournamentState: {
            ...prev.tournamentState,
            currentPhase: 'phase2_summary',
            phase2: {
              ...p2,
              isTimerRunning: false,
              completedScores: updatedCompleted,
              advancingContestantIds: advancing,
              eliminatedContestantIds: eliminated,
            },
            phase3: {
              ...prev.tournamentState.phase3,
              finalistIds: advancing,
            },
          },
        };
      }

      // Next contestant in Phase 2
      const nextId = p2.contestantIds[nextIndex];
      const nextQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

      return {
        ...prev,
        contestants: updatedContestants,
        tournamentState: {
          ...prev.tournamentState,
          phase2: {
            ...p2,
            activeContestantIndex: nextIndex,
            activeContestantId: nextId,
            timerRemaining: prev.settings.phaseSettings.phase2SpeedRunSeconds || 45,
            isTimerRunning: false,
            currentQuestion: nextQ,
            selectedOption: null,
            questionsAnsweredInRun: 0,
            correctInRun: 0,
            scoreInRun: 0,
            completedScores: updatedCompleted,
          },
        },
      };
    });
  }, []);

  // Advance Phase 2 -> Phase 3 Grand Finale
  const advanceToPhase3 = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState) return prev;
      const finalists = prev.tournamentState.phase2.advancingContestantIds;
      if (finalists.length === 0) return prev;

      const initialQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];
      const initialScores: Record<string, number> = {};
      finalists.forEach(id => { initialScores[id] = 0; });

      soundEngine.playPhaseAdvance();

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          currentPhase: 'phase3_finale',
          phase3: {
            finalistIds: finalists,
            activeTurnIndex: 0,
            cycleNumber: 1,
            totalCycles: prev.settings.phaseSettings.phase3QuestionsPerFinalist || 4,
            currentQuestion: initialQ,
            selectedOption: null,
            isLocked: false,
            isRevealed: false,
            timerRemaining: prev.settings.phaseSettings.phase3SecondsPerQuestion || 15,
            isTimerRunning: true,
            finalScores: initialScores,
            winnerRankings: [],
          },
        },
      };
    });
    showToast('Grand Finale! 3 Finalists battle for 1st, 2nd, and 3rd place with rapid 15s clocks!', 'success');
  }, [showToast]);

  // Phase 3 Option Select
  const selectPhase3Option = useCallback((option: OptionKey) => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase3_finale') return prev;
      const p3 = prev.tournamentState.phase3;
      if (p3.isLocked || p3.isRevealed) return prev;

      soundEngine.playSelect();
      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase3: {
            ...p3,
            selectedOption: option,
          },
        },
      };
    });
  }, []);

  // Phase 3 Lock
  const lockPhase3Answer = useCallback(() => {
    const t = state.tournamentState;
    if (!t || t.currentPhase !== 'phase3_finale' || !t.phase3.selectedOption || t.phase3.isLocked) return;

    soundEngine.playLock();
    soundEngine.setTensionIntensity(3);

    setState(prev => {
      if (!prev.tournamentState) return prev;
      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase3: {
            ...prev.tournamentState.phase3,
            isLocked: true,
            isTimerRunning: false,
          },
        },
      };
    });

    setTimeout(() => {
      revealPhase3Answer();
    }, state.settings.suspenseDelayMs || 1000);
  }, [state.tournamentState, state.settings.suspenseDelayMs]);

  // Phase 3 Reveal
  const revealPhase3Answer = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase3_finale') return prev;
      const p3 = prev.tournamentState.phase3;
      if (p3.isRevealed || !p3.currentQuestion) return prev;

      const activeFinalistId = p3.finalistIds[p3.activeTurnIndex];
      const isCorrect = p3.selectedOption === p3.currentQuestion.correctAnswer;
      // High tension final bonus points (+15 pts)
      const points = isCorrect ? (p3.currentQuestion.points + 10) : 0;

      const updatedScores = {
        ...p3.finalScores,
        [activeFinalistId]: (p3.finalScores[activeFinalistId] || 0) + points,
      };

      if (isCorrect) {
        soundEngine.playCorrect();
      } else {
        soundEngine.playIncorrect();
      }

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase3: {
            ...p3,
            isLocked: true,
            isRevealed: true,
            isTimerRunning: false,
            finalScores: updatedScores,
          },
        },
        contestants: prev.contestants.map(c => c.id === activeFinalistId ? {
          ...c,
          score: c.score + points,
        } : c),
      };
    });
  }, []);

  // Phase 3 Next Turn
  const nextPhase3Turn = useCallback(() => {
    setState(prev => {
      if (!prev.tournamentState || prev.tournamentState.currentPhase !== 'phase3_finale') return prev;
      const p3 = prev.tournamentState.phase3;

      const nextTurnIndex = p3.activeTurnIndex + 1;
      let nextCycle = p3.cycleNumber;
      let isFinalsFinished = false;

      if (nextTurnIndex >= p3.finalistIds.length) {
        nextCycle = p3.cycleNumber + 1;
        if (nextCycle > p3.totalCycles) {
          isFinalsFinished = true;
        }
      }

      if (isFinalsFinished) {
        // Calculate Winners: Rank by overall score
        const rankedFinalists = [...p3.finalistIds].sort((a, b) => {
          const contestantA = prev.contestants.find(c => c.id === a);
          const contestantB = prev.contestants.find(c => c.id === b);
          return (contestantB?.score || 0) - (contestantA?.score || 0);
        });

        soundEngine.stopTensionMusic();
        setIsMusicPlaying(false);
        soundEngine.playVictory();
        fireVictoryFireworks();

        return {
          ...prev,
          contestants: prev.contestants.map(c => {
            if (c.id === rankedFinalists[0]) return { ...c, status: 'champion' as const };
            if (c.id === rankedFinalists[1]) return { ...c, status: 'runner_up' as const };
            if (c.id === rankedFinalists[2]) return { ...c, status: 'third_place' as const };
            return c;
          }),
          tournamentState: {
            ...prev.tournamentState,
            currentPhase: 'podium',
            phase3: {
              ...p3,
              winnerRankings: rankedFinalists,
            },
          },
        };
      }

      const activeIndex = nextTurnIndex % p3.finalistIds.length;
      const randomQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

      soundEngine.setTensionIntensity(2);

      return {
        ...prev,
        tournamentState: {
          ...prev.tournamentState,
          phase3: {
            ...p3,
            activeTurnIndex: activeIndex,
            cycleNumber: nextCycle,
            currentQuestion: randomQ,
            selectedOption: null,
            isLocked: false,
            isRevealed: false,
            timerRemaining: prev.settings.phaseSettings.phase3SecondsPerQuestion || 15,
            isTimerRunning: true,
          },
        },
      };
    });
  }, []);

  const finishTournament = useCallback(() => {
    soundEngine.stopTensionMusic();
    setIsMusicPlaying(false);
    setCurrentScreen('leaderboard');
  }, []);

  const resetTournament = useCallback(() => {
    soundEngine.stopTensionMusic();
    setIsMusicPlaying(false);
    setState(prev => ({
      ...prev,
      tournamentState: null,
    }));
    showToast('Tournament reset', 'info');
    setCurrentScreen('dashboard');
  }, [showToast]);

  // Master 1-Second Timer for Classic & Tournament
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        // Check Classic Quiz
        const session = prev.activeQuizState;
        if (session && session.isTimerRunning && !session.isLocked && !session.isRevealed) {
          if (session.timerRemaining <= 1) {
            soundEngine.playIncorrect();
            const currentQ = prev.questions.find(q => q.id === session.questionIds[session.questionIndex]);
            const timeOutRecord: AnswerRecord = {
              questionId: currentQ?.id || '',
              questionText: currentQ?.question || '',
              category: currentQ?.category,
              selectedAnswer: null,
              correctAnswer: currentQ?.correctAnswer || 'A',
              correct: false,
              pointsAwarded: 0,
              timeTakenSeconds: prev.settings.secondsPerQuestion,
              lifelinesUsedOnQuestion: [...session.lifelinesUsedInRun],
            };
            return {
              ...prev,
              activeQuizState: {
                ...session,
                timerRemaining: 0,
                isTimerRunning: false,
                isLocked: true,
                isRevealed: true,
                history: [...session.history, timeOutRecord],
              },
            };
          }
          const next = session.timerRemaining - 1;
          if (next <= prev.settings.urgentTimerThreshold && next > 0) soundEngine.playUrgentTick();
          else if (next > 0) soundEngine.playTick();

          return {
            ...prev,
            activeQuizState: { ...session, timerRemaining: next },
          };
        }

        // Check Tournament State
        const t = prev.tournamentState;
        if (t && t.isActive) {
          // Phase 1 Timer
          if (t.currentPhase === 'phase1_qualifiers' && t.phase1.isTimerRunning && !t.phase1.isLocked && !t.phase1.isRevealed) {
            if (t.phase1.timerRemaining <= 1) {
              soundEngine.playIncorrect();
              return {
                ...prev,
                tournamentState: {
                  ...t,
                  phase1: {
                    ...t.phase1,
                    timerRemaining: 0,
                    isTimerRunning: false,
                    isLocked: true,
                    isRevealed: true,
                  },
                },
              };
            }
            const next = t.phase1.timerRemaining - 1;
            if (next <= 5 && next > 0) soundEngine.playUrgentTick();
            else if (next > 0) soundEngine.playTick();
            return {
              ...prev,
              tournamentState: { ...t, phase1: { ...t.phase1, timerRemaining: next } },
            };
          }

          // Phase 2 Speed Run Timer
          if (t.currentPhase === 'phase2_speedrun' && t.phase2.isTimerRunning) {
            if (t.phase2.timerRemaining <= 1) {
              // Speed run time expired for this contestant!
              soundEngine.playIncorrect();
              const currentId = t.phase2.activeContestantId;
              const updatedCompleted = {
                ...t.phase2.completedScores,
                [currentId || '']: {
                  score: t.phase2.scoreInRun,
                  correct: t.phase2.correctInRun,
                  attempted: t.phase2.questionsAnsweredInRun,
                },
              };

              const updatedContestants = prev.contestants.map(c => c.id === currentId ? {
                ...c,
                score: c.score + t.phase2.scoreInRun,
              } : c);

              const nextIdx = t.phase2.activeContestantIndex + 1;
              const isAllDone = nextIdx >= t.phase2.contestantIds.length;

              if (isAllDone) {
                const ranked = [...t.phase2.contestantIds].sort((a, b) => (updatedCompleted[b]?.score || 0) - (updatedCompleted[a]?.score || 0));
                const advanceCount = Math.min(prev.settings.phaseSettings.phase2AdvancingCount || 3, ranked.length);
                const advancing = ranked.slice(0, advanceCount);
                const eliminated = ranked.slice(advanceCount);

                fireConfettiCelebration();

                return {
                  ...prev,
                  contestants: updatedContestants.map(c => {
                    if (advancing.includes(c.id)) return { ...c, status: 'qualified_phase3' as const };
                    if (eliminated.includes(c.id)) return { ...c, status: 'eliminated' as const };
                    return c;
                  }),
                  tournamentState: {
                    ...t,
                    currentPhase: 'phase2_summary',
                    phase2: {
                      ...t.phase2,
                      timerRemaining: 0,
                      isTimerRunning: false,
                      completedScores: updatedCompleted,
                      advancingContestantIds: advancing,
                      eliminatedContestantIds: eliminated,
                    },
                    phase3: {
                      ...t.phase3,
                      finalistIds: advancing,
                    },
                  },
                };
              }

              const nextId = t.phase2.contestantIds[nextIdx];
              const nextQ = prev.questions[Math.floor(Math.random() * prev.questions.length)];

              return {
                ...prev,
                contestants: updatedContestants,
                tournamentState: {
                  ...t,
                  phase2: {
                    ...t.phase2,
                    activeContestantIndex: nextIdx,
                    activeContestantId: nextId,
                    timerRemaining: prev.settings.phaseSettings.phase2SpeedRunSeconds || 45,
                    isTimerRunning: false,
                    currentQuestion: nextQ,
                    selectedOption: null,
                    questionsAnsweredInRun: 0,
                    correctInRun: 0,
                    scoreInRun: 0,
                    completedScores: updatedCompleted,
                  },
                },
              };
            }

            const next = t.phase2.timerRemaining - 1;
            if (next <= 10 && next > 0) soundEngine.playUrgentTick();
            else if (next > 0) soundEngine.playTick();

            return {
              ...prev,
              tournamentState: { ...t, phase2: { ...t.phase2, timerRemaining: next } },
            };
          }

          // Phase 3 Finale Timer
          if (t.currentPhase === 'phase3_finale' && t.phase3.isTimerRunning && !t.phase3.isLocked && !t.phase3.isRevealed) {
            if (t.phase3.timerRemaining <= 1) {
              soundEngine.playIncorrect();
              return {
                ...prev,
                tournamentState: {
                  ...t,
                  phase3: {
                    ...t.phase3,
                    timerRemaining: 0,
                    isTimerRunning: false,
                    isLocked: true,
                    isRevealed: true,
                  },
                },
              };
            }
            const next = t.phase3.timerRemaining - 1;
            if (next <= 5 && next > 0) soundEngine.playUrgentTick();
            else if (next > 0) soundEngine.playTick();
            return {
              ...prev,
              tournamentState: { ...t, phase3: { ...t.phase3, timerRemaining: next } },
            };
          }
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CompetitionContext.Provider
      value={{
        state,
        currentScreen,
        viewingContestantId,
        isPresentationMode,
        toasts,
        isMusicPlaying,
        showToast,
        dismissToast,
        navigateTo,
        togglePresentationMode,
        
        toggleMusic,
        setMusicVolume,
        setSoundVolume,
        setMusicType,

        addContestant,
        addContestantsBulk,
        updateContestant,
        deleteContestant,
        resetContestantAttempt,
        clearAllContestants,

        addQuestion,
        updateQuestion,
        deleteQuestion,
        duplicateQuestion,
        reorderQuestions,
        importQuestions,
        resetToDefaultQuestions,
        clearAllQuestions,

        updateSettings,
        updateCompetitionMeta,
        resetScoresOnly,
        resetEntireCompetition,
        importCompetitionState,

        startQuiz,
        resumeQuiz,
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

        hostToggleTimer,
        hostAdjustTime,
        hostManualMark,
        hostEmergencyEnd,
        hostUndoLastReveal,

        startTournament,
        setTournamentPhase,
        selectPhase1Option,
        lockPhase1Answer,
        revealPhase1Answer,
        nextPhase1Turn,
        advanceToPhase2,

        startPhase2ContestantRun,
        submitPhase2Answer,
        finishPhase2ContestantRun,
        advanceToPhase3,

        selectPhase3Option,
        lockPhase3Answer,
        revealPhase3Answer,
        nextPhase3Turn,
        finishTournament,
        resetTournament,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};
