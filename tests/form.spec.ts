import { test, expect } from '@playwright/test'

test.use({ headless: false })

test('submit empty form', async ({ page }) => {

    await page.goto('http://localhost:3000')
    await page.click('button[type="submit"]')
    await page.waitForSelector('[data-testid="Error"]');
    const error = page.locator('[data-testid="Error"]');
    await expect(error).toHaveText('Fill All the required fields'); 

})

test('submit valid form', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.fill('[data-testid="User"]', 'postgres')
    await page.fill('[data-testid="Password"]', 'postgres')
    await page.fill('[data-testid="Host"]', 'localhost')
    await page.fill('[data-testid="Port"]', '5432')
    await page.fill('[data-testid="Database"]', 'myapp')
    await page.click('button[type="submit"]')
    await page.waitForURL('/schema');
})

test('submit invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.fill('[data-testid="User"]', 'test')
    await page.fill('[data-testid="Password"]', 'test')
    await page.fill('[data-testid="Host"]', 'test')
    await page.fill('[data-testid="Port"]', '5432')
    await page.fill('[data-testid="Database"]', 'test')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(5000);
    expect(page.url()).toBe('http://localhost:3000/');

})