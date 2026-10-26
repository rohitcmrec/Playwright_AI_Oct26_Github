import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { DataGenerator } from '../../utils/DataGenerator'
import { fr } from '@faker-js/faker';


let homePage;
let registerPage
let dataGenerator

test.describe('registration page tesing', () => {

    test.beforeEach('setup', async ({ page }) => {
        await page.goto('/opencart/')
    })
    test('', async ({ page }) => {
        homePage = new HomePage(page)
        registerPage = await homePage.clickRegister()

        let firstName = DataGenerator.getFirstName()
        let lastName = DataGenerator.getLastName()
        let email = DataGenerator.getEmail()

        let telephone = DataGenerator.getPhoneNumber()
        let pwd = DataGenerator.getPassword()

        await registerPage.completeRegistrationPage(firstName, lastName, email, telephone, pwd, true)

    })
})