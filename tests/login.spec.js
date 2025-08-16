//@ts-check
import { test, expect } from '@playwright/test';

test.skip('Logs user in', async ({ page }) => {
    await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/tv') && resp.status() === 200)
    ]);
    await page.goto('https://www.plex.tv');
    await expect(page).toHaveTitle('Stream Movies');
});


test('navigates to plex', async ({ page }) => {
    await page.goto('https://www.plex.tv');
    await expect(page).toHaveTitle('Stream Movies & Find Shows On The Best Streaming Services');
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
    //await page.waitForTimeout(5000)
})