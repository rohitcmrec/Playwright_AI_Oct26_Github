import { Page, Locator } from '@playwright/test'
import { MyAccountPage } from './MyAccountPage'

export class LoginPage {
    private readonly  page: Page
    private readonly userName: Locator
    private readonly password: Locator
    private readonly signBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.userName = this.page.getByRole('textbox', { name: 'E-Mail Address' })
        this.password = this.page.getByRole('textbox', { name: 'Password' })
        this.signBtn = this.page.getByRole('button', { name: 'Login' })
    }

    async getLoginPageTitle() {
        const title = await this.page.title()
        return title;
    }

    async performLogin(usr: string, pwd: string) {
        await this.userName.fill(usr)
        await this.password.fill(pwd)
        await this.signBtn.click()
        return new MyAccountPage(this.page)
    }
}