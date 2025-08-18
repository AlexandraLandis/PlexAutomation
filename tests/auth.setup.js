import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('https://www.plex.tv');
    await page.getByRole('link', { name: 'Sign In' }).click();

    const iframeform = await page.frameLocator('#fedauth-iFrame');
    await iframeform.locator("input[id='email']").fill(`${process.env.EMAIL}`);
    await iframeform.locator("input[id='password']").fill(`${process.env.PASSWORD}`);
    await iframeform.locator("button[type='submit']").click();

    await expect(page.locator(`img[alt='${process.env.USERNAME}']`)).toBeVisible();

    await page.context().storageState({ path: authFile })
})