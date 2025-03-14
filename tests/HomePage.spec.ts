import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Visit the homepage before each test
  await page.goto('https://sweetshop.netlify.app/');
});

test('Home Page functionality', async ({ page }) => {
  // Visit the homepage
 
  await expect(page).toHaveURL('https://sweetshop.netlify.app/');

  // Verify that the navigation bar is present
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('a[href="/"]').filter({ hasText: 'Sweet Shop' })).toBeVisible();

  // Verify that the page contains a product list or recommendations
  await expect(page.getByText('Our most popular choice of')).toBeVisible();
  const productCount = await page.locator('.row > div').count();
  expect(productCount).toBeGreaterThan(1);
  // This test should fail because "Most Popular" is not displayed
  await expect(page.locator('.messageContainer h2')).toContainText('Most popular');
});


test('Verify that the main links work and navigate to the correct pages', async ({ page }) => {
   const links = [
        { label: 'Sweets', url: '/sweets' },
        { label: 'About', url: '/about' },
        { label: 'Login', url: '/login' },
        { label: 'Basket', url: '/basket' }
    ];

    for (const link of links) {
      await page.locator('nav').getByRole('link', { name: link.label }).click();
      await expect(page).toHaveURL(new RegExp(link.url));
      await page.goBack();
  }
  
});


test('Verify that clicking “Browse sweets” displays the full product list', async ({ page }) => {

    // Click the "Browse Sweets" link
    await page.getByRole('link', { name: 'Browse Sweets' }).click();

    // Verify that the URL contains "/sweets"
    await expect(page).toHaveURL(/\/sweets/);

    // Verify that the product list contains more than one item
    const productCount = await page.locator('.row > div').count();
    expect(productCount).toBeGreaterThan(1);

    // Ensure each row has more than one child element
    const rows = await page.locator('.row').all();
    for (const row of rows) {
        const childCount = await row.locator('> div').count();
        expect(childCount).toBeGreaterThan(1);
    }
});




test('Verify that a product can be added to the basket directly from the homepage.', async ({ page }) => {

    // Click on the product with data-id="4" (Add to Basket button)
    await page.locator('[data-id="4"]').click();

    // Verify that the basket count updates to "1"
    await expect(page.locator('.badge')).toHaveText('1');
});



