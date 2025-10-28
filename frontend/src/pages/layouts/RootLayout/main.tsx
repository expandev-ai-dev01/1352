import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary Root layout component that wraps all pages
 * @domain core
 * @type layout-component
 * @category layout
 *
 * @description
 * Provides the base structure for all pages in the application.
 * Contains common elements like header, footer, and main content area.
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Quiz de Capitais do Mundo</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 Quiz de Capitais do Mundo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
