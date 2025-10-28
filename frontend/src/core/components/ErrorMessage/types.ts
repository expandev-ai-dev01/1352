/**
 * @types ErrorMessageTypes
 * @summary Type definitions for ErrorMessage component
 */

export interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  variant?: 'error' | 'warning' | 'info';
}
