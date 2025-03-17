import { test, expect } from '@playwright/test';

test.describe('Basket Page Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
    });

    test('Verify that checkout is working', async ({ page }) => {
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.locator('a[data-id="2"]').click();
        await page.locator('a[data-id="4"]').click();
        await page.locator('a[data-id="6"]').click();
        // await expect(page.locator('.badge')).toHaveText('3');
        await page.locator('a[href="/basket"]').click();
        await expect(page.locator('.text-muted').filter({ hasText: 'Your Basket' })).toHaveText('Your Basket');
        // await expect(page.locator('#basketCount')).toHaveText('3');
        await page.locator(':nth-child(1) > #name').fill('monika');
        await page.locator(':nth-child(2) > #name').fill('monikele');
        await page.locator('#email').fill('monika@monika.lt');
        await page.locator('#address').fill('Beaver str.');
        await page.locator('#address2').fill('2');
        await page.locator('#country').selectOption('United Kingdom');
        await page.locator('#city').selectOption('Bristol');
        await page.locator('#zip').fill('123123');
        await page.locator('#cc-name').fill('monika');
        await page.locator('#cc-number').fill('123123');
        await page.locator('#cc-expiration').fill('2025 06 06');
        await page.locator('#cc-cvv').fill('123');
        await page.locator('.needs-validation > .btn').click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/checkout');

    });

    test('Verify checkout without details', async ({ page }) => {
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.locator('a[data-id="2"]').click();
        await page.locator('a[data-id="4"]').click();
        await page.locator('a[data-id="6"]').click();
        // await expect(page.locator('.badge')).toHaveText('3');
        await page.locator('a[href="/basket"]').click();
        await expect(page.locator('.text-muted').filter({ hasText: 'Your Basket' })).toHaveText('Your Basket');
        // await expect(page.locator('#basketCount')).toHaveText('3');
        await page.locator('.needs-validation > .btn').click();

        const errorMessages = [
            'Valid first name is required.',
            'Valid last name is required.',
            'Please enter a valid email address for shipping updates.',
            'Please enter your shipping address.',
            'Please select a valid country.',
            'Please provide a valid state.',
            'Zip code required.',
            'Name on card is required',
            'Credit card number is required',
            'Expiration date required',
            'Security code required'
        ];

        for (const message of errorMessages) {
            await expect(page.locator('.invalid-feedback', { hasText: message })).toBeVisible();
        }
    });

    test('Verify that Standard Shipping works properly', async ({ page }) => {
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.locator('a[data-id="2"]').click();
        await page.locator('a[data-id="4"]').click();
        await page.locator('a[data-id="6"]').click();
        // await expect(page.locator('.badge')).toHaveText('3');
        await page.locator('a[href="/basket"]').click();
        await expect(page.locator('.text-muted').filter({ hasText: 'Your Basket' })).toHaveText('Your Basket');
        // await expect(page.locator('#basketCount')).toHaveText('3');
        await page.locator('.order-md-2 > .d-block > :nth-child(2)').click();
        await expect(page.locator('li.list-group-item:has-text("Total (GBP)") strong')).toHaveText('£4,24');
    });

    test('Verify that Promo Code is working', async ({ page }) => {
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.locator('a[data-id="2"]').click();
        await page.locator('a[data-id="4"]').click();
        await page.locator('a[data-id="6"]').click();
        // await expect(page.locator('.badge')).toHaveText('3');
        await page.locator('a[href="/basket"]').click();
        await expect(page.locator('.text-muted').filter({ hasText: 'Your Basket' })).toHaveText('Your Basket');
        // await expect(page.locator('#basketCount')).toHaveText('3');
        await page.locator('.input-group input').fill('promo123');
        await page.locator('.btn:has-text("Redeem")').click();
        await expect(page.locator('.invalid-feedback:has-text("Please input a valid promo code.")')).toBeVisible();
    });



    test('Verify empty cart button works', async ({ page }) => {
        // Add products to the cart
        await page.getByRole('link', { name: 'Browse Sweets' }).click();
        await page.locator('div:nth-child(2) > .card > .card-footer > .btn').first().click();
        await page.locator('div:nth-child(4) > .card > .card-footer > .btn').first().click();
        await page.locator('div:nth-child(3) > .card > .card-footer > .btn').first().click();
        
        // Click the "Basket" link to navigate to the basket page
        await page.locator('a[href="/basket"]').click();
        
        // Verify "Your Basket" text is present and visible
        await expect(page.locator('.text-muted').filter({ hasText: 'Your Basket' })).toHaveText('Your Basket');
        
        // Set up dialog handler for the confirmation prompt
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
        });
        
        // Click the "Empty Basket" button
        await page.getByRole('link', { name: 'Empty Basket' }).click();
        
        // Verify the basket count is 0
        await expect(page.locator('#basketCount')).toHaveText('0');
    });

    test('Verify if the About page is accessible', async ({ page }) => {
        await page.locator('a[href="/basket"]').click(); 
        await page.locator(':nth-child(2) > .nav-link').click(); 
        await expect(page).toHaveURL('https://sweetshop.netlify.app/about'); 
    });
    
});
