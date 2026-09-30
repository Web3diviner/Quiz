import { CompetitionState, Contestant, Question, QuizSettings, ContestantAttempt, OptionKey } from '../types/competition';
import { DEFAULT_QUESTIONS, PRODUCT_NAME, PRODUCT_SUBTITLE } from '../data/sampleQuestions';

export const STORAGE_KEY = 'quizCompetition_v1';

export const DEFAULT_SETTINGS: QuizSettings = {
  mode: 'continue',
  competitionType: 'tournament',
  randomizeQuestions: false,
  randomizeOptions: false,
  questionsPerContestant: 15,
  showCorrectAnswerAfterEach: true,
  suspenseDelayMs: 1200,

  phaseSettings: {
    phase1QuestionsPerContestant: 3,
    phase1SecondsPerQuestion: 25,
    phase1AdvancingCount: 4,
    phase2SpeedRunSeconds: 45,
    phase2AdvancingCount: 3,
    phase3QuestionsPerFinalist: 4,
    phase3SecondsPerQuestion: 15,
  },

  timerEnabled: true,
  secondsPerQuestion: 30,
  urgentTimerThreshold: 10,

  enableFiftyFifty: true,
  enableAudiencePoll: true,
  enableSkipQuestion: true,
  enableExtraTime: true,
  extraTimeSeconds: 15,

  safeLevelsEnabled: true,
  safeQuestionNumbers: [5, 10, 15],

  competitionTitle: 'QuizArena Championship',
  competitionSubtitle: '',
  organizerName: 'Quizmaster Committee',
  competitionDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  soundVolume: 0.6,
  musicEnabled: true,
  musicVolume: 0.45,
  musicType: 'emotional',
  animationsEnabled: true,
  themeAccent: 'violet',
};

export const INITIAL_CONTESTANTS: Contestant[] = [];

export function getInitialState(): CompetitionState {
  return {
    version: 1,
    competition: {
      title: DEFAULT_SETTINGS.competitionTitle,
      subtitle: DEFAULT_SETTINGS.competitionSubtitle,
      organizer: DEFAULT_SETTINGS.organizerName,
      date: DEFAULT_SETTINGS.competitionDate,
    },
    contestants: [],
    questions: DEFAULT_QUESTIONS,
    settings: DEFAULT_SETTINGS,
    attempts: [],
    activeContestantId: null,
    activeQuizState: null,
    tournamentState: null,
  };
}

export function loadCompetitionState(): CompetitionState {
  if (typeof window === 'undefined') return getInitialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialState();
      saveCompetitionState(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.version === 1) {
      // Filter out any mock contestants (c1..c5, c_official_)
      const sanitizedContestants = Array.isArray(parsed.contestants)
        ? parsed.contestants.filter((c: Contestant) => !['c1', 'c2', 'c3', 'c4', 'c5'].includes(c.id) && !c.id.startsWith('c_official_'))
        : [];

      // Check if stored questions contain old finance/budget questions, if so update to new history bank
      const hasOldFinanceQuestions = Array.isArray(parsed.questions) && parsed.questions.some((q: Question) => 
        q.question?.includes('budget') || q.question?.includes('MPR') || q.question?.includes('AfroBasket')
      );

      const activeQuestions = (!parsed.questions || parsed.questions.length === 0 || hasOldFinanceQuestions)
        ? DEFAULT_QUESTIONS
        : parsed.questions;

      const hasContestants = sanitizedContestants.length > 0;

      // Clean up legacy titles/subtitles
      const comp = {
        ...getInitialState().competition,
        ...(parsed.competition || {}),
      };
      if (comp.subtitle === 'Excellence in Knowledge & Intellectual Rigour' || comp.subtitle === 'Excellence in Knowledge & Intellectual Rigour') {
        comp.subtitle = '';
      }
      if (comp.title === 'National Interschool Quiz Championship') {
        comp.title = 'QuizArena Championship';
      }

      return {
        ...getInitialState(),
        ...parsed,
        competition: comp,
        contestants: sanitizedContestants,
        questions: activeQuestions,
        attempts: hasContestants ? (parsed.attempts || []) : [],
        activeContestantId: hasContestants ? parsed.activeContestantId : null,
        activeQuizState: hasContestants ? parsed.activeQuizState : null,
        tournamentState: hasContestants ? parsed.tournamentState : null,
        settings: {
          ...DEFAULT_SETTINGS,
          ...(parsed.settings || {}),
        },
      };
    }
  } catch (err) {
    console.error('Failed to parse competition state from localStorage:', err);
  }
  return getInitialState();
}

