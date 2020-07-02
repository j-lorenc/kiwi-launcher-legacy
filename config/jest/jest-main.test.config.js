const common = require('./jest.common.config.js');

module.exports = {
  ...common,
  displayName: 'main',
  // runner: '@jest-runner/electron/main',
  testEnvironment: 'node',
  rootDir: './../../',
  testMatch: ['**/(main|preload)/**/__tests__/**/*.(spec).ts'],
};
