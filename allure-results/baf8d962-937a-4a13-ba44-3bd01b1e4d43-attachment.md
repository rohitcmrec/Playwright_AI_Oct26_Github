# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\RegisterPage.spec.ts >> registration page tesing >> 
- Location: tests\ui\RegisterPage.spec.ts:16:9

# Error details

```
Error: locator.check: Test ended.
Call log:
  - waiting for getByRole('radio', { name: 'Yes' })

```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test'
  2  | 
  3  | export class RegisterPage {
  4  |     private readonly page: Page
  5  |     private readonly firstName: Locator
  6  |     private readonly lastName: Locator
  7  |     private readonly email: Locator
  8  |     private readonly telephone: Locator
  9  |     private readonly password: Locator
  10 |     private readonly configPwd: Locator
  11 |     private readonly subscribeYes: Locator
  12 |     private readonly subscribeNo: Locator
  13 |     private readonly policy: Locator
  14 |     private readonly continueBtn: Locator
  15 | 
  16 |     constructor(page: Page) {
  17 |         this.page = page
  18 |         this.firstName = this.page.getByRole('textbox', { name: '* First Name' });
  19 |         this.lastName = this.page.getByRole('textbox', { name: '* Last Name' });
  20 |         this.email = this.page.getByRole('textbox', { name: '* E-Mail' });
  21 |         this.telephone = this.page.getByRole('textbox', { name: '* Telephone' });
  22 |         this.password = this.page.getByRole('textbox', { name: '* Password', exact: true });
  23 |         this.configPwd = this.page.getByRole('textbox', { name: '* Password Confirm' });
  24 |         this.subscribeYes = this.page.getByRole('radio', { name: 'Yes' });
  25 |         this.subscribeNo = this.page.getByRole('radio', { name: 'No' });
  26 |         this.policy = this.page.locator('input[name="agree"]');
  27 |         this.continueBtn = this.page.getByRole('button', { name: 'Continue' })
  28 |     }
  29 | 
  30 |     async completeRegistrationPage(fName: string, lName: string, email: string, telephone: string, pwd: string, subs: boolean) {
  31 |         await this.firstName.fill(fName)
  32 |         await this.lastName.fill(lName)
  33 |         await this.email.fill(email)
  34 |         await this.telephone.fill(telephone)
  35 |         await this.password.fill(pwd)
  36 |         await this.configPwd.fill(pwd)
  37 | 
  38 |         if (subs) {
> 39 |             await this.subscribeYes.check()
     |                                     ^ Error: locator.check: Test ended.
  40 |         } else {
  41 |             await this.subscribeNo.check()
  42 |         }
  43 | 
  44 |         await this.policy.check()
  45 |         await this.continueBtn.click()
  46 | 
  47 | 
  48 |     }
  49 | }
```