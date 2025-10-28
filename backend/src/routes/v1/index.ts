import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @summary
 * V1 API router
 *
 * @description
 * Organizes routes by access level:
 * - External: Public endpoints (no authentication required)
 * - Internal: Authenticated endpoints (authentication required)
 */

/**
 * @api External (public) routes - /api/v1/external/...
 */
router.use('/external', externalRoutes);

/**
 * @api Internal (authenticated) routes - /api/v1/internal/...
 */
router.use('/internal', internalRoutes);

export default router;
