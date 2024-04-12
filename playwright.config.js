const { devices } = require('@playwright/test');

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  // Test directory
  testDir: './tests',

  extensions: ['spec.ts'],

  launch: {
    launchOptions: {
      args: ["yarn", "dev"] 
    }
  },

  // Maximum number of workers to run tests in parallel
  workers: 1,

  // Browsers to run tests in
  browsers: [
    devices['Desktop Chrome']
  ],

  // Reporter to use
  reporter: [['html', { open: 'never' }]],

  // Timeout per test
  timeout: 30000,

  // Artifacts folder
  outputDir: './test-results',

  // Projects to run tests for
  projects: [
    {
      name: 'My Next.js App',
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
  ],
};

module.exports = config;