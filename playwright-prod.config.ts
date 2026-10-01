import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // timeout: 10000, 
  expect: {
    timeout: 2000
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.URL,
    trace: 'on-first-retry',
    video: 'off'
  },
// everything that is global can be configured on the project level 
  projects: [

    //custom does not have to include a browser 
    // {
    //   name: 'page-object-test',
    //   testMatch: '*page-objects.spec.ts'
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

   
  ],

  
});


//can be set per environment 
//command npx playwright test --config=playwright-prod.config.ts