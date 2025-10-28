import { useNavigate } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary 404 error page for non-existent routes
 * @domain core
 * @type error-page
 * @category public
 *
 * @routing
 * - Path: *
 * - Params: none
 * - Query: none
 * - Guards: none
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>

        <h2 className="text-2xl font-semibold text-gray-700">Página não encontrada</h2>

        <p className="text-gray-600">A página que você está procurando não existe ou foi movida.</p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
