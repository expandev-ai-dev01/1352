/**
 * @types QuizResultsTypes
 * @summary Type definitions for QuizResults component
 */

import type { QuizResults as QuizResultsData } from '../../types';

export interface QuizResultsProps {
  results: QuizResultsData;
  onRestart: () => void;
  onHome: () => void;
}
