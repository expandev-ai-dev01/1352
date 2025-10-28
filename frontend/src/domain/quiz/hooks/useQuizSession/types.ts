/**
 * @types UseQuizSessionTypes
 * @summary Type definitions for useQuizSession hook
 */

import type { QuizConfig, QuizSession } from '../../types';

export interface UseQuizSessionOptions {
  onSuccess?: (session: QuizSession) => void;
  onError?: (error: Error) => void;
}

export interface UseQuizSessionReturn {
  session: QuizSession | null;
  isLoading: boolean;
  error: Error | null;
  startQuiz: (config: QuizConfig) => Promise<void>;
}
