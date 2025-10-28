/**
 * @component QuizQuestion
 * @summary Quiz question display with timer, alternatives, and hints
 * @domain quiz
 * @type domain-component
 * @category display
 */

import { useState, useEffect } from 'react';
import { getAlternativeClassName } from './variants';
import type { QuizQuestionProps } from './types';

export const QuizQuestion = ({
  question,
  hintsAvailable,
  onAnswer,
  onTimeout,
  onUseHint,
  isSubmitting = false,
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [eliminatedAlternatives, setEliminatedAlternatives] = useState<string[]>([]);
  const [showCuriosity, setShowCuriosity] = useState(false);
  const [curiosityText, setCuriosityText] = useState<string>('');

  useEffect(() => {
    setTimeRemaining(30);
    setSelectedAnswer(null);
    setEliminatedAlternatives([]);
    setShowCuriosity(false);
    setCuriosityText('');
  }, [question.id]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeout]);

  const handleSelectAnswer = (answer: string) => {
    if (isSubmitting || eliminatedAlternatives.includes(answer)) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer && !isSubmitting) {
      onAnswer(selectedAnswer);
    }
  };

  const handleEliminateAlternative = async () => {
    if (hintsAvailable > 0) {
      onUseHint('eliminar_alternativa');
    }
  };

  const handleShowCuriosity = async () => {
    if (hintsAvailable > 0) {
      onUseHint('mostrar_curiosidade');
    }
  };

  const availableAlternatives = question.alternatives.filter(
    (alt) => !eliminatedAlternatives.includes(alt)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{question.progress}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Dicas disponíveis:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full font-semibold">
            {hintsAvailable}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Qual é a capital de {question.country}?
          </h3>
          <div
            className={`text-3xl font-bold ${
              timeRemaining <= 10 ? 'text-red-600' : 'text-blue-600'
            }`}
          >
            {timeRemaining}s
          </div>
        </div>

        <div className="space-y-3">
          {availableAlternatives.map((alternative) => (
            <button
              key={alternative}
              onClick={() => handleSelectAnswer(alternative)}
              disabled={isSubmitting}
              className={getAlternativeClassName({
                isSelected: selectedAnswer === alternative,
                isDisabled: isSubmitting,
              })}
            >
              {alternative}
            </button>
          ))}
        </div>

        {showCuriosity && curiosityText && (
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-900">
              <strong>Curiosidade:</strong> {curiosityText}
            </p>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEliminateAlternative}
            disabled={hintsAvailable === 0 || isSubmitting}
            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Eliminar Alternativa
          </button>
          <button
            onClick={handleShowCuriosity}
            disabled={hintsAvailable === 0 || isSubmitting}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mostrar Curiosidade
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitting}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Confirmar Resposta'}
        </button>
      </div>
    </div>
  );
};
