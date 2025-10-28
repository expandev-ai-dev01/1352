# Quiz de Capitais do Mundo - Backend API

Backend REST API for the World Capitals Quiz application.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: REST API
- **Data Storage**: In-memory (no database persistence)

## Project Structure

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Run development server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

### API Endpoints

API endpoints will be documented here as features are implemented.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| API_VERSION | API version | v1 |
| CORS_ORIGINS | Allowed CORS origins | localhost:3000,localhost:3001,localhost:5173 |
| CACHE_TTL | Cache time-to-live (seconds) | 3600 |
| CACHE_CHECK_PERIOD | Cache check period (seconds) | 600 |

## Testing

The project uses Jest for testing. Tests are colocated with source files:

- Unit tests: `*.test.ts`
- Integration tests: `*Integration.ts`

Global test utilities are in the `tests/` directory.

## Code Standards

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Always
- **Line Length**: Maximum 120 characters
- **TypeScript**: Strict mode enabled

## License

ISC