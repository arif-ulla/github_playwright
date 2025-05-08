import { test, expect } from '@playwright/test'

const baseUrl = `https://restful-booker.herokuapp.com`;

test('Test_01 - POST request and validate response', async ({ request }) => {
    const response = await request.post(`${baseUrl}/booking`, {
        data: {
            "firstname": "Testers Talk",
            "lastname": "API Tested",
            "totalprice": 1000,
            "despositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    });

    // validate status code
    //expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // validate first and last name
    expect(responseBody.data.firstname).toBe('Testers Talk');
    expect(responseBody.data.lastname).toBe('API Tested');
    
    // validate checkin and checkout dates
    expect(responseBody.data.bookingdates.checkin).toBe('2018-01-01');
    expect(responseBody.data.bookingdates.checkout).toBe('2019-01-01');
});