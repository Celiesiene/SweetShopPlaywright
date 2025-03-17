# SweetShopTesting

## About the Project
SweetShopTesting is an automated testing project designed to validate the functionality of the SweetShop website using Playwright.

## Requirements
- **Node.js** (recommended version 18+)
- **npm** or **yarn**
- **Playwright**

## Installation
To install the required dependencies, run the following command:

```sh
npm install --save-dev @playwright/test
```

To install browsers required by Playwright:

```sh
npx playwright install
```

## Project Structure
```
SweetShopTesting/
│-- tests/
│   ├── home.spec.js   # Homepage tests
│   ├── login.spec.js  # Login tests
│-- playwright.config.js  # Playwright configuration file
│-- package.json        # Dependencies and npm commands
│-- README.md           # This file
```

## Example Test
Create a file `tests/home.spec.js` and add the following test:

```javascript
const { test, expect } = require('@playwright/test');

test('Homepage title validation', async ({ page }) => {
  await page.goto('https://sweetshop.com');
  await expect(page).toHaveTitle(/Sweet Shop/);
});
```

## Running Tests
### Run tests in headed mode:
```sh
npx playwright test --headed
```

### Run tests in headless mode:
```sh
npx playwright test
```

### Run a specific test file:
```sh
npx playwright test tests/home.spec.js
```



