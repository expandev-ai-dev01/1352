import { clsx } from 'clsx';

export interface QuizQuestionVariantProps {
  isSelected?: boolean;
  isDisabled?: boolean;
}

export function getAlternativeClassName(props: QuizQuestionVariantProps): string {
  const { isSelected = false, isDisabled = false } = props;

  return clsx('w-full px-6 py-4 rounded-lg border-2 text-left font-medium transition-all', {
    'border-blue-600 bg-blue-50 text-blue-900': isSelected && !isDisabled,
    'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-gray-50':
      !isSelected && !isDisabled,
    'opacity-50 cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });
}
