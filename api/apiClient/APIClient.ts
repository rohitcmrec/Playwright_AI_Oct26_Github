import { APIRequestContext } from "@playwright/test";
import { RequestOptions } from './RequestOptions'

export class APIClient {

    private readonly request: APIRequestContext
    private readonly baseURL: string

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request
        this.baseURL = baseURL
    }

    async get(endPoint: string, options?: RequestOptions) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, { headers: options?.headers })
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    async post(endPoint: string, options?: RequestOptions) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: options?.body,
            headers: options?.headers
        })

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    async put(endPoint: string, options: RequestOptions) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            data: options.body,
            headers: options.headers
        })
        return {
            status: response.status(),
            body: await response.json()
        }
    }
}