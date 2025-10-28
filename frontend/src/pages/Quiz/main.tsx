/**
 * @page QuizPage
 * @summary Main quiz page that orchestrates the quiz flow
 * @domain quiz
 * @type page-component
 * @category quiz
 *
 * @routing
 * - Path: /quiz
 * - Params: none
 * - Query: none
 * - Guards: none
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizConfig } from '@/domain/quiz/components/QuizConfig';
import { QuizQuestion } from '@/domain/quiz/components/QuizQuestion';
import { QuizFeedback } from '@/domain/quiz/components/QuizFeedback';
import { QuizResults } from '@/domain/quiz/components/QuizResults';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { useQuizSession } from '@/domain/quiz/hooks/useQuizSession';
import { useQuizQuestion } from '@/domain/quiz/hooks/useQuizQuestion';
import { useQuizResults } from '@/domain/quiz/hooks/useQuizResults';
import { useQuizHistory } from '@/domain/quiz/hooks/useQuizHistory';
import type { DifficultyLevel, QuestionQuantity, HintType } from '@/domain/quiz/types';

type QuizState = 'config' | 'question' | 'feedback' | 'results';

export const QuizPage = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>('config');
  const { addRecord } = useQuizHistory();

  const {
    session,
    isLoading: isStarting,
    error: sessionError,
    startQuiz,
  } = useQuizSession({
    onSuccess: () => {
      setQuizState('question');
    },
  });

  const {
    questionData,
    feedback,
    isLoading: isLoadingQuestion,
    isSubmitting,
    error: questionError,
    loadQuestion,
    submitAnswer,
    useHint,
    clearFeedback,
  } = useQuizQuestion({
    sessionId: session?.id || '',
    onAnswerSubmitted: (answerFeedback) => {
      setQuizState('feedback');
      if (answerFeedback.isLastQuestion) {
        setTimeout(() => {
          setQuizState('results');
        }, 3000);
      }
    },
  });

  const {
    results,
    isLoading: isLoadingResults,
    error: resultsError,
    loadResults,
  } = useQuizResults({
    sessionId: session?.id || '',
    onSuccess: (quizResults) => {
      addRecord({
        completedAt: quizResults.completedAt,
        difficulty: quizResults.difficulty,
        questionQuantity: quizResults.questionQuantity,
        totalScore: quizResults.totalScore,
        accuracyPercentage: quizResults.accuracyPercentage,
      });
    },
  });

  useEffect(() => {
    if (session && quizState === 'question' && !questionData) {
      loadQuestion();
    }
  }, [session, quizState, questionData, loadQuestion]);

  useEffect(() => {
    if (session && quizState === 'results' && !results) {
      loadResults();
    }
  }, [session, quizState, results, loadResults]);

  const handleStartQuiz = async (
    difficulty: DifficultyLevel,
    questionQuantity: QuestionQuantity
  ) => {
    await startQuiz({ difficulty, questionQuantity });
  };

  const handleAnswer = async (answer: string) => {
    if (questionData) {
      const timeSpent = 30 - questionData.question.timeRemaining;
      await submitAnswer(questionData.question.id, answer, timeSpent);
    }
  };

  const handleTimeout = async () => {
    if (questionData) {
      await submitAnswer(questionData.question.id, null, 30);
    }
  };

  const handleUseHint = async (hintType: HintType) => {
    if (questionData) {
      await useHint(questionData.question.id, hintType);
    }
  };

  const handleNext = () => {
    clearFeedback();
    if (feedback?.isLastQuestion) {
      setQuizState('results');
    } else {
      setQuizState('question');
      loadQuestion();
    }
  };

  const handleRestart = () => {
    setQuizState('config');
  };

  const handleHome = () => {
    navigate('/');
  };

  if (sessionError || questionError || resultsError) {
    return (
      <ErrorMessage
        title="Erro ao carregar quiz"
        message={(sessionError || questionError || resultsError)?.message || 'Erro desconhecido'}
        onRetry={() => window.location.reload()}
        onBack={handleHome}
      />
    );
  }

  if (quizState === 'config') {
    return <QuizConfig onStart={handleStartQuiz} isLoading={isStarting} />;
  }

  if (quizState === 'question') {
    if (isLoadingQuestion || !questionData) {
      return <LoadingSpinner size="large" />;
    }

    return (
      <QuizQuestion
        question={questionData.question}
        hintsAvailable={questionData.hintsAvailable}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
        onUseHint={handleUseHint}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (quizState === 'feedback' && feedback) {
    return <QuizFeedback feedback={feedback} onNext={handleNext} />;
  }

  if (quizState === 'results') {
    if (isLoadingResults || !results) {
      return <LoadingSpinner size="large" />;
    }

    return <QuizResults results={results} onRestart={handleRestart} onHome={handleHome} />;
  }

  return <LoadingSpinner size="large" />;
};

export default QuizPage;
