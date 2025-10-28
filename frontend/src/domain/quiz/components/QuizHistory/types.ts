/**
 * @types QuizHistoryTypes
 * @summary Type definitions for QuizHistory component
 */

import type { HistoryRecord, DifficultyLevel } from '../../types';

export interface QuizHistoryProps {
  history: HistoryRecord[];
  bestScore: number;
  onFilterChange: (difficulty: DifficultyLevel | 'todos') => void;
  onClear: () => void;
}
