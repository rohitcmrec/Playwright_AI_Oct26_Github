import { test, expect } from '@playwright/test'

test.use({ storageState: '.playwright/auth.json' })

test('testing strorage state via login', async ({ page }) => {

    await page.goto('/opencart/index.php?route=account/account')
    console.log(await page.title())

})