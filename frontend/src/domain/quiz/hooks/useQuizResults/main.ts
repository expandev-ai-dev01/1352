/**
 * @hook useQuizResults
 * @summary Manages quiz results loading and display
 * @domain quiz
 * @type domain-hook
 * @category data
 */

import { useState, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizResultsOptions, UseQuizResultsReturn } from './types';
import type { QuizResults } from '../../types';

export const useQuizResults = (options: UseQuizResultsOptions): UseQuizResultsReturn => {
  const { sessionId, onSuccess, onError } = options;

  const [results, setResults] = useState<QuizResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadResults = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const quizResults = await quizService.getQuizResults(sessionId);
      setResults(quizResults);
      onSuccess?.(quizResults);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to load results');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, onSuccess, onError]);

  return {
    results,
    isLoading,
    error,
    loadResults,
  };
};
