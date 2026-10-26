# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\GetTest.spec.ts >> get the booking details
- Location: tests\api\GetTest.spec.ts:12:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "2018-08-23"
Received: "2019-01-01"
```

# Test source

```ts
  1  | import { test, expect, request, APIRequestContext } from '@playwright/test'
  2  | import { APIClient } from '../../api/apiClient/APIClient'
  3  | import { BookingResponse } from '../../api/apiClient/BookingResponse'
  4  | import { Route } from '../../api/endpoints/routes'
  5  | 
  6  | 
  7  | let api: APIClient
  8  | 
  9  | test.beforeEach('', async ({ request }) => {
  10 |     api = new APIClient(request, 'https://restful-booker.herokuapp.com')
  11 | })
  12 | test('get the booking details', async ({ }) => {
  13 |     let { status, body } = await api.get('/booking/2299', { headers: { 'Accept': 'application/json' } })
  14 |     console.log(status);
  15 |     console.log(body);
> 16 |     expect(body.bookingdates.checkout).toBe('2018-08-23')
     |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  17 | 
  18 | })
  19 | 
  20 | test('post a request', async ({ }) => {
  21 |     let response = await api.post(Route.BOOKING,
  22 |         {
  23 |             headers:
  24 |                 { 'Accept': 'application/json' },
  25 |             body: {
  26 |                 "firstname": "Rohit",
  27 |                 "lastname": "Agarwal",
  28 |                 "totalprice": 111,
  29 |                 "depositpaid": false,
  30 |                 "bookingdates": {
  31 |                     "checkin": "2018-01-01",
  32 |                     "checkout": "2019-01-01"
  33 |                 },
  34 |                 "additionalneeds": "Breakfast"
  35 |             }
  36 |         })
  37 |     console.log(response.status);
  38 |     let bookingResponse: BookingResponse = response.body
  39 | 
  40 |     console.log(bookingResponse.booking.lastname);
  41 | 
  42 | 
  43 | 
  44 | })
```