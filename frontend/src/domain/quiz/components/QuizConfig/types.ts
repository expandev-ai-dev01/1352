/**
 * @types QuizConfigTypes
 * @summary Type definitions for QuizConfig component
 */

import type { DifficultyLevel, QuestionQuantity } from '../../types';

export interface QuizConfigProps {
  onStart: (difficulty: DifficultyLevel, questionQuantity: QuestionQuantity) => void;
  isLoading?: boolean;
}
