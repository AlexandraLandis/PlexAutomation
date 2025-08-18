import { test, expect } from '@playwright/test';


test('Signed in User can launch web player', async ({ page }) => {
    await page.waitForTimeout(30000)
    await expect(page.locator(`img[alt='${process.env.USERNAME}']`)).toBeVisible();

});