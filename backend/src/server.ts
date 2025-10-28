import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from '@/config';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';

const app: Application = express();

/**
 * @summary
 * Configure security middleware
 */
app.use(helmet());
app.use(cors(config.api.cors));

/**
 * @summary
 * Configure request processing middleware
 */
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * @summary
 * Configure logging
 */
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

/**
 * @api {get} /health Health Check
 * @apiName HealthCheck
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiDescription Returns server health status
 *
 * @apiSuccess {String} status Server status
 * @apiSuccess {String} timestamp Current timestamp
 * @apiSuccess {String} version API version
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.api.version,
  });
});

/**
 * @summary
 * Configure API routes with versioning
 */
app.use('/api', apiRoutes);

/**
 * @summary
 * Configure error handling
 */
app.use(notFoundMiddleware);
app.use(errorMiddleware);

/**
 * @summary
 * Graceful shutdown handler
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

/**
 * @summary
 * Start server
 */
const server = app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port} in ${config.server.nodeEnv} mode`);
  console.log(`API Version: ${config.api.version}`);
});

export default server;
