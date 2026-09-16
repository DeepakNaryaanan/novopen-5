import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: [
    'blocks/**/*.spec.js',
    'tests/**/*.spec.js',
  ],
  fullyParallel: true,
  forbidOnly: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'aem up --html-folder tests --html-mount / --no-open --port 3000',
    url: 'http://127.0.0.1:3000/novopen-5-test',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
