import { test, expect } from '@playwright/test'
import { MockAPIClient } from '../../pages/MockAPIClient'



test('mock testing', async ({ page }) => {

    let mock = new MockAPIClient(page);

    await mock.mock('get', '*/**/api/v1/fruits', [
        { id: 1, name: 'mocked fruit 1' },
        { id: 2, name: 'mocked fruit 2' }
    ]);

    await page.goto('https://demo.playwright.dev/api-mocking/');

    await expect(page.getByText('mocked fruit 1')).toBeVisible();
    await expect(page.getByText('mocked fruit 2')).toBeVisible();
})