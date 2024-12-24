const { test, expect } = require('@playwright/test');

/*
I've added mongoDB local tests as I found with free API websites online 
there was missing functionality to be able to add POST request where data actually persists
and therefore you can't validate a GET request to confirm the previous POST request.
*/

test.describe('local tests using MongoDB', () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    await request.post('http://localhost:3000/register', {
      data: {
        username: 'johnnyle_easygo',
        password: 'easygo123'
      }
    });

    const loginResponse = await request.post('http://localhost:3000/login', {
      data: {
        username: 'johnnyle_easygo',
        password: 'easygo123'
      }
    });
    const loginBody = await loginResponse.json();
    authToken = loginBody.token;
  });

  test('should successfully make POST request to add user', async ({ request }) => {
    const postResponse = await request.post('http://localhost:3000/add-user', {
      data: { name: 'Johnny', age: 27 },
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    expect(postResponse.ok()).toBeTruthy();
    const postResponseBody = await postResponse.json();
    expect(postResponseBody.success).toBe(true);
    expect(postResponseBody.id).toBeTruthy();
    });

  test('should successfully make GET request to retrieve the recently created user', async ({ request }) => {
    const getResponse = await request.get('http://localhost:3000/get-user/Johnny', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.name).toBe('Johnny');
    expect(getResponseBody.age).toBe(27);
  });

  test('should return 404 for GET request when user does not exist', async ({ request }) => {
    const getResponse = await request.get('http://localhost:3000/get-user/otheruser', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(getResponse.status()).toBe(404);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.success).toBe(false);
    expect(getResponseBody.message).toBe('User not found');
  });

  test('should return 401 when no token is provided', async ({ request }) => {
    const getResponse = await request.get('http://localhost:3000/get-user/Johnny');
    expect(getResponse.status()).toBe(401);
    const responseBody = await getResponse.json();
    expect(responseBody.error).toBe('Authentication token is required');
  });

  test('should return 403 when invalid token is provided', async ({ request }) => {
    const getResponse = await request.get('http://localhost:3000/get-user/Johnny', {
      headers: {
        'Authorization': 'Bearer 1234'
      }
    });
    expect(getResponse.status()).toBe(403);
    const responseBody = await getResponse.json();
    expect(responseBody.error).toBe('Invalid token');
  });

  test('should return 401 for invalid login', async ({ request }) => {
    const loginResponse = await request.post('http://localhost:3000/login', {
      data: {
        username: 'johnnyle_easygo',
        password: 'wrongpassword'
      }
    });

    expect(loginResponse.status()).toBe(401);
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody.error).toBe('Invalid credentials');
  });

  test('should return 400 error for taken username', async ({ request }) => {
    const resisterResponse = await request.post('http://localhost:3000/register', {
      data: {
        username: 'johnnyle_easygo',
        password: 'password123'
      }
    });

    expect(resisterResponse.status()).toBe(400);
    const registerResponseBody = await resisterResponse.json();
    expect(registerResponseBody.error).toBe('Username already exists');
  });
  
});