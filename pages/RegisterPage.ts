import { Page, Locator } from '@playwright/test'

export class RegisterPage {
    private readonly page: Page
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly email: Locator
    private readonly telephone: Locator
    private readonly password: Locator
    private readonly configPwd: Locator
    private readonly subscribeYes: Locator
    private readonly subscribeNo: Locator
    private readonly policy: Locator
    private readonly continueBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.firstName = this.page.getByRole('textbox', { name: '* First Name' });
        this.lastName = this.page.getByRole('textbox', { name: '* Last Name' });
        this.email = this.page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = this.page.getByRole('textbox', { name: '* Telephone' });
        this.password = this.page.getByRole('textbox', { name: '* Password', exact: true });
        this.configPwd = this.page.getByRole('textbox', { name: '* Password Confirm' });
        this.subscribeYes = this.page.getByRole('radio', { name: 'Yes' });
        this.subscribeNo = this.page.getByRole('radio', { name: 'No' });
        this.policy = this.page.locator('input[name="agree"]');
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' })
    }

    async completeRegistrationPage(fName: string, lName: string, email: string, telephone: string, pwd: string, subs: boolean) {
        await this.firstName.fill(fName)
        await this.lastName.fill(lName)
        await this.email.fill(email)
        await this.telephone.fill(telephone)
        await this.password.fill(pwd)
        await this.configPwd.fill(pwd)

        if (subs) {
            await this.subscribeYes.check()
        } else {
            await this.subscribeNo.check()
        }

        await this.policy.check()
        await this.continueBtn.click()


    }
}