/**
 * @types UseQuizResultsTypes
 * @summary Type definitions for useQuizResults hook
 */

import type { QuizResults } from '../../types';

export interface UseQuizResultsOptions {
  sessionId: string;
  onSuccess?: (results: QuizResults) => void;
  onError?: (error: Error) => void;
}

export interface UseQuizResultsReturn {
  results: QuizResults | null;
  isLoading: boolean;
  error: Error | null;
  loadResults: () => Promise<void>;
}
