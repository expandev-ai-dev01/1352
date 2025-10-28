import { Request, Response, NextFunction } from 'express';

/**
 * @interface ErrorResponse
 * @description Standard error response format
 *
 * @property {boolean} success - Always false for errors
 * @property {object} error - Error details
 * @property {string} error.code - Error code
 * @property {string} error.message - Error message
 * @property {any} [error.details] - Additional error details
 * @property {string} timestamp - Error timestamp
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Global error handling middleware
 *
 * @function errorMiddleware
 * @module middleware/error
 *
 * @param {Error} err - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 *
 * @returns {void}
 *
 * @description
 * Catches all errors and formats them into a standard response.
 * Logs errors in development mode for debugging.
 */
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  /**
   * @important Log error details in development
   */
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      code: errorCode,
      message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      ...(process.env.NODE_ENV === 'development' && { details: err.stack }),
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorResponse);
}

/**
 * @summary
 * Create a custom error with status code
 *
 * @function createError
 * @module middleware/error
 *
 * @param {number} statusCode - HTTP status code
 * @param {string} code - Error code
 * @param {string} message - Error message
 *
 * @returns {Error} Custom error object
 */
export function createError(statusCode: number, code: string, message: string): Error {
  const error: any = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}
