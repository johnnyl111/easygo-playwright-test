const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
  let authorisationToken;

  test('should successfully obtain authorisation token', async () => {
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    
      const data = await response.json();
      authorisationToken = data.token;
      expect(authorisationToken).toBeDefined();
  })

  test('should return 400 error when no password provided', async () => {
    const response = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'johnnyle@easygo.com.au',
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    expect(response.status).toBe(400);
  });

  test('should handle create user POST request', async () => {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Johnny Le',
        job: 'Quality Engineer'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorisationToken}`
      }
    });

    const userData = await response.json();
    expect(response.status).toBe(201);
    expect(userData.name).toBe('Johnny Le');
    expect(userData.job).toBe('Quality Engineer');
  });

});

test.describe('API Tests POST then GET', () => {
    test('should return successful 200 response', async ({ request }) => {
        const response = await request.fetch('https://postman-echo.com/get?employee=johnny')
        expect(response.status()).toBe(200);
    });
    
    test('should successfully send a POST request', async ({ request }) => {
        const postResponse = await request.post('https://postman-echo.com/post', {
        data: {
            employee: 'Johnny Le',
            position: 'Quality Engineer'
        }
        });
        expect(postResponse.status()).toBe(200);
    
        const postResponseBody = await postResponse.json();
        expect(postResponseBody.json).toEqual({
        employee: 'Johnny Le',
        position: 'Quality Engineer'
        });
    })

    
    test('should successfully send GET request ', async ({ request }) => {
        const getResponse = await request.get('https://postman-echo.com/get?employee=Johnny%20Le&position=Quality%20Engineer');
        expect(getResponse.status()).toBe(200);
        const getResponseBody = await getResponse.json();
        expect(getResponseBody.args).toEqual({
            employee: 'Johnny Le',
            position: 'Quality Engineer'
        });
    });

    test('should fail send GET request ', async ({ request }) => {
        const getResponse = await request.get('https://postman-echo.com/get?employee=Johnny%20L&position=Quality%20Engineer');
        expect(getResponse.status()).toBe(200);
        const getResponseBody = await getResponse.json();
    });
    
});

