import { Question } from '../types/competition';

// Import raw questions JSON data
import rawQuestionBank from './questionBank.json';

export const DEFAULT_QUESTIONS: Question[] = rawQuestionBank as Question[];

export const CURRENT_AFFAIRS_SNAPSHOT_DATE = "30 September 2026";
export const PRODUCT_NAME = "QuizArena";
export const PRODUCT_SUBTITLE = "Knowledge. Competition. Victory.";
export const PRODUCT_TAGLINE = "Test your knowledge. Represent your school. Climb the leaderboard.";
