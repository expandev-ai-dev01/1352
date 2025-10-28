import { clsx } from 'clsx';

export interface QuizHistoryVariantProps {
  isBest?: boolean;
}

export function getRecordClassName(props: QuizHistoryVariantProps): string {
  const { isBest = false } = props;

  return clsx('bg-white rounded-lg p-4 border-2', {
    'border-yellow-400 bg-yellow-50': isBest,
    'border-gray-200': !isBest,
  });
}
