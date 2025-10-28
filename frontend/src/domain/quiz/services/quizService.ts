/**
 * @service quizService
 * @summary Quiz service for all quiz-related backend operations
 * @domain quiz
 * @type rest-service
 * @apiContext external
 */

import { publicClient } from '@/core/lib/api';
import type {
  QuizConfig,
  QuizSession,
  QuestionData,
  AnswerFeedback,
  HintResponse,
  QuizResults,
  HintType,
} from '../types';

export const quizService = {
  /**
   * @endpoint POST /api/v1/external/quiz/start
   * @summary Starts a new quiz session
   */
  async startQuiz(config: QuizConfig): Promise<QuizSession> {
    const response = await publicClient.post('/quiz/start', {
      difficulty: config.difficulty,
      questionQuantity: config.questionQuantity,
    });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:sessionId/question
   * @summary Gets the current question for a session
   */
  async getCurrentQuestion(sessionId: string): Promise<QuestionData> {
    const response = await publicClient.get(`/quiz/${sessionId}/question`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/quiz/:sessionId/answer
   * @summary Submits an answer for the current question
   */
  async submitAnswer(
    sessionId: string,
    questionId: number,
    selectedAnswer: string | null,
    timeSpent: number
  ): Promise<AnswerFeedback> {
    const response = await publicClient.post(`/quiz/${sessionId}/answer`, {
      questionId,
      selectedAnswer,
      timeSpent,
    });
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/quiz/:sessionId/hint
   * @summary Uses a hint for the current question
   */
  async useHint(sessionId: string, questionId: number, hintType: HintType): Promise<HintResponse> {
    const response = await publicClient.post(`/quiz/${sessionId}/hint`, {
      questionId,
      hintType,
    });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:sessionId/results
   * @summary Gets the final results for a completed quiz
   */
  async getQuizResults(sessionId: string): Promise<QuizResults> {
    const response = await publicClient.get(`/quiz/${sessionId}/results`);
    return response.data.data;
  },
};
