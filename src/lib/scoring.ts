import { Contestant, ContestantAttempt, Question, QuizSettings } from '../types/competition';

export type RankedContestant = {
  rank: number;
  contestant: Contestant;
  attempt?: ContestantAttempt;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  totalTimeSeconds: number;
  accuracy: number;
};

export function calculateLeaderboard(
  contestants: Contestant[],
  attempts: ContestantAttempt[]
): RankedContestant[] {
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
      contestant,
      attempt,
      score,
      correctAnswers,
      incorrectAnswers,
      totalQuestions,
      totalTimeSeconds,
      accuracy,
    };
  });

  // Sort descending: Score -> Correct Answers -> Least Time Taken (if time > 0)
  entries.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.correctAnswers !== a.correctAnswers) {
      return b.correctAnswers - a.correctAnswers;
    }
    if (a.totalTimeSeconds > 0 && b.totalTimeSeconds > 0) {
      return a.totalTimeSeconds - b.totalTimeSeconds;
    }
    return 0;
  });

  // Assign ranks
  let currentRank = 1;
  return entries.map((entry, index) => {
    if (index > 0) {
      const prev = entries[index - 1];
      const isTied = prev.score === entry.score && 
                     prev.correctAnswers === entry.correctAnswers && 
                     (prev.totalTimeSeconds === entry.totalTimeSeconds || entry.totalTimeSeconds === 0);
      if (!isTied) {
        currentRank = index + 1;
      }
    }
    return {
      ...entry,
      rank: currentRank,
    };
  });
}

// Safe level calculation: calculate guaranteed score if contestant gets eliminated at currentIndex
export function getSafeLevelScore(
  questions: Question[],
  currentIndex: number,
  settings: QuizSettings
): number {
  if (!settings.safeLevelsEnabled || !settings.safeQuestionNumbers.length) {
    return 0;
  }

  // Find the highest safe level passed (1-indexed)
  const safeNums = [...settings.safeQuestionNumbers].sort((a, b) => a - b);
  let highestPassedSafeLevel = 0;

  for (const safeNum of safeNums) {
    // If contestant completed at least question `safeNum` (so currentIndex >= safeNum)
    if (currentIndex >= safeNum) {
      highestPassedSafeLevel = safeNum;
    }
  }

  if (highestPassedSafeLevel === 0) {
    return 0;
  }

  // Calculate cumulative points up to that safe question
  let points = 0;
  for (let i = 0; i < highestPassedSafeLevel && i < questions.length; i++) {
    points += questions[i].points;
  }

  return points;
}
