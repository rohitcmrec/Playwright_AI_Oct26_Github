import { Page } from "@playwright/test";

export class MockAPIClient {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async changeOutputResponse(method: string, urlPattern: string, data: object[]) {

        await this.page.route(urlPattern, async (route) => {

            if (route.request().method().toUpperCase() === method.toUpperCase()) {
                await route.fulfill({
                    json: data
                })
            } else {
                await route.continue()
            }
        })

    }

    async modifyOutputResponse(method: string, urlPattern: string, data: any) {
        await this.page.route(urlPattern, async route => {
            if (route.request().method().toUpperCase() == method.toUpperCase()) {
                let response = await route.fetch();
                let responseBody = await response.json()

                responseBody.push(data);
                await route.fulfill({ response: response, json: responseBody })
            } else {
                await route.continue()
            }
        })
    }

}