/**
 * @component QuizFeedback
 * @summary Feedback display after answering a question
 * @domain quiz
 * @type domain-component
 * @category feedback
 */

import { getFeedbackClassName, getFeedbackTextClassName } from './variants';
import type { QuizFeedbackProps } from './types';

export const QuizFeedback = ({ feedback, onNext }: QuizFeedbackProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={getFeedbackClassName({ isCorrect: feedback.isCorrect })}>
        <h3 className={getFeedbackTextClassName({ isCorrect: feedback.isCorrect })}>
          {feedback.message}
        </h3>

        {!feedback.isCorrect && (
          <p className="text-lg text-gray-700 mb-4">
            A resposta correta é: <strong>{feedback.correctAnswer}</strong>
          </p>
        )}

        <p className="text-lg font-semibold text-gray-900">
          Pontos obtidos: <span className="text-blue-600">{feedback.pointsEarned}</span>
        </p>

        <button
          onClick={onNext}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {feedback.isLastQuestion ? 'Ver Resultados' : 'Próxima Pergunta'}
        </button>
      </div>
    </div>
  );
};
