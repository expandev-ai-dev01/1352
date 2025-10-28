/**
 * @summary
 * Quiz business logic implementation
 *
 * @module services/quiz/quizLogic
 *
 * @description
 * Contains all business logic for quiz operations including
 * session management, question generation, answer validation,
 * and scoring calculations.
 */

import { v4 as uuidv4 } from 'uuid';
import {
  Country,
  QuizSession,
  QuizQuestion,
  QuizAnswer,
  QuizResult,
  StartQuizRequest,
  SubmitAnswerRequest,
  UseHintRequest,
  QuestionResponse,
  AnswerFeedback,
  HintResponse,
} from './quizTypes';
import {
  QUIZ_CONFIG,
  POINTS_BY_DIFFICULTY,
  HINT_TYPES,
  PERFORMANCE_MESSAGES,
  DifficultyLevel,
} from '@/constants/quiz';
import countriesData from '@/data/countries.json';

/**
 * @summary In-memory storage for active quiz sessions
 */
const activeSessions = new Map<string, QuizSession>();

/**
 * @summary
 * Load countries data from JSON file
 *
 * @function loadCountries
 *
 * @returns {Country[]} Array of countries
 */
function loadCountries(): Country[] {
  return countriesData as Country[];
}

/**
 * @summary
 * Filter countries by difficulty level
 *
 * @function filterCountriesByDifficulty
 *
 * @param {DifficultyLevel} difficulty - Difficulty level
 *
 * @returns {Country[]} Filtered countries
 */
function filterCountriesByDifficulty(difficulty: DifficultyLevel): Country[] {
  const countries = loadCountries();
  return countries.filter((country) => country.difficulty === difficulty);
}

/**
 * @summary
 * Shuffle array using Fisher-Yates algorithm
 *
 * @function shuffleArray
 *
 * @param {T[]} array - Array to shuffle
 *
 * @returns {T[]} Shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * @summary
 * Generate alternatives for a question
 *
 * @function generateAlternatives
 *
 * @param {string} correctCapital - Correct capital
 * @param {Country[]} allCountries - All available countries
 *
 * @returns {string[]} Array of 4 alternatives (1 correct + 3 incorrect)
 */
function generateAlternatives(correctCapital: string, allCountries: Country[]): string[] {
  const incorrectCapitals = allCountries
    .filter((c) => c.capital !== correctCapital)
    .map((c) => c.capital);

  const shuffledIncorrect = shuffleArray(incorrectCapitals);
  const selectedIncorrect = shuffledIncorrect.slice(0, QUIZ_CONFIG.INCORRECT_ALTERNATIVES_COUNT);

  const alternatives = [correctCapital, ...selectedIncorrect];
  return shuffleArray(alternatives);
}

/**
 * @summary
 * Generate quiz questions
 *
 * @function generateQuestions
 *
 * @param {DifficultyLevel} difficulty - Difficulty level
 * @param {number} quantity - Number of questions
 *
 * @returns {QuizQuestion[]} Array of quiz questions
 */
function generateQuestions(difficulty: DifficultyLevel, quantity: number): QuizQuestion[] {
  const countries = filterCountriesByDifficulty(difficulty);
  const allCountries = loadCountries();

  if (countries.length < quantity) {
    throw new Error(
      `Não há países suficientes para o nível ${difficulty}. Disponíveis: ${countries.length}, Solicitados: ${quantity}`
    );
  }

  const selectedCountries = shuffleArray(countries).slice(0, quantity);

  return selectedCountries.map((country, index) => ({
    id: index + 1,
    country: country.country,
    correctCapital: country.capital,
    alternatives: generateAlternatives(country.capital, allCountries),
    curiosity: country.curiosity,
    timeRemaining: QUIZ_CONFIG.TIME_PER_QUESTION,
  }));
}

/**
 * @summary
 * Calculate performance message based on accuracy
 *
 * @function calculatePerformanceMessage
 *
 * @param {number} accuracyPercentage - Accuracy percentage
 *
 * @returns {string} Performance message
 */
function calculatePerformanceMessage(accuracyPercentage: number): string {
  if (accuracyPercentage >= PERFORMANCE_MESSAGES.EXCELLENT.threshold) {
    return PERFORMANCE_MESSAGES.EXCELLENT.message;
  }
  if (accuracyPercentage >= PERFORMANCE_MESSAGES.VERY_GOOD.threshold) {
    return PERFORMANCE_MESSAGES.VERY_GOOD.message;
  }
  if (accuracyPercentage >= PERFORMANCE_MESSAGES.GOOD.threshold) {
    return PERFORMANCE_MESSAGES.GOOD.message;
  }
  return PERFORMANCE_MESSAGES.KEEP_PRACTICING.message;
}

/**
 * @summary
 * Start a new quiz session
 *
 * @function startQuiz
 *
 * @param {StartQuizRequest} params - Quiz configuration
 *
 * @returns {Promise<QuizSession>} Created quiz session
 */
export async function startQuiz(params: StartQuizRequest): Promise<QuizSession> {
  const { difficulty, questionQuantity } = params;

  const sessionId = uuidv4();
  const questions = generateQuestions(difficulty, questionQuantity);

  const session: QuizSession = {
    id: sessionId,
    difficulty,
    questionQuantity,
    hintsAvailable: QUIZ_CONFIG.INITIAL_HINTS,
    questions,
    currentQuestionIndex: 0,
    answers: [],
    startedAt: new Date(),
  };

  activeSessions.set(sessionId, session);

  return session;
}

