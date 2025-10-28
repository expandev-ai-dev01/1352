/**
 * @types QuizTypes
 * @summary Type definitions for quiz domain
 * @domain quiz
 * @category types
 */

export type DifficultyLevel = 'fácil' | 'médio' | 'difícil';
export type QuestionQuantity = 5 | 10 | 15 | 20;
export type HintType = 'eliminar_alternativa' | 'mostrar_curiosidade';

export interface QuizConfig {
  difficulty: DifficultyLevel;
  questionQuantity: QuestionQuantity;
}

export interface QuizSession {
  id: string;
  difficulty: DifficultyLevel;
  questionQuantity: QuestionQuantity;
  hintsAvailable: number;
}

export interface Question {
  id: number;
  country: string;
  correctAnswer: string;
  alternatives: string[];
  timeRemaining: number;
  progress: string;
  curiosity?: string;
}

export interface QuestionData {
  question: Question;
  progress: string;
  hintsAvailable: number;
}

export interface AnswerFeedback {
  isCorrect: boolean;
  correctAnswer: string;
  pointsEarned: number;
  message: string;
  isLastQuestion: boolean;
}

export interface HintResponse {
  hintType: HintType;
  hintData: string | string[];
  hintsRemaining: number;
}

export interface QuizResults {
  sessionId: string;
  difficulty: DifficultyLevel;
  questionQuantity: QuestionQuantity;
  totalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyPercentage: number;
  performanceMessage: string;
  completedAt: string;
}

export interface HistoryRecord {
  completedAt: string;
  difficulty: DifficultyLevel;
  questionQuantity: QuestionQuantity;
  totalScore: number;
  accuracyPercentage: number;
}
