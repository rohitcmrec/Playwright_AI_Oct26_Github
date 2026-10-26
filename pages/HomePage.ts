import { Locator, Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { RegisterPage } from './RegisterPage'

export class HomePage {
    private readonly page: Page

    //private locators
    private readonly myAccount: Locator
    private readonly register: Locator
    private readonly login: Locator
    private readonly searchInput: Locator
    private readonly searchBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.myAccount = this.page.getByRole('link', { name: ' My Account' })
        this.register = this.page.getByRole('link', { name: 'Register', exact: true })
        this.login = this.page.getByRole('link', { name: 'Login', exact: true })
        this.searchInput = this.page.getByRole('textbox', { name: 'Search', exact: true })
        this.searchBtn = this.page.locator('.input-group-btn')

    }

    async getHomePageTitle() {
        const title = await this.page.title();
        return title;
    }

    async getHomePageURL() {
        const URL = this.page.url();
        return URL;
    }

    async clickLogin() {
        await this.myAccount.click()
        await this.login.click()
        return new LoginPage(this.page)
    }

    async clickRegister() {
        await this.myAccount.click()
        await this.register.click()
        return new RegisterPage(this.page)
    }


}