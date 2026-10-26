import { test, expect, request } from '@playwright/test'
import { APIClient } from '../../api/apiClient/APIClient'
import { BookingResponse } from '../../api/apiClient/BookingResponse'
import { Route } from '../../api/endpoints/routes'
import { BookingRequest } from '../../api/apiClient/BookingRequest'


let api: APIClient
let token: string
let bookingId: number

test.beforeEach('', async ({ request }) => {
    api = new APIClient(request, 'https://restful-booker.herokuapp.com')

    // Step 1: Get auth token
    let authResponse = await api.post('/auth', {
        headers: { 'Content-Type': 'application/json' },
        body: {
            'username': 'admin',
            'password': 'password123'
        }
    })
    token = authResponse.body.token
    console.log('Token:', token)

    // Step 2: Create a booking so we have a valid bookingId to PUT against
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

    bookingId = bookingResponse.bookingid
    console.log('Created bookingId:', bookingId)
})

test('put a request', async ({ }) => {
    console.log('--- Header being sent ---')
    console.log('Cookie:', `token=${token}`)
    console.log('PUT URL: /booking/' + bookingId)
    console.log('-------------------------')

    let response = await api.put(`/booking/${bookingId}`,
        {
            headers:
            {
                'Accept': 'application/json',
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                "firstname": "Shalu",
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

    console.log('Response status:', response.status)
    let bookingResponse: BookingRequest = response.body
    console.log('Updated lastname:', bookingResponse.firstname)

    expect(response.status).toBe(200)
    expect(bookingResponse.firstname).toBe('Shalu')
    expect(bookingResponse.lastname).toBe('Agarwal')
})