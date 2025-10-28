import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@/assets/styles/globals.css';

/**
 * @entrypoint Application Entry Point
 * @summary Initializes React application with providers and routing
 * @type application-bootstrap
 * @category core
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
