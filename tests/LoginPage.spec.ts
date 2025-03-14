import { test, expect } from '@playwright/test';

test.describe('Login Page Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
  });

  test('Verify that clicking “Login” navigates to the login page.', async ({ page }) => {
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.locator('.my-4 h1')).toHaveText('Login');

    // Verify login fields
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.locator('#dateTime')).not.toBeVisible();

    // Enter valid credentials
    await page.fill('#exampleInputEmail', 'saule@saule.lt');
    await page.fill('#exampleInputPassword', 'saule');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login success
    await expect(page.locator('.my-4 h1')).toHaveText('Your Account');
    await expect(page.getByText('Your Basket')).toBeVisible();
    await expect(page.locator('.my-4 p')).toHaveText('Welcome back saule@saule.lt'); // Turi nepraeiti
  });

  test('Verify invalid credentials message.', async ({ page }) => {
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.locator('.my-4 h1')).toHaveText('Login');

    // Enter invalid credentials
    await page.fill('#exampleInputEmail', '@@@');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);

    // Verify error messages
    await expect(page.locator('.invalid-feedback', { hasText: 'Please enter a valid email address.' })).toBeVisible();
    await expect(page.locator('.invalid-feedback', { hasText: 'Please enter a valid password.' })).toBeVisible();
  });

  // Social media tests - turi nepraeiti
  test('Twitter link is working', async ({ page }) => {
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.locator('.social > :nth-child(1)')).toHaveAttribute('href', 'www.twitter.com');
    await page.locator('a img[alt="twitter"]').click();
  });

  test('Facebook link is working', async ({ page }) => {
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.locator('.social > :nth-child(2)')).toHaveAttribute('href', 'www.facebook.com');
    await page.locator('a img[alt="facebook"]').click();
  });

  test('LinkedIn link is working', async ({ page }) => {
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.locator('.social > :nth-child(3)')).toHaveAttribute('href', 'www.linkedin.com');
    await page.locator('a img[alt="linkedin"]').click();
  });
});
