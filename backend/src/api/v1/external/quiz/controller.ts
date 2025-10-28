/**
 * @summary
 * Quiz API controller for external (public) endpoints
 *
 * @module api/v1/external/quiz/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { zDifficultyLevel, zQuestionQuantity, zUUID } from '@/utils/validation';
import {
  startQuiz,
  getCurrentQuestion,
  submitAnswer,
  useHint,
  getQuizResults,
} from '@/services/quiz';
import { HINT_TYPES } from '@/constants/quiz';

/**
 * @api {post} /external/quiz/start Start Quiz
 * @apiName StartQuiz
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Starts a new quiz session with specified configuration
 *
 * @apiParam {String} difficulty Difficulty level (fácil, médio, difícil)
 * @apiParam {Number} questionQuantity Number of questions (5, 10, 15, 20)
 *
 * @apiSuccess {String} id Session ID
 * @apiSuccess {String} difficulty Difficulty level
 * @apiSuccess {Number} questionQuantity Number of questions
 * @apiSuccess {Number} hintsAvailable Available hints
 *
 * @apiError {String} ValidationError Invalid parameters
 */
export async function startQuizHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bodySchema = z.object({
      difficulty: zDifficultyLevel,
      questionQuantity: zQuestionQuantity,
    });

    const validated = bodySchema.parse(req.body);

    const session = await startQuiz({
      difficulty: validated.difficulty,
      questionQuantity: validated.questionQuantity as 5 | 10 | 15 | 20,
    });

    res.json(
      successResponse({
        id: session.id,
        difficulty: session.difficulty,
        questionQuantity: session.questionQuantity,
        hintsAvailable: session.hintsAvailable,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /external/quiz/:sessionId/question Get Current Question
 * @apiName GetCurrentQuestion
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the current question for an active quiz session
 *
 * @apiParam {String} sessionId Session ID
 *
 * @apiSuccess {Object} question Question data
 * @apiSuccess {String} progress Progress indicator
 * @apiSuccess {Number} hintsAvailable Available hints
 *
 * @apiError {String} NotFoundError Session not found
 */
export async function getCurrentQuestionHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      sessionId: zUUID,
    });

    const validated = paramsSchema.parse(req.params);

    const questionData = await getCurrentQuestion(validated.sessionId);

    res.json(successResponse(questionData));
  } catch (error: any) {
    if (error.message === 'Sessão não encontrada') {
      res.status(404).json(errorResponse(error.message, 'SESSION_NOT_FOUND'));
    } else if (error.message === 'Todas as perguntas já foram respondidas') {
      res.status(400).json(errorResponse(error.message, 'QUIZ_COMPLETED'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {post} /external/quiz/:sessionId/answer Submit Answer
 * @apiName SubmitAnswer
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits an answer for the current question
 *
 * @apiParam {String} sessionId Session ID
 * @apiParam {Number} questionId Question ID
 * @apiParam {String} selectedAnswer Selected answer (can be null if time expired)
 * @apiParam {Number} timeSpent Time spent on question in seconds
 *
 * @apiSuccess {Boolean} isCorrect Whether answer is correct
 * @apiSuccess {String} correctAnswer Correct answer
 * @apiSuccess {Number} pointsEarned Points earned
 * @apiSuccess {String} message Feedback message
 * @apiSuccess {Boolean} isLastQuestion Whether this is the last question
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFoundError Session or question not found
 */
export async function submitAnswerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      sessionId: zUUID,
    });

    const bodySchema = z.object({
      questionId: z.number().int().positive(),
      selectedAnswer: z.string().nullable(),
      timeSpent: z.number().int().min(0).max(30),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const feedback = await submitAnswer({
      sessionId: validatedParams.sessionId,
      ...validatedBody,
    });

    res.json(successResponse(feedback));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else if (
      error.message === 'Sessão não encontrada' ||
      error.message === 'Pergunta não encontrada'
    ) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else if (error.message === 'Você já respondeu esta pergunta') {
      res.status(400).json(errorResponse(error.message, 'ALREADY_ANSWERED'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {post} /external/quiz/:sessionId/hint Use Hint
 * @apiName UseHint
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Uses a hint for the current question
 *
 * @apiParam {String} sessionId Session ID
 * @apiParam {Number} questionId Question ID
 * @apiParam {String} hintType Hint type (eliminar_alternativa, mostrar_curiosidade)
 *
 * @apiSuccess {String} hintType Type of hint used
 * @apiSuccess {Mixed} hintData Hint data (string or array)
 * @apiSuccess {Number} hintsRemaining Remaining hints
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} NotFoundError Session or question not found
 * @apiError {String} NoHintsError No hints available
 */
export async function useHintHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      sessionId: zUUID,
    });

    const bodySchema = z.object({
      questionId: z.number().int().positive(),
      hintType: z.enum([HINT_TYPES.ELIMINATE_ALTERNATIVE, HINT_TYPES.SHOW_CURIOSITY]),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const hintResponse = await useHint({
      sessionId: validatedParams.sessionId,
      ...validatedBody,
    });

    res.json(successResponse(hintResponse));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else if (
      error.message === 'Sessão não encontrada' ||
      error.message === 'Pergunta não encontrada'
    ) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else if (error.message === 'Você não possui mais dicas disponíveis') {
      res.status(400).json(errorResponse(error.message, 'NO_HINTS_AVAILABLE'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /external/quiz/:sessionId/results Get Quiz Results
 * @apiName GetQuizResults
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the final results for a completed quiz session
 *
 * @apiParam {String} sessionId Session ID
 *
 * @apiSuccess {String} sessionId Session ID
 * @apiSuccess {String} difficulty Difficulty level
 * @apiSuccess {Number} questionQuantity Number of questions
 * @apiSuccess {Number} totalScore Total score
 * @apiSuccess {Number} correctAnswers Number of correct answers
 * @apiSuccess {Number} incorrectAnswers Number of incorrect answers
 * @apiSuccess {Number} accuracyPercentage Accuracy percentage
 * @apiSuccess {String} performanceMessage Performance message
 * @apiSuccess {Date} completedAt Completion timestamp
 *
 * @apiError {String} NotFoundError Session not found
 * @apiError {String} IncompleteError Quiz not completed
 */
export async function getQuizResultsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      sessionId: zUUID,
    });

    const validated = paramsSchema.parse(req.params);

    const results = await getQuizResults(validated.sessionId);

    res.json(successResponse(results));
  } catch (error: any) {
    if (error.message === 'Sessão não encontrada') {
      res.status(404).json(errorResponse(error.message, 'SESSION_NOT_FOUND'));
    } else if (error.message === 'Quiz ainda não foi completado') {
      res.status(400).json(errorResponse(error.message, 'QUIZ_INCOMPLETE'));
    } else {
      next(error);
    }
  }
}
