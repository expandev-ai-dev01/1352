/**
 * @summary
 * Quiz service type definitions
 *
 * @module services/quiz/quizTypes
 */

import { DifficultyLevel, QuestionQuantity, HintType } from '@/constants/quiz';

/**
 * @interface Country
 * @description Represents a country with its capital and metadata
 */
export interface Country {
  country: string;
  capital: string;
  difficulty: DifficultyLevel;
  curiosity: string;
}

/**
 * @interface QuizSession
 * @description Represents an active quiz session
 */
export interface QuizSession {
  id: string;
  difficulty: DifficultyLevel;
  questionQuantity: QuestionQuantity;
  hintsAvailable: number;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startedAt: Date;
}

/**
 * @interface QuizQuestion
 * @description Represents a single quiz question
 */
export interface QuizQuestion {
  id: number;
  country: string;
  correctCapital: string;
  alternatives: string[];
  curiosity: string;
  timeRemaining: number;
}

/**
 * @interface QuizAnswer
 * @description Represents a user's answer to a question
 */
export interface QuizAnswer {
  questionId: number;
  selectedAnswer: string | null;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent: number;
}

/**
 * @interface QuizResult
 * @description Represents the final quiz results
 */
export interface QuizResult {
  sessionId: string;
  difficulty: DifficultyLevel;
  questionQuantity: number;
  totalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyPercentage: number;
  performanceMessage: string;
  completedAt: Date;
}

/**
 * @interface QuizHistoryRecord
 * @description Represents a historical quiz record
 */
export interface QuizHistoryRecord {
  sessionId: string;
  difficulty: DifficultyLevel;
  questionQuantity: number;
  totalScore: number;
  accuracyPercentage: number;
  completedAt: Date;
}

/**
 * @interface StartQuizRequest
 * @description Request parameters to start a new quiz
 */
export interface StartQuizRequest {
  difficulty: DifficultyLevel;
  questionQuantity: QuestionQuantity;
}

/**
 * @interface SubmitAnswerRequest
 * @description Request parameters to submit an answer
 */
export interface SubmitAnswerRequest {
  sessionId: string;
  questionId: number;
  selectedAnswer: string | null;
  timeSpent: number;
}

/**
 * @interface UseHintRequest
 * @description Request parameters to use a hint
 */
export interface UseHintRequest {
  sessionId: string;
  questionId: number;
  hintType: HintType;
}

/**
 * @interface QuestionResponse
 * @description Response for current question
 */
export interface QuestionResponse {
  question: QuizQuestion;
  progress: string;
  hintsAvailable: number;
}

/**
 * @interface AnswerFeedback
 * @description Feedback after submitting an answer
 */
export interface AnswerFeedback {
  isCorrect: boolean;
  correctAnswer: string;
  pointsEarned: number;
  message: string;
  isLastQuestion: boolean;
}

/**
 * @interface HintResponse
 * @description Response after using a hint
 */
export interface HintResponse {
  hintType: HintType;
  hintData: string | string[];
  hintsRemaining: number;
}
