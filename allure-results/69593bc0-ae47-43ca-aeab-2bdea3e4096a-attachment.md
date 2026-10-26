# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\GetTest.spec.ts >> get the booking details
- Location: tests\api\GetTest.spec.ts:9:5

# Error details

```
SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
```

# Test source

```ts
  1  | import { APIRequestContext } from "@playwright/test";
  2  | import { RequestOptions } from './RequestOptions'
  3  | 
  4  | export class APIClient {
  5  | 
  6  |     private readonly request: APIRequestContext
  7  |     private readonly baseURL: string
  8  | 
  9  |     constructor(request: APIRequestContext, baseURL: string) {
  10 |         this.request = request
  11 |         this.baseURL = baseURL
  12 |     }
  13 | 
  14 |     async get(endPoint: string, options?: RequestOptions) {
  15 |         let response = await this.request.get(`${this.baseURL}${endPoint}`, { headers: options?.headers })
  16 |         return {
  17 |             status: response.status(),
> 18 |             body: await response.json()
     |                   ^ SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
  19 |         }
  20 |     }
  21 | 
  22 |     async post(endPoint: string, options?: RequestOptions) {
  23 |         let response = await this.request.post(`${this.baseURL}${endPoint}`, {
  24 |             data: options?.body,
  25 |             headers: options?.headers
  26 |         })
  27 | 
  28 |         return {
  29 |             status: response.status(),
  30 |             body: await response.json()
  31 |         }
  32 |     }
  33 | }
```