/**
 * @types UseQuizQuestionTypes
 * @summary Type definitions for useQuizQuestion hook
 */

import type { QuestionData, AnswerFeedback, HintResponse, HintType } from '../../types';

export interface UseQuizQuestionOptions {
  sessionId: string;
  onAnswerSubmitted?: (feedback: AnswerFeedback) => void;
  onError?: (error: Error) => void;
}

export interface UseQuizQuestionReturn {
  questionData: QuestionData | null;
  feedback: AnswerFeedback | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: Error | null;
  loadQuestion: () => Promise<void>;
  submitAnswer: (
    questionId: number,
    selectedAnswer: string | null,
    timeSpent: number
  ) => Promise<void>;
  useHint: (questionId: number, hintType: HintType) => Promise<HintResponse | null>;
  clearFeedback: () => void;
}
