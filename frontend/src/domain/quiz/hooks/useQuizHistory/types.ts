/**
 * @types UseQuizHistoryTypes
 * @summary Type definitions for useQuizHistory hook
 */

import type { HistoryRecord, DifficultyLevel } from '../../types';

export interface UseQuizHistoryReturn {
  history: HistoryRecord[];
  bestScore: number;
  addRecord: (record: HistoryRecord) => void;
  filterByDifficulty: (difficulty: DifficultyLevel | 'todos') => HistoryRecord[];
  clearHistory: () => void;
}
