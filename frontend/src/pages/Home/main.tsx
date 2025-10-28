import { useNavigate } from 'react-router-dom';

/**
 * @page HomePage
 * @summary Welcome page for the Quiz application
 * @domain core
 * @type landing-page
 * @category public
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @description
 * Landing page that introduces the quiz application and provides
 * navigation to start the quiz.
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-900">Bem-vindo ao Quiz de Capitais!</h2>

        <p className="text-lg text-gray-600">
          Teste seus conhecimentos sobre as capitais dos países ao redor do mundo. Responda
          perguntas de múltipla escolha e descubra sua pontuação!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/quiz')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Iniciar Quiz
          </button>

          <button
            onClick={() => navigate('/about')}
            className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Sobre o Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
