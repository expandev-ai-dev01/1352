/**
 * @summary
 * Standard response utilities
 *
 * @module utils/response
 *
 * @description
 * Provides standardized response formatting for API endpoints.
 */

/**
 * @interface SuccessResponse
 * @description Standard success response format
 *
 * @property {boolean} success - Always true for success
 * @property {T} data - Response data
 * @property {object} [metadata] - Optional metadata
 * @property {string} metadata.timestamp - Response timestamp
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * @interface ListResponse
 * @description Standard list response format with pagination
 *
 * @property {boolean} success - Always true for success
 * @property {T[]} data - Array of items
 * @property {object} metadata - Pagination metadata
 * @property {number} metadata.page - Current page
 * @property {number} metadata.pageSize - Items per page
 * @property {number} metadata.total - Total items
 * @property {boolean} metadata.hasNext - Has next page
 * @property {boolean} metadata.hasPrevious - Has previous page
 */
export interface ListResponse<T> {
  success: true;
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
    timestamp: string;
  };
}

/**
 * @summary
 * Create a success response
 *
 * @function successResponse
 * @module utils/response
 *
 * @param {T} data - Response data
 * @param {object} [metadata] - Optional metadata
 *
 * @returns {SuccessResponse<T>} Formatted success response
 */
export function successResponse<T>(data: T, metadata?: Record<string, any>): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
}

/**
 * @summary
 * Create a list response with pagination
 *
 * @function listResponse
 * @module utils/response
 *
 * @param {T[]} data - Array of items
 * @param {number} page - Current page
 * @param {number} pageSize - Items per page
 * @param {number} total - Total items
 *
 * @returns {ListResponse<T>} Formatted list response
 */
export function listResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): ListResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      page,
      pageSize,
      total,
      hasNext: page * pageSize < total,
      hasPrevious: page > 1,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary
 * Create an error response
 *
 * @function errorResponse
 * @module utils/response
 *
 * @param {string} message - Error message
 * @param {string} [code] - Error code
 *
 * @returns {object} Formatted error response
 */
export function errorResponse(message: string, code: string = 'ERROR'): object {
  return {
    success: false,
    error: {
      code,
      message,
    },
    timestamp: new Date().toISOString(),
  };
}
