import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component for async operations
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @props
 * @param {LoadingSpinnerProps} props - Component properties
 * @param {string} props.size - Spinner size (small, medium, large)
 * @param {string} props.className - Additional CSS classes
 *
 * @examples
 * ```tsx
 * <LoadingSpinner size="large" />
 * <LoadingSpinner size="small" className="my-4" />
 * ```
 */
export const LoadingSpinner = ({ size = 'medium', className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className={getLoadingSpinnerClassName({ size, className })} />
    </div>
  );
};
