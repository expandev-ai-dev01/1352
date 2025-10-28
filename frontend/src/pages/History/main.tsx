/**
 * @page HistoryPage
 * @summary Quiz history page displaying past quiz results
 * @domain quiz
 * @type page-component
 * @category quiz
 *
 * @routing
 * - Path: /history
 * - Params: none
 * - Query: none
 * - Guards: none
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizHistory } from '@/domain/quiz/components/QuizHistory';
import { useQuizHistory } from '@/domain/quiz/hooks/useQuizHistory';
import type { DifficultyLevel } from '@/domain/quiz/types';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const { history, bestScore, filterByDifficulty, clearHistory } = useQuizHistory();
  const [filteredHistory, setFilteredHistory] = useState(history);

  const handleFilterChange = (difficulty: DifficultyLevel | 'todos') => {
    const filtered = filterByDifficulty(difficulty);
    setFilteredHistory(filtered);
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico?')) {
      clearHistory();
      setFilteredHistory([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Histórico de Pontuações</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Voltar ao Início
        </button>
      </div>

      <QuizHistory
        history={filteredHistory}
        bestScore={bestScore}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
      />
    </div>
  );
};

export default HistoryPage;
