import { clsx } from 'clsx';

export interface QuizFeedbackVariantProps {
  isCorrect: boolean;
}

export function getFeedbackClassName(props: QuizFeedbackVariantProps): string {
  const { isCorrect } = props;

  return clsx('p-6 rounded-lg border-2', {
    'bg-green-50 border-green-200': isCorrect,
    'bg-red-50 border-red-200': !isCorrect,
  });
}

export function getFeedbackTextClassName(props: QuizFeedbackVariantProps): string {
  const { isCorrect } = props;

  return clsx('text-2xl font-bold mb-2', {
    'text-green-900': isCorrect,
    'text-red-900': !isCorrect,
  });
}
