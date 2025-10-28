import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

/**
 * @summary
 * Main API router with version management
 *
 * @description
 * Routes are organized by API version to support evolution
 * without breaking existing clients.
 */

/**
 * @api Version 1 (current stable)
 */
router.use('/v1', v1Routes);

/**
 * @api Version 2 (future)
 * Uncomment when v2 is ready
 */
// router.use('/v2', v2Routes);

export default router;