/**
 * @summary
 * Get current question for a session
 *
 * @function getCurrentQuestion
 *
 * @param {string} sessionId - Session ID
 *
 * @returns {Promise<QuestionResponse>} Current question data
 */
export async function getCurrentQuestion(sessionId: string): Promise<QuestionResponse> {
  const session = activeSessions.get(sessionId);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.currentQuestionIndex >= session.questions.length) {
    throw new Error('Todas as perguntas já foram respondidas');
  }

  const question = session.questions[session.currentQuestionIndex];
  const progress = `${session.currentQuestionIndex + 1} de ${session.questionQuantity}`;

  return {
    question,
    progress,
    hintsAvailable: session.hintsAvailable,
  };
}

/**
 * @summary
 * Submit an answer for the current question
 *
 * @function submitAnswer
 *
 * @param {SubmitAnswerRequest} params - Answer submission data
 *
 * @returns {Promise<AnswerFeedback>} Answer feedback
 */
export async function submitAnswer(params: SubmitAnswerRequest): Promise<AnswerFeedback> {
  const { sessionId, questionId, selectedAnswer, timeSpent } = params;

  const session = activeSessions.get(sessionId);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  const question = session.questions.find((q) => q.id === questionId);

  if (!question) {
    throw new Error('Pergunta não encontrada');
  }

  if (session.answers.some((a) => a.questionId === questionId)) {
    throw new Error('Você já respondeu esta pergunta');
  }

  const isCorrect = selectedAnswer === question.correctCapital;
  const pointsEarned = isCorrect ? POINTS_BY_DIFFICULTY[session.difficulty] : 0;

  const answer: QuizAnswer = {
    questionId,
    selectedAnswer,
    isCorrect,
    pointsEarned,
    timeSpent,
  };

  session.answers.push(answer);
  session.currentQuestionIndex++;

  const isLastQuestion = session.currentQuestionIndex >= session.questions.length;

  const message = isCorrect
    ? 'Correto!'
    : `Incorreto! A resposta correta é: ${question.correctCapital}`;

  return {
    isCorrect,
    correctAnswer: question.correctCapital,
    pointsEarned,
    message,
    isLastQuestion,
  };
}

/**
 * @summary
 * Use a hint for the current question
 *
 * @function useHint
 *
 * @param {UseHintRequest} params - Hint request data
 *
 * @returns {Promise<HintResponse>} Hint response
 */
export async function useHint(params: UseHintRequest): Promise<HintResponse> {
  const { sessionId, questionId, hintType } = params;

  const session = activeSessions.get(sessionId);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.hintsAvailable <= 0) {
    throw new Error('Você não possui mais dicas disponíveis');
  }

  const question = session.questions.find((q) => q.id === questionId);

  if (!question) {
    throw new Error('Pergunta não encontrada');
  }

  session.hintsAvailable--;

  let hintData: string | string[];

  if (hintType === HINT_TYPES.ELIMINATE_ALTERNATIVE) {
    const incorrectAlternatives = question.alternatives.filter(
      (alt) => alt !== question.correctCapital
    );
    const toEliminate = incorrectAlternatives[0];
    question.alternatives = question.alternatives.filter((alt) => alt !== toEliminate);
    hintData = question.alternatives;
  } else if (hintType === HINT_TYPES.SHOW_CURIOSITY) {
    hintData = question.curiosity;
  } else {
    throw new Error('Tipo de dica inválido');
  }

  return {
    hintType,
    hintData,
    hintsRemaining: session.hintsAvailable,
  };
}

/**
 * @summary
 * Get quiz results for a completed session
 *
 * @function getQuizResults
 *
 * @param {string} sessionId - Session ID
 *
 * @returns {Promise<QuizResult>} Quiz results
 */
export async function getQuizResults(sessionId: string): Promise<QuizResult> {
  const session = activeSessions.get(sessionId);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.answers.length !== session.questionQuantity) {
    throw new Error('Quiz ainda não foi completado');
  }

  const totalScore = session.answers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
  const correctAnswers = session.answers.filter((a) => a.isCorrect).length;
  const incorrectAnswers = session.answers.length - correctAnswers;
  const accuracyPercentage =
    Math.round((correctAnswers / session.questionQuantity) * 100 * 10) / 10;
  const performanceMessage = calculatePerformanceMessage(accuracyPercentage);

  const result: QuizResult = {
    sessionId: session.id,
    difficulty: session.difficulty,
    questionQuantity: session.questionQuantity,
    totalScore,
    correctAnswers,
    incorrectAnswers,
    accuracyPercentage,
    performanceMessage,
    completedAt: new Date(),
  };

  activeSessions.delete(sessionId);

  return result;
}

/**
 * @summary
 * Get session by ID
 *
 * @function getSession
 *
 * @param {string} sessionId - Session ID
 *
 * @returns {Promise<QuizSession | null>} Quiz session or null
 */
export async function getSession(sessionId: string): Promise<QuizSession | null> {
  return activeSessions.get(sessionId) || null;
}
