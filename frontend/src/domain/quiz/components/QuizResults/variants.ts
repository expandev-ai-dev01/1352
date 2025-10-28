import { clsx } from 'clsx';

export interface QuizResultsVariantProps {
  accuracyPercentage: number;
}

export function getPerformanceClassName(props: QuizResultsVariantProps): string {
  const { accuracyPercentage } = props;

  return clsx('text-4xl font-bold mb-2', {
    'text-green-600': accuracyPercentage >= 90,
    'text-blue-600': accuracyPercentage >= 70 && accuracyPercentage < 90,
    'text-yellow-600': accuracyPercentage >= 50 && accuracyPercentage < 70,
    'text-red-600': accuracyPercentage < 50,
  });
}
