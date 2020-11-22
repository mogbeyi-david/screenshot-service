import request from 'supertest';
import app from '../../src/app';

describe('Index Routes', () => {
  describe('Root path (GET /)', () => {
    test('should respond with 200', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('Test 404 Route', () => {
    test('should respond with 400', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(400);
    });
  });

  describe('Test Error Handling', () => {
    test('should respond with 500', async () => {
      const response = await request(app).get('/test-failure');
      expect(response.status).toBe(500);
    });
  });
});
