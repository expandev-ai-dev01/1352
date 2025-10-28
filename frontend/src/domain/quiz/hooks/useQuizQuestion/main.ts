/**
 * @hook useQuizQuestion
 * @summary Manages quiz question loading, answering, and hints
 * @domain quiz
 * @type domain-hook
 * @category data
 */

import { useState, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizQuestionOptions, UseQuizQuestionReturn } from './types';
import type { QuestionData, AnswerFeedback, HintResponse, HintType } from '../../types';

export const useQuizQuestion = (options: UseQuizQuestionOptions): UseQuizQuestionReturn => {
  const { sessionId, onAnswerSubmitted, onError } = options;

  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadQuestion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const data = await quizService.getCurrentQuestion(sessionId);
      setQuestionData(data);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to load question');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, onError]);

  const submitAnswer = useCallback(
    async (questionId: number, selectedAnswer: string | null, timeSpent: number) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const answerFeedback = await quizService.submitAnswer(
          sessionId,
          questionId,
          selectedAnswer,
          timeSpent
        );
        setFeedback(answerFeedback);
        onAnswerSubmitted?.(answerFeedback);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Failed to submit answer');
        setError(error);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [sessionId, onAnswerSubmitted, onError]
  );

  const useHint = useCallback(
    async (questionId: number, hintType: HintType): Promise<HintResponse | null> => {
      setError(null);

      try {
        const hintResponse = await quizService.useHint(sessionId, questionId, hintType);

        if (questionData) {
          setQuestionData({
            ...questionData,
            hintsAvailable: hintResponse.hintsRemaining,
          });
        }

        return hintResponse;
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Failed to use hint');
        setError(error);
        onError?.(error);
        return null;
      }
    },
    [sessionId, questionData, onError]
  );

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return {
    questionData,
    feedback,
    isLoading,
    isSubmitting,
    error,
    loadQuestion,
    submitAnswer,
    useHint,
    clearFeedback,
  };
};
