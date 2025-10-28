/**
 * @hook useQuizSession
 * @summary Manages quiz session creation and state
 * @domain quiz
 * @type domain-hook
 * @category data
 */

import { useState, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizSessionOptions, UseQuizSessionReturn } from './types';
import type { QuizConfig, QuizSession } from '../../types';

export const useQuizSession = (options: UseQuizSessionOptions = {}): UseQuizSessionReturn => {
  const { onSuccess, onError } = options;

  const [session, setSession] = useState<QuizSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startQuiz = useCallback(
    async (config: QuizConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const newSession = await quizService.startQuiz(config);
        setSession(newSession);
        onSuccess?.(newSession);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Failed to start quiz');
        setError(error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  return {
    session,
    isLoading,
    error,
    startQuiz,
  };
};
