import { Question } from '../types/competition';

// Import raw questions JSON data
import rawQuestionBank from './questionBank.json';

export const DEFAULT_QUESTIONS: Question[] = rawQuestionBank as Question[];

export const CURRENT_AFFAIRS_SNAPSHOT_DATE = "30 September 2026";
export const PRODUCT_NAME = "QuizArena";
export const PRODUCT_SUBTITLE = "";
export const PRODUCT_TAGLINE = "";
