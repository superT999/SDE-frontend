const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  modulePaths: ['<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/src/e2e-tests'],
  collectCoverageFrom: [
    '**/components/**/*.{ts,tsx}',
    '**/utils/*.{ts,tsx}',
    '!**/node_modules/**'
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic'
            }
          }
        }
      }
    ],
    '\\.(css|svg)$': './test-utils/fileTransformer.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    '<rootDir>/test-utils/mocks.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setupTests.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(react-toastify)/)']
  // https://jestjs.io/docs/configuration#coveragethreshold-object
};
