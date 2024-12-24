import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
    // I've added 3 workers to improve the speed of tests. This will be good and can be adjusted as project scales.
    workers: 3,
    projects: [
      {
        name: 'Desktop Chrome',
        use: {
            ...devices['Desktop Chrome']
          },
      },
    // I've commented this part out, but we can test for mobile devices if required.
    //   {
    //     name: 'Mobile Safari',
    //     use: { ...devices['iPhone 12'] },
    //   }
    ],
    reporter: [
        ['html', { outputFolder: 'test-report' }]
      ]
  });
  