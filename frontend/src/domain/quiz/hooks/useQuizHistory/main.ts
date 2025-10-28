/**
 * @hook useQuizHistory
 * @summary Manages quiz history storage and retrieval
 * @domain quiz
 * @type domain-hook
 * @category data
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { UseQuizHistoryReturn } from './types';
import type { HistoryRecord, DifficultyLevel } from '../../types';

const STORAGE_KEY = 'quiz_history';
const MAX_RECORDS = 10;

export const useQuizHistory = (): UseQuizHistoryReturn => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryRecord[];
        setHistory(parsed);
      }
    } catch (error: unknown) {
      console.error('Failed to load quiz history:', error);
    }
  }, []);

  const addRecord = useCallback((record: HistoryRecord) => {
    setHistory((prev) => {
      const updated = [record, ...prev].slice(0, MAX_RECORDS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error: unknown) {
        console.error('Failed to save quiz history:', error);
      }
      return updated;
    });
  }, []);

  const filterByDifficulty = useCallback(
    (difficulty: DifficultyLevel | 'todos'): HistoryRecord[] => {
      if (difficulty === 'todos') {
        return history;
      }
      return history.filter((record) => record.difficulty === difficulty);
    },
    [history]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error: unknown) {
      console.error('Failed to clear quiz history:', error);
    }
  }, []);

  const bestScore = useMemo(() => {
    if (history.length === 0) return 0;
    return Math.max(...history.map((record) => record.totalScore));
  }, [history]);

  return {
    history,
    bestScore,
    addRecord,
    filterByDifficulty,
    clearHistory,
  };
};
