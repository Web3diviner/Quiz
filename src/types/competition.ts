export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Question = {
  id: string;
  category?: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: OptionKey;
  points: number;
  difficulty?: Difficulty;
};

export type ContestantStatus = 'not_started' | 'playing' | 'completed' | 'eliminated' | 'qualified_phase2' | 'qualified_phase3' | 'champion' | 'runner_up' | 'third_place';

export type Contestant = {
  id: string;
  name: string;
  school: string;
  score: number;
  currentQuestionIndex: number;
  status: ContestantStatus;
  startedAt?: string;
  completedAt?: string;
  activeQuestionIds?: string[];
  totalQuestions?: number;
};

export type AnswerRecord = {
  questionId: string;
  questionText: string;
  category?: string;
  selectedAnswer?: OptionKey | null;
  correctAnswer: OptionKey;
  correct: boolean;
  pointsAwarded: number;
  timeTakenSeconds?: number;
  lifelinesUsedOnQuestion?: string[];
};

export type ContestantAttempt = {
  contestantId: string;
  answers: AnswerRecord[];
  totalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  startedAt: string;
  completedAt?: string;
  lifelinesUsed: string[];
  totalTimeSeconds: number;
};

export type CompetitionMode = 'continue' | 'elimination';

export type TournamentPhase =
  | 'overview'
  | 'phase1_qualifiers'
  | 'phase1_summary'
  | 'phase2_speedrun'
  | 'phase2_summary'
  | 'phase3_finale'
  | 'podium';

export type PhaseSettings = {
  phase1QuestionsPerContestant: number; // e.g. 3 questions per contestant (alternating in turn)
  phase1SecondsPerQuestion: number; // e.g. 25s
  phase1AdvancingCount: number; // e.g. 4 advance (bottom 2 eliminated if 6 start)

  phase2SpeedRunSeconds: number; // e.g. 45s speed run timer per contestant
  phase2AdvancingCount: number; // e.g. 3 advance to finals (bottom 1 eliminated)

  phase3QuestionsPerFinalist: number; // e.g. 4 questions each in finals
  phase3SecondsPerQuestion: number; // e.g. 15s (shorter tension timer)
};

export type TournamentState = {
  isActive: boolean;
  currentPhase: TournamentPhase;
  participatingContestantIds: string[];

  // Phase 1: Alternating Qualifier Turn-by-Turn
  phase1: {
    contestantIds: string[];
    currentTurnIndex: number; // index in phase1.contestantIds
    cycleNumber: number;
    totalCycles: number;
    currentQuestionId: string | null;
    selectedOption: OptionKey | null;
    isLocked: boolean;
    isRevealed: boolean;
    timerRemaining: number;
    isTimerRunning: boolean;
    questionStartTime: number;
    scores: Record<string, number>;
    advancingContestantIds: string[];
    eliminatedContestantIds: string[];
  };

  // Phase 2: Speed Run Hot-Seat Against Clock
  phase2: {
    contestantIds: string[];
    activeContestantIndex: number;
    activeContestantId: string | null;
    timerRemaining: number;
    isTimerRunning: boolean;
    currentQuestion: Question | null;
    selectedOption: OptionKey | null;
    isRevealed: boolean;
    questionsAnsweredInRun: number;
    correctInRun: number;
    scoreInRun: number;
    completedScores: Record<string, { score: number; correct: number; attempted: number }>;
    advancingContestantIds: string[];
    eliminatedContestantIds: string[];
  };

  // Phase 3: Grand Finale Back-to-Back Showdown
  phase3: {
    finalistIds: string[];
    activeTurnIndex: number; // index in finalistIds
    cycleNumber: number;
    totalCycles: number;
    currentQuestion: Question | null;
    selectedOption: OptionKey | null;
    isLocked: boolean;
    isRevealed: boolean;
    timerRemaining: number;
    isTimerRunning: boolean;
    finalScores: Record<string, number>;
    winnerRankings: string[]; // [1st, 2nd, 3rd]
  };
};

export type MusicType =
  | 'mozart_nachtmusik'
  | 'mozart_symphony40'
  | 'mozart_figaro'
  | 'mozart_flute'
  | 'mozart_alla_turca'
  | 'mozart_concerto21'
  | 'mozart_clarinet'
  | 'mozart_requiem'
  | 'handel_sarabande'
  | 'emotional'
  | 'growth'
  | 'suspense';

export type QuizSettings = {
  // Quiz Engine
  mode: CompetitionMode;
  competitionType: 'tournament' | 'classic';
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  questionsPerContestant: number; // 0 = all questions in bank
  showCorrectAnswerAfterEach: boolean;
  suspenseDelayMs: number; // Suspense delay before reveal

  // Tournament Phase Settings
  phaseSettings: PhaseSettings;

  // Timer
  timerEnabled: boolean;
  secondsPerQuestion: number;
  urgentTimerThreshold: number;

  // Lifelines
  enableFiftyFifty: boolean;
  enableAudiencePoll: boolean;
  enableSkipQuestion: boolean;
  enableExtraTime: boolean;
  extraTimeSeconds: number;

  // Safe Levels
  safeLevelsEnabled: boolean;
  safeQuestionNumbers: number[]; // e.g. [5, 10, 15]

  // Appearance, Sound & Tension Music
  competitionTitle: string;
  competitionSubtitle: string;
  organizerName: string;
  competitionDate: string;
  competitionLogoBase64?: string;
  soundEnabled: boolean;
  soundVolume: number;
  musicEnabled: boolean;
  musicVolume: number;
  musicType: MusicType;
  animationsEnabled: boolean;
  themeAccent: 'violet' | 'gold' | 'emerald' | 'crimson' | 'cyan';
};

export type CompetitionState = {
  version: 1;
  competition: {
    title: string;
    subtitle?: string;
    organizer?: string;
    date?: string;
    logo?: string;
  };
  contestants: Contestant[];
  questions: Question[];
  settings: QuizSettings;
  attempts: ContestantAttempt[];
  activeContestantId?: string | null;
  activeQuizState?: ActiveQuizSession | null;
  tournamentState?: TournamentState | null;
};

export type ActiveQuizSession = {
  contestantId: string;
  questionIndex: number;
  questionIds: string[];
  currentScore: number;
  selectedOption: OptionKey | null;
  isLocked: boolean;
  isRevealed: boolean;
  eliminatedIncorrectOptions: OptionKey[]; // From 50:50
  lifelinesUsedInRun: string[];
  questionStartTime: number;
  timerRemaining: number;
  isTimerRunning: boolean;
  audiencePollData?: Record<OptionKey, number> | null;
  history: AnswerRecord[];
  isCompleted: boolean;
};

export type ViewScreen = 
  | 'landing'
  | 'dashboard'
  | 'contestants'
  | 'questions'
  | 'quiz'
  | 'tournament'
  | 'leaderboard'
  | 'results'
  | 'settings';
