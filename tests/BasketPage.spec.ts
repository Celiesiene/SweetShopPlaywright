const { test, expect } = require('@playwright/test');

// Helper function to add products to the cart
async function addSomeProducts(page) {
    // Navigate to the main page (adjust URL as needed)
    await page.goto('/');
    // Assuming each product has an "Add to cart" button; adjust selector based on actual page structure
    const addButtons = page.locator('button', { hasText: 'Add to cart' });
    for (let i = 0; i < 3; i++) {
        await addButtons.nth(i).click();
        // Optional: wait for cart update; adjust or remove based on application behavior
        await page.waitForTimeout(500);
    }
}

test('Verify empty cart button works', async ({ page }) => {
    // Step 1: Add products to the cart
    await addSomeProducts(page);

    // Step 2: Click the "Basket" link to navigate to the basket page
    await page.click('a[href="/basket"]:has-text("Basket")');

    // Step 3: Verify "Your Basket" text is present and visible
    await expect(page.locator('.text-muted', { hasText: 'Your Basket' })).toBeVisible();

    // Step 4: Check that the basket count is 3
    await expect(page.locator('#basketCount')).toHaveText('3');

    // Step 5: Set up dialog handler for the confirmation prompt
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Are you sure you want to empty your basket?');
        await dialog.accept(); // Clicks "OK"
    });

    // Step 6: Click the "Empty Basket" button
    await page.locator('.input-group a', { hasText: 'Empty Basket' }).click();

    // Step 7: Verify the basket count is 0
    await expect(page.locator('#basketCount')).toHaveText('0');
}); 