export function saveCompetitionState(state: CompetitionState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save competition state to localStorage:', err);
  }
}

// Export competition state to JSON backup file
export function exportCompetitionBackup(state: CompetitionState): void {
  const exportData = {
    exportedAt: new Date().toISOString(),
    generator: PRODUCT_NAME,
    state: state,
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quiz-competition-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download Question Template JSON
export function downloadQuestionTemplate(): void {
  const template = [
    {
      question: "Which Nigerian city is known as the Coal City?",
      options: {
        A: "Ibadan",
        B: "Enugu",
        C: "Jos",
        D: "Calabar"
      },
      correctAnswer: "B",
      points: 10,
      difficulty: "Easy",
      category: "Nigeria Geography"
    },
    {
      question: "What is the capital of Canada?",
      options: {
        A: "Toronto",
        B: "Vancouver",
        C: "Ottawa",
        D: "Montreal"
      },
      correctAnswer: "C",
      points: 20,
      difficulty: "Medium",
      category: "World Geography"
    }
  ];
  const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quiz-question-import-template.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Export Leaderboard to CSV
export function exportLeaderboardCSV(
  rankedEntries: Array<{
    rank: number;
    contestant: Contestant;
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    totalTimeSeconds: number;
    accuracy: number;
  }>
): void {
  const headers = ['Rank', 'Contestant Name', 'School Represented', 'Status', 'Score', 'Correct Answers', 'Incorrect Answers', 'Questions Attempted', 'Accuracy %', 'Time (seconds)'];
  const rows = rankedEntries.map(e => [
    e.rank,
    `"${e.contestant.name.replace(/"/g, '""')}"`,
    `"${e.contestant.school.replace(/"/g, '""')}"`,
    e.contestant.status,
    e.score,
    e.correctAnswers,
    e.incorrectAnswers,
    e.totalQuestions,
    `${e.accuracy}%`,
    e.totalTimeSeconds
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const a = document.createElement('a');
  a.href = encodedUri;
  a.download = `quiz-leaderboard-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportResultsToCsv(contestants: Contestant[], attempts: ContestantAttempt[] = []): void {
  const attemptMap = new Map<string, ContestantAttempt>();
  attempts.forEach(a => attemptMap.set(a.contestantId, a));

  const entries = contestants.map(contestant => {
    const attempt = attemptMap.get(contestant.id);
    const score = contestant.score;
    const correctAnswers = attempt?.correctAnswers ?? 0;
    const incorrectAnswers = attempt?.incorrectAnswers ?? 0;
    const totalQuestions = (attempt?.answers.length) ?? 0;
    const totalTimeSeconds = attempt?.totalTimeSeconds ?? 0;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      rank: 0,
      contestant,
      score,
      correctAnswers,
      incorrectAnswers,
      totalQuestions,
      totalTimeSeconds,
      accuracy,
    };
  });

  entries.sort((a, b) => b.score - a.score);
  const ranked = entries.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  exportLeaderboardCSV(ranked);
}

// Validate Imported Competition State JSON
export function validateCompetitionImport(rawJson: string): { valid: boolean; state?: CompetitionState; error?: string } {
  try {
    const data = JSON.parse(rawJson);
    const candidate: CompetitionState = data.state || data;

    if (!candidate || typeof candidate !== 'object') {
      return { valid: false, error: 'Invalid JSON format. Expected root object.' };
    }

    if (!Array.isArray(candidate.questions) || candidate.questions.length === 0) {
      return { valid: false, error: 'Invalid backup: Questions array is missing or empty.' };
    }

    if (!Array.isArray(candidate.contestants)) {
      return { valid: false, error: 'Invalid backup: Contestants array is missing.' };
    }

    // Sanitize state
    const sanitized: CompetitionState = {
      version: 1,
      competition: {
        title: candidate.competition?.title || DEFAULT_SETTINGS.competitionTitle,
        subtitle: candidate.competition?.subtitle || '',
        organizer: candidate.competition?.organizer || '',
        date: candidate.competition?.date || '',
        logo: candidate.competition?.logo || '',
      },
      contestants: candidate.contestants.map((c, i) => ({
        id: c.id || `c_${Date.now()}_${i}`,
        name: String(c.name || 'Unnamed Contestant'),
        school: String(c.school || 'Unspecified School'),
        score: Number(c.score || 0),
        currentQuestionIndex: Number(c.currentQuestionIndex || 0),
        status: c.status || 'not_started',
        startedAt: c.startedAt,
        completedAt: c.completedAt,
      })),
      questions: candidate.questions.map((q, i) => ({
        id: q.id || `q_${Date.now()}_${i}`,
        category: q.category || 'General',
        question: String(q.question || ''),
        options: {
          A: String(q.options?.A || ''),
          B: String(q.options?.B || ''),
          C: String(q.options?.C || ''),
          D: String(q.options?.D || ''),
        },
        correctAnswer: (['A', 'B', 'C', 'D'].includes(String(q.correctAnswer || '')) ? q.correctAnswer : 'A') as OptionKey,
        points: Number(q.points) > 0 ? Number(q.points) : 10,
        difficulty: (['Easy', 'Medium', 'Hard'].includes(String(q.difficulty || '')) ? q.difficulty : 'Medium'),
      })),
      settings: {
        ...DEFAULT_SETTINGS,
        ...(candidate.settings || {}),
      },
      attempts: Array.isArray(candidate.attempts) ? candidate.attempts : [],
      activeContestantId: null,
      activeQuizState: null,
    };

    return { valid: true, state: sanitized };
  } catch (err: any) {
    return { valid: false, error: `JSON Parse error: ${err.message || err}` };
  }
}

// Validate Question Bank JSON Import
export function validateQuestionImport(rawJson: string): { valid: boolean; questions?: Question[]; error?: string } {
  try {
    const data = JSON.parse(rawJson);
    const list = Array.isArray(data) ? data : data.questions;

    if (!Array.isArray(list) || list.length === 0) {
      return { valid: false, error: 'Expected an array of question objects.' };
    }

    const validQuestions: Question[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (!item.question || typeof item.question !== 'string') {
        return { valid: false, error: `Question #${i + 1} is missing a question text.` };
      }
      if (!item.options || typeof item.options !== 'object') {
        return { valid: false, error: `Question #${i + 1} is missing options object.` };
      }
      if (!item.options.A || !item.options.B || !item.options.C || !item.options.D) {
        return { valid: false, error: `Question #${i + 1} must have all 4 options (A, B, C, D).` };
      }
      const ans = String(item.correctAnswer || '').toUpperCase();
      if (!['A', 'B', 'C', 'D'].includes(ans)) {
        return { valid: false, error: `Question #${i + 1} has invalid correctAnswer: "${item.correctAnswer}". Must be A, B, C, or D.` };
      }

      validQuestions.push({
        id: item.id || `q_imp_${Date.now()}_${i}`,
        category: item.category || 'Imported Category',
        question: item.question.trim(),
        options: {
          A: item.options.A.trim(),
          B: item.options.B.trim(),
          C: item.options.C.trim(),
          D: item.options.D.trim(),
        },
        correctAnswer: ans as OptionKey,
        points: Number(item.points) > 0 ? Number(item.points) : 10,
        difficulty: (['Easy', 'Medium', 'Hard'].includes(String(item.difficulty || '')) ? item.difficulty : 'Medium'),
      });
    }

    return { valid: true, questions: validQuestions };
  } catch (err: any) {
    return { valid: false, error: `Invalid JSON: ${err.message || err}` };
  }
}
