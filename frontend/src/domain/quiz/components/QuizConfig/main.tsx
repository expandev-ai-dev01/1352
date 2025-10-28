/**
 * @component QuizConfig
 * @summary Quiz configuration component for selecting difficulty and question quantity
 * @domain quiz
 * @type domain-component
 * @category form
 */

import { useState } from 'react';
import { getOptionClassName } from './variants';
import type { QuizConfigProps } from './types';
import type { DifficultyLevel, QuestionQuantity } from '../../types';

const DIFFICULTY_OPTIONS: DifficultyLevel[] = ['fácil', 'médio', 'difícil'];
const QUANTITY_OPTIONS: QuestionQuantity[] = [5, 10, 15, 20];

export const QuizConfig = ({ onStart, isLoading = false }: QuizConfigProps) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('fácil');
  const [questionQuantity, setQuestionQuantity] = useState<QuestionQuantity>(10);

  const handleStart = () => {
    onStart(difficulty, questionQuantity);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configure seu Quiz</h2>
        <p className="text-gray-600">Escolha o nível de dificuldade e a quantidade de perguntas</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Nível de Dificuldade
          </label>
          <div className="grid grid-cols-3 gap-4">
            {DIFFICULTY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDifficulty(option)}
                className={getOptionClassName({ isSelected: difficulty === option })}
                disabled={isLoading}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Quantidade de Perguntas
          </label>
          <div className="grid grid-cols-4 gap-4">
            {QUANTITY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setQuestionQuantity(option)}
                className={getOptionClassName({ isSelected: questionQuantity === option })}
                disabled={isLoading}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Iniciando...' : 'Iniciar Quiz'}
        </button>
      </div>
    </div>
  );
};
