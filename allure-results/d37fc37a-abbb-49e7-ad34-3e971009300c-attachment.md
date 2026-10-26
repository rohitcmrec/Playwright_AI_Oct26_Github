# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\GetTest.spec.ts >> get the booking details
- Location: tests\api\GetTest.spec.ts:10:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'checkout')
```

# Test source

```ts
  1  | import { test, expect, request, APIRequestContext } from '@playwright/test'
  2  | import { APIClient } from '../../api/apiClient/APIClient'
  3  | 
  4  | 
  5  | let api: APIClient
  6  | 
  7  | test.beforeEach('', async ({ request }) => {
  8  |     api = new APIClient(request, 'https://restful-booker.herokuapp.com')
  9  | })
  10 | test('get the booking details', async ({ }) => {
  11 |     let { status, body } = await api.get('/booking/', { headers: { 'Accept': 'application/json' } })
  12 |     console.log(status);
  13 |     console.log(body);
> 14 |     expect(body.bookingdates.checkout).toBe('2019-01-01')
     |                              ^ TypeError: Cannot read properties of undefined (reading 'checkout')
  15 |     
  16 | 
  17 | 
  18 | })
```