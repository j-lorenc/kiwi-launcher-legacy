// jest.config.js
const common = require('./config/jest/jest.common.config.js');

module.exports = {
  projects: [
    {
      ...common,
      testEnvironment: 'node',
      testMatch: ['**/(main|preload)/**/__tests__/**/*.(spec|test).ts'],
    },
    {
      ...common,
      runner: '@jest-runner/electron',
      testEnvironment: 'jsdom',
      testMatch: ['**/renderer/**/__tests__/**/*.(spec|test).(tsx|ts)'],
    },
  ],
};
