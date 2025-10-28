import { clsx } from 'clsx';

export interface ErrorMessageVariantProps {
  variant?: 'error' | 'warning' | 'info';
}

/**
 * Get error message className based on variants
 */
export function getErrorMessageClassName(props: ErrorMessageVariantProps): string {
  const { variant = 'error' } = props;

  return clsx('p-6 rounded-lg border-2', {
    'bg-red-50 border-red-200 text-red-900': variant === 'error',
    'bg-yellow-50 border-yellow-200 text-yellow-900': variant === 'warning',
    'bg-blue-50 border-blue-200 text-blue-900': variant === 'info',
  });
}
