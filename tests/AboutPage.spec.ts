import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
    });

    test('Verify that clicking “About” navigates to the site description page.', async ({ page }) => {
        await page.locator('a[href="/about"]').click();

        // Verify the page title is visible
        await expect(page.locator('.my-4 h1')).toHaveText('Sweet Shop Project');

        // Patikriname, kad yra bent 2 `.my-4 p` elementai
        const paragraphs = page.locator('.my-4 p');
        await expect(paragraphs).toHaveCount(2);

        // Tikriname, kad abu tekstai yra matomi ir ne tušti
        for (let i = 0; i < 2; i++) {
            await expect(paragraphs.nth(i)).toBeVisible();
            await expect(paragraphs.nth(i)).not.toBeEmpty();
        }
    });

    test('Verify Mobile Alert', async ({ page }) => {
        // Nustatome ekrano dydį, imituodami mobilųjį įrenginį
        await page.setViewportSize({ width: 414, height: 896 }); // iPhone XR
        await page.goto('https://sweetshop.netlify.app/about');

        const alertBanner = page.locator('.mobileShow');

        // Tikriname, ar alertas matomas
        await expect(alertBanner).toBeVisible();
        await expect(alertBanner).toContainText('20% Off!');
        await expect(alertBanner).toContainText('Get 20% off your first sweet shop order!');
    });
});
