# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\PutTest.spec.ts >> put a request
- Location: tests\api\PutTest.spec.ts:22:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'lastname')
```

# Test source

```ts
  1  | import { test, expect, request } from '@playwright/test'
  2  | import { APIClient } from '../../api/apiClient/APIClient'
  3  | import { BookingResponse } from '../../api/apiClient/BookingResponse'
  4  | import { Route } from '../../api/endpoints/routes'
  5  | 
  6  | 
  7  | let api: APIClient
  8  | let token: string
  9  | 
  10 | test.beforeEach('', async ({ request }) => {
  11 |     api = new APIClient(request, 'https://restful-booker.herokuapp.com')
  12 |     let authResponse = await api.post('/auth', {
  13 |         headers: { 'Content-Type': 'application/json' },
  14 |         body: {
  15 |             'username': 'admin',
  16 |             'password': 'password123'
  17 |         }
  18 |     })
  19 |     token = await authResponse.body.token
  20 | })
  21 | 
  22 | test('put a request', async ({ }) => {
  23 |     let response = await api.put('/booking/2299',
  24 |         {
  25 |             headers:
  26 |             {
  27 |                 'Accept': 'application/json',
  28 |                 'Cookie': `token=${token}`
  29 |             },
  30 |             body: {
  31 |                 "firstname": "Rohit",
  32 |                 "lastname": "Agarwal",
  33 |                 "totalprice": 111,
  34 |                 "depositpaid": false,
  35 |                 "bookingdates": {
  36 |                     "checkin": "2018-01-01",
  37 |                     "checkout": "2019-01-01"
  38 |                 },
  39 |                 "additionalneeds": "Breakfast"
  40 |             }
  41 |         })
  42 |     console.log(response.status);
  43 |     let bookingResponse: BookingResponse = response.body
  44 | 
> 45 |     console.log(bookingResponse.booking.lastname);
     |                                         ^ TypeError: Cannot read properties of undefined (reading 'lastname')
  46 | 
  47 | 
  48 | 
  49 | })
```