import { chromium, FullConfig } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

async function globalSetup(config: FullConfig) {
    const { baseURL } = config.projects[0].use
    const browser = await chromium.launch();
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(`${baseURL}/opencart`)

    const homePage = new HomePage(page)
    const loginPge = await homePage.clickLogin()
    await loginPge.performLogin('rohit1@ibm.com', '1234')
    await page.waitForLoadState('networkidle');

    await page.context().storageState({ path: '.playwright/auth.json' })

    await browser.close();
}

export default globalSetup