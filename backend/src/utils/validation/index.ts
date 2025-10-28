import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 *
 * @module utils/validation
 *
 * @description
 * Reusable Zod schemas for common validation patterns.
 * All validators are applied BEFORE .nullable() or .optional().
 */

/**
 * @summary String validation with max length
 */
export const zString = z.string().min(1);

/**
 * @summary Nullable string with max length
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Positive integer validation
 */
export const zPositiveInt = z.number().int().positive();

/**
 * @summary Foreign key validation (positive integer, nullable)
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Boolean bit validation (0 or 1)
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * @summary Email validation
 */
export const zEmail = z.string().email();

/**
 * @summary Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary UUID validation
 */
export const zUUID = z.string().uuid();

/**
 * @summary URL validation
 */
export const zURL = z.string().url();

/**
 * @summary Validate required parameter
 *
 * @function validateRequiredParam
 * @module utils/validation
 *
 * @param {any} param - Parameter to validate
 * @param {string} paramName - Parameter name for error message
 *
 * @throws {Error} If parameter is null or undefined
 */
export function validateRequiredParam(param: any, paramName: string): void {
  if (param === null || param === undefined) {
    throw new Error(`${paramName} is required`);
  }
}
