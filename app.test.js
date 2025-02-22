const request = require('supertest');
const app = require('../app'); // Import app.js from the same directory

describe('/testNode endpoint', () => {
    it('should return a response', async () => {
        const response = await request.get('/testNode');
        expect(response.status).toBe(200); // Check the HTTP status code
        expect(response.text).toBe('Yes the testNode endpoint worked'); // Ensure the test matches the app's response
    });
});
