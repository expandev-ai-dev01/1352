import { clsx, type ClassValue } from 'clsx';

/**
 * @utility cn
 * @summary Utility function to merge Tailwind CSS classes
 * @domain core
 * @type utility-function
 * @category styling
 *
 * @description
 * Combines clsx for conditional classes with proper class merging.
 * Useful for component variants and conditional styling.
 *
 * @examples
 * ```tsx
 * cn('base-class', condition && 'conditional-class', className)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
