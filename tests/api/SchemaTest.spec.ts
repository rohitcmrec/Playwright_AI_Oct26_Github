import Ajv from 'ajv'
import { test, expect, request } from '@playwright/test'
import { APIClient } from '../../api/apiClient/APIClient'

let api: APIClient

let bookingSchema = {
    "type": "object",
    "properties": {
        "firstname": {
            "type": "string"
        },
        "lastname": {
            "type": "string"
        },
        "totalprice": {
            "type": "integer"
        },
        "depositpaid": {
            "type": "boolean"
        },
        "bookingdates": {
            "type": "object",
            "properties": {
                "checkin": {
                    "type": "string"
                },
                "checkout": {
                    "type": "string"
                }
            },
            "required": [
                "checkin",
                "checkout"
            ]
        },
        "additionalneeds": {
            "type": "string"
        }
    },
    "required": [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates"
    ]
}

let ajv = new Ajv();

test.beforeEach('data setup', async ({ request }) => {
    api = new APIClient(request, 'https://restful-booker.herokuapp.com')
})

test('validate schema', async ({ }) => {
    let response = await api.get('/booking/10',
        {
            headers:
                { 'Accept': 'application/json' }
        })

    expect(response.status).toBe(200);
    let responseBody = response.body

    let validate = ajv.compile(bookingSchema);
    let isSchemaValid = validate(responseBody)

    if (!isSchemaValid) {
        console.log('schema error', validate.errors);
    }
    expect(isSchemaValid).toBe(true);
})