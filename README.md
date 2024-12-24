# Easy Go Takehome Test

## API Tests with Playwright

This project contains Playwright tests to cover both API and browser functionality.

## Requirements

- Node.js (v14 or higher)

## Installation

1. Clone the repository:
   `git clone https://github.com/johnnyl111/easygo-playwright-test.git`
2. Navigate to the repository (If you aren't currently in the directory): `cd easygo-playwright-test`
3. Install dependencies: `npm install`
4. Run local MongoDB server: `node server.js`
5. Execute Playwright tests: Open new terminal then run `npx playwright test` (to run all tests)

## Outputs

When you run the tests, the following outputs will be generated:
1. **Screenshots**
2. **HTML Test Report**
3. **Last Run Test Result** 

## Notes
- For the browser tests, I've added both tests using online APIs as well as creating my own local db/server with MongoDB. The reason for this as I found limitations with the online APIs as the data didn't persist after performing POST requests.
- I've also added 2 different types of browser tests - one using POM and the other one just a normal test.
- Once you have run the test, it will generate 3 outputs/artifacts:
   1. Screenshots of the browser tests located under /screenshots
   2. The most recent run test results (simple report) located under /test-results
   3. A HTML file of the test results (detailed report) located under /test-report
- We can also add automation email reports to be sent out after the test is completed, however, as this was not a requirement outlined, I've decided to leave this functionality out.
- I also decided to add playwright config file to make configuration easier to allow for future scalability.
