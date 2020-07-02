const common = require('./jest.common.config.js');

module.exports = {
  preset: 'ts-jest',
  ...common,
  displayName: 'renderer',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest-renderer.setup.js'],
  testMatch: ['**/renderer/**/__tests__/**/*.(spec|test).(tsx|ts)'],
};
