/**
 * @summary
 * Global test environment setup
 *
 * @module tests/testSetup
 *
 * @description
 * Configures the test environment for all test files.
 * This file is executed before running tests.
 */

/**
 * @summary Set test environment variables
 */
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

/**
 * @summary Configure test timeout
 */
jest.setTimeout(10000);

/**
 * @summary Global test setup
 */
beforeAll(() => {
  console.log('Starting test suite...');
});

/**
 * @summary Global test teardown
 */
afterAll(() => {
  console.log('Test suite completed.');
});
