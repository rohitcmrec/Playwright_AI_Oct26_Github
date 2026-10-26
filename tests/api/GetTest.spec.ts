import { test, expect, request, APIRequestContext } from '@playwright/test'
import { APIClient } from '../../api/apiClient/APIClient'
import { BookingResponse } from '../../api/apiClient/BookingResponse'
import { Route } from '../../api/endpoints/routes'


let api: APIClient

test.beforeEach('', async ({ request }) => {
    api = new APIClient(request, 'https://restful-booker.herokuapp.com')
})
test('get the booking details', async ({ }) => {
    let { status, body } = await api.get('/booking/10', { headers: { 'Accept': 'application/json' } })
    console.log(status);
    console.log(body);
    expect(body.bookingdates.checkout).toBe('2018-08-23')

})

test('post a request', async ({ }) => {
    let response = await api.post(Route.BOOKING,
        {
            headers:
                { 'Accept': 'application/json' },
            body: {
                "firstname": "Rohit",
                "lastname": "Agarwal",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        })
    console.log(response.status);
    let bookingResponse: BookingResponse = response.body

    console.log(bookingResponse.booking.lastname);



})