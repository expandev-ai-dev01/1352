import { clsx } from 'clsx';

export interface LoadingSpinnerVariantProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Get loading spinner className based on variants
 */
export function getLoadingSpinnerClassName(props: LoadingSpinnerVariantProps): string {
  const { size = 'medium', className } = props;

  return clsx(
    'animate-spin rounded-full border-4 border-gray-200 border-t-blue-600',
    {
      'h-6 w-6': size === 'small',
      'h-10 w-10': size === 'medium',
      'h-16 w-16': size === 'large',
    },
    className
  );
}
