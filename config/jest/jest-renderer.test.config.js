const common = require('./jest.common.config.js');

module.exports = {
  preset: 'ts-jest',
  ...common,
  displayName: 'renderer',
  testEnvironment: 'jsdom',
  testMatch: ['**/renderer/**/__tests__/**/*.(spec|test).(tsx|ts)'],
};
