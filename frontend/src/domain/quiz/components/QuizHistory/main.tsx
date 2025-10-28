/**
 * @component QuizHistory
 * @summary Quiz history display with filtering
 * @domain quiz
 * @type domain-component
 * @category display
 */

import { useState } from 'react';
import { format } from 'date-fns';
import { getRecordClassName } from './variants';
import type { QuizHistoryProps } from './types';
import type { DifficultyLevel } from '../../types';

const FILTER_OPTIONS: Array<DifficultyLevel | 'todos'> = ['todos', 'fácil', 'médio', 'difícil'];

export const QuizHistory = ({ history, bestScore, onFilterChange, onClear }: QuizHistoryProps) => {
  const [selectedFilter, setSelectedFilter] = useState<DifficultyLevel | 'todos'>('todos');

  const handleFilterChange = (filter: DifficultyLevel | 'todos') => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-xl text-gray-600">Você ainda não completou nenhum quiz</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Histórico de Pontuações</h2>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Limpar Histórico
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
        <p className="text-sm font-medium text-gray-600 mb-1">Melhor Pontuação</p>
        <p className="text-4xl font-bold text-blue-600">{bestScore}</p>
      </div>

      <div className="flex gap-2">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {history.map((record, index) => (
          <div
            key={index}
            className={getRecordClassName({ isBest: record.totalScore === bestScore })}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">
                  {format(new Date(record.completedAt), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="font-semibold text-gray-900 mt-1">
                  {record.difficulty.charAt(0).toUpperCase() + record.difficulty.slice(1)} -{' '}
                  {record.questionQuantity} perguntas
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{record.totalScore}</p>
                <p className="text-sm text-gray-600">{record.accuracyPercentage.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
