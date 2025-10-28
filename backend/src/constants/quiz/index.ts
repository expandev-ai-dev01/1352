/**
 * @summary
 * Quiz constants
 *
 * @module constants/quiz
 *
 * @description
 * Constants related to quiz configuration and business rules.
 */

/**
 * @constant DIFFICULTY_LEVELS
 * @description Available difficulty levels for quiz
 */
export const DIFFICULTY_LEVELS = {
  EASY: 'fácil',
  MEDIUM: 'médio',
  HARD: 'difícil',
} as const;

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[keyof typeof DIFFICULTY_LEVELS];

/**
 * @constant QUESTION_QUANTITIES
 * @description Available question quantities for quiz
 */
export const QUESTION_QUANTITIES = [5, 10, 15, 20] as const;

export type QuestionQuantity = (typeof QUESTION_QUANTITIES)[number];

/**
 * @constant POINTS_BY_DIFFICULTY
 * @description Points awarded per correct answer by difficulty level
 */
export const POINTS_BY_DIFFICULTY: Record<DifficultyLevel, number> = {
  [DIFFICULTY_LEVELS.EASY]: 5,
  [DIFFICULTY_LEVELS.MEDIUM]: 10,
  [DIFFICULTY_LEVELS.HARD]: 15,
};

/**
 * @constant QUIZ_CONFIG
 * @description General quiz configuration
 */
export const QUIZ_CONFIG = {
  DEFAULT_DIFFICULTY: DIFFICULTY_LEVELS.EASY,
  DEFAULT_QUESTION_QUANTITY: 10,
  INITIAL_HINTS: 3,
  MAX_HINTS: 3,
  MIN_HINTS: 0,
  TIME_PER_QUESTION: 30,
  ALTERNATIVES_COUNT: 4,
  INCORRECT_ALTERNATIVES_COUNT: 3,
  MAX_HISTORY_RECORDS: 10,
} as const;

/**
 * @constant HINT_TYPES
 * @description Available hint types
 */
export const HINT_TYPES = {
  ELIMINATE_ALTERNATIVE: 'eliminar_alternativa',
  SHOW_CURIOSITY: 'mostrar_curiosidade',
} as const;

export type HintType = (typeof HINT_TYPES)[keyof typeof HINT_TYPES];

/**
 * @constant PERFORMANCE_MESSAGES
 * @description Performance messages based on score percentage
 */
export const PERFORMANCE_MESSAGES = {
  EXCELLENT: { threshold: 90, message: 'Excelente!' },
  VERY_GOOD: { threshold: 70, message: 'Muito bom!' },
  GOOD: { threshold: 50, message: 'Bom trabalho!' },
  KEEP_PRACTICING: { threshold: 0, message: 'Continue praticando!' },
} as const;
