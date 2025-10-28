import { Request, Response } from 'express';

/**
 * @summary
 * 404 Not Found middleware
 *
 * @function notFoundMiddleware
 * @module middleware/notFound
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 *
 * @returns {void}
 *
 * @description
 * Handles requests to undefined routes.
 * Returns a standardized 404 error response.
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    timestamp: new Date().toISOString(),
  });
}
