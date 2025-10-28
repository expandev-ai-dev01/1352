/**
 * @types QuizFeedbackTypes
 * @summary Type definitions for QuizFeedback component
 */

import type { AnswerFeedback } from '../../types';

export interface QuizFeedbackProps {
  feedback: AnswerFeedback;
  onNext: () => void;
}
