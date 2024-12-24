# Easy Go Takehome Test

## API Tests with Playwright

This project contains Playwright tests to cover both API and browser functionality.

## Requirements

- Node.js (v14 or higher)

## Installation

1. Open terminal
2. Clone repository: `git clone https://github.com/johnnyl111/easygo-playwright-test.git`
3. Navigate to the repository (If you aren't currently in the directory): `cd easygo-playwright-test`
4. Install dependencies: `npm install`
5. Run local MongoDB server: `node server.js`
6. Execute Playwright tests: Open new terminal then run `npx playwright test` (to run all tests)

TROUBLESHOOTING: if `npx playwright test` doesn't work, ensure you are in the correct directory > run command `cd easygo-playwright-test` to ensure you are in the right directory before running playwright.

## Outputs

When you run the tests, the following outputs will be generated:
1. **Screenshots**
2. **HTML Test Report**
3. **Last Run Test Result** 

## Notes
- For the browser tests, I've added both tests using online APIs as well as creating my own local db/server with MongoDB. The reason for this as I found limitations with the online APIs as the data didn't persist after performing POST requests.
- I've also added 2 variations for the browser tests - one using a basic test and another one using POM. (POM is my preferred method as it makes the code more maintainable/scalable)
- Once you have run the test, it will generate 3 outputs/artifacts:
   1. Screenshots of the browser tests located under /screenshots
   2. The most recent run test results (simple report) located under /test-results
   3. A HTML file of the test results (detailed report) located under /test-report
- We can also add automation email reports to be sent out after the test is completed, however, as this was not a requirement outlined and requires a recipient email + CICD set up, I've decided to leave this functionality out.
- I also decided to add playwright config file to make configuration easier to allow for future scalability.
