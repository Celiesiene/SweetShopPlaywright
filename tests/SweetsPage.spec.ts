import { test, expect } from '@playwright/test';

test.describe('Sweet Page Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://sweetshop.netlify.app/');
        await expect(page).toHaveURL('https://sweetshop.netlify.app/');
    });

    test('Verify that clicking “Sweets” navigates to the product list page.', async ({ page }) => {
        await page.getByRole('link', { name: 'Sweets', exact: true }).click();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    });
    

    test('Verify that each product has a name, image, description, and price.', async ({ page }) => {
        await page.getByRole('link', { name: 'Sweets', exact: true }).click();
        
        const products = page.locator('.row > div'); // Kiekvienas produktas yra `div` viduje
        const count = await products.count();
        
        for (let i = 0; i < count; i++) {
            const product = products.nth(i);

            await expect(product.locator('h4.card-title')).toBeVisible();
            await expect(product.locator('h4.card-title')).not.toBeEmpty();

            await expect(product.locator('p.card-text')).toBeVisible();
            await expect(product.locator('p.card-text')).not.toBeEmpty();

            await expect(product.locator('p small.text-muted')).toBeVisible();
            await expect(product.locator('p small.text-muted')).not.toBeEmpty();

            const img = product.locator('img.card-img-top');

            // Laukiame, kol paveikslėlis atsiras DOM'e
            await expect(img).toBeVisible();
            
            // Tikriname, ar paveikslėlis įsikėlė teisingai
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            expect(naturalWidth).toBeGreaterThan(0);
            
        }
    });

    test('Verify that the item count in the basket updates after adding a product.', async ({ page }) => {
        await page.getByRole('link', { name: 'Sweets', exact: true }).click();
    
        // Laukiame, kol bent vienas mygtukas bus matomas
        const addToBasketButton = page.locator('div:nth-child(2) > .card > .card-footer > .btn').first()
        await addToBasketButton.waitFor(); // Laukiame, kol atsiras DOM'e
        await addToBasketButton.scrollIntoViewIfNeeded();
        await expect(addToBasketButton).toBeVisible();
    
        // Spaudžiame mygtuką
        await addToBasketButton.click();
        await page.waitForTimeout(1000);
    
        // Laukiame, kol atsinaujins krepšelio skaičius
        const basketCount = page.locator('.badge');
        await expect(basketCount).toBeVisible();
        await page.waitForTimeout(1000);
        await expect(basketCount).toHaveText('1'); //nerodo kažkodėl

    });
    
    
});
