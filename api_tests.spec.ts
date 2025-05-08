import { test, expect } from '@playwright/test'

test('Test_01 - GET request and store response in a variable', async ({ request }) => {
    const response = await request.get(`https://reqres.in/api/users/2`);
    // verify status code
    // expect(response.status()).toBe(200);

    // validate response text contains a given string
    const text = await response.text();
    expect(text).toContain('Janet');

    // log responseBody to console
    const responseBody = await response.json();
    console.log(responseBody);
    // validate last_name = Weaver
    expect(responseBody.data.last_name).toBe('Weaver');
});

test('Test_02 - GET request - single user not found', async ({ request }) => {
    const response = await request.get(`https://reqres.in/api/users/23`);
    // verify status code
    expect(response.status()).toBe(401);
    console.log('Single user(23) not found')
});

test('Test_03 - POST request - create a new user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        headers: {
            'X-API-KEY': 'reqres-free-v1',
            'Content-Type': 'application/json'
        },
        data: {
            "name": "Raghav",
            "job": "Teacher"
        }
    })
    expect(await response.status()).toBe(201);

    // validate createdAt is present
    const responseBody = await response.json();
    console.log(responseBody);
    // expect(responseBody.data.createdAt).toBeTruthy();
});

test('Test_04 - POST request - Validate Successful Login', async ({ request }) => {
    const response = await request.post(`https://reqres.in/api/login`, {
        headers: {
            'X-API-KEY': 'reqres-free-v1',
            'Content-Type': 'application/json'
        },
        data: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    expect(response.status()).toBe(200);
});

test('Test_05 - POST request - Validate unsuccessful Login', async ({ request }) => {
    const response = await request.post(`https://reqres.in/api/login`, {
        headers: {
            'X-API-KEY': 'reqres-free-v1',
            'Content-Type': 'application/json'
        },
        data: {
            "email": "peter@klaven"
        }
    });
    expect(response.status()).toBe(400);
});