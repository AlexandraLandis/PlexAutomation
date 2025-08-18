//@ts-check
import { test, expect } from '@playwright/test';

test.describe('Authenticate User Tests', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    test('User sees initial page defaults upon navigating to plex', async ({ page }) => {
        await page.goto('https://www.plex.tv');
        await expect(page.getByRole('link', { name: 'Plex' })).toBeVisible();
        await expect(page).toHaveTitle('Stream Movies & Find Shows On The Best Streaming Services');
        await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
    });

    test('Signs in user with valid credentials', async ({ page }) => {
        await page.goto('https://www.plex.tv');
        await page.getByRole('link', { name: 'Sign In' }).click();

        const iframeform = await page.frameLocator('#fedauth-iFrame');
        await iframeform.locator("input[id='email']").fill(`${process.env.EMAIL}`);
        await iframeform.locator("input[id='password']").fill(`${process.env.PASSWORD}`);
        await iframeform.locator("button[type='submit']").click();

        await expect(page.locator(`img[alt='${process.env.USERNAME}']`)).toBeVisible();
        await expect(page.locator("span[title='Open Plex']")).toBeVisible();
    });
});

