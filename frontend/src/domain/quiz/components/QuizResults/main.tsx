/**
 * @component QuizResults
 * @summary Quiz results display with performance summary
 * @domain quiz
 * @type domain-component
 * @category display
 */

import { getPerformanceClassName } from './variants';
import type { QuizResultsProps } from './types';

export const QuizResults = ({ results, onRestart, onHome }: QuizResultsProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Concluído!</h2>
          <p
            className={getPerformanceClassName({ accuracyPercentage: results.accuracyPercentage })}
          >
            {results.performanceMessage}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Pontuação Total</p>
            <p className="text-4xl font-bold text-blue-600">{results.totalScore}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Taxa de Acerto</p>
            <p className="text-4xl font-bold text-green-600">
              {results.accuracyPercentage.toFixed(1)}%
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Respostas Corretas</p>
            <p className="text-4xl font-bold text-purple-600">{results.correctAnswers}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Respostas Incorretas</p>
            <p className="text-4xl font-bold text-red-600">{results.incorrectAnswers}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Dificuldade:</p>
              <p className="font-semibold text-gray-900">
                {results.difficulty.charAt(0).toUpperCase() + results.difficulty.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total de Perguntas:</p>
              <p className="font-semibold text-gray-900">{results.questionQuantity}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Jogar Novamente
          </button>
          <button
            onClick={onHome}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};
