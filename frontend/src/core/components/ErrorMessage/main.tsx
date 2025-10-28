import { getErrorMessageClassName } from './variants';
import type { ErrorMessageProps } from './types';

/**
 * @component ErrorMessage
 * @summary Error message display component
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @props
 * @param {ErrorMessageProps} props - Component properties
 * @param {string} props.title - Error title
 * @param {string} props.message - Error message
 * @param {Function} props.onRetry - Retry callback
 * @param {Function} props.onBack - Back navigation callback
 *
 * @examples
 * ```tsx
 * <ErrorMessage
 *   title="Failed to load data"
 *   message="Please try again later"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export const ErrorMessage = ({
  title,
  message,
  onRetry,
  onBack,
  variant = 'error',
}: ErrorMessageProps) => {
  return (
    <div className={getErrorMessageClassName({ variant })}>
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{message}</p>

        <div className="flex gap-4 justify-center mt-6">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          )}

          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
