import { clsx } from 'clsx';

export interface QuizConfigVariantProps {
  isSelected?: boolean;
}

export function getOptionClassName(props: QuizConfigVariantProps): string {
  const { isSelected = false } = props;

  return clsx('px-6 py-3 rounded-lg border-2 font-medium transition-all cursor-pointer', {
    'border-blue-600 bg-blue-50 text-blue-900': isSelected,
    'border-gray-300 bg-white text-gray-700 hover:border-blue-400': !isSelected,
  });
}
