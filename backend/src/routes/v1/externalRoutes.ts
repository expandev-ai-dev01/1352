import { Router } from 'express';
import {
  startQuizHandler,
  getCurrentQuestionHandler,
  submitAnswerHandler,
  useHintHandler,
  getQuizResultsHandler,
} from '@/api/v1/external/quiz/controller';

const router = Router();

/**
 * @summary
 * External (public) routes configuration for V1
 *
 * @description
 * Public endpoints that do not require authentication.
 */

/**
 * Quiz routes
 */
router.post('/quiz/start', startQuizHandler);
router.get('/quiz/:sessionId/question', getCurrentQuestionHandler);
router.post('/quiz/:sessionId/answer', submitAnswerHandler);
router.post('/quiz/:sessionId/hint', useHintHandler);
router.get('/quiz/:sessionId/results', getQuizResultsHandler);

export default router;
