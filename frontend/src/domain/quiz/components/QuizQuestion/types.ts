/**
 * @types QuizQuestionTypes
 * @summary Type definitions for QuizQuestion component
 */

import type { Question, HintType } from '../../types';

export interface QuizQuestionProps {
  question: Question;
  hintsAvailable: number;
  onAnswer: (answer: string) => void;
  onTimeout: () => void;
  onUseHint: (hintType: HintType) => void;
  isSubmitting?: boolean;
}
