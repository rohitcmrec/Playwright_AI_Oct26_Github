import { test, expect } from '../../fixtures/LoginFixture'

test.describe('peeform login via fixtue', () => {

    test.beforeEach('set up', async ({ page }) => {
        await page.goto('https://naveenautomationlabs.com/opencart/')
    })
    test('perform login', async ({ myAccountPage }) => {
        const title = await myAccountPage.getMyAccountPageTitle()
        expect(title).toBe('My Account')
    })
})