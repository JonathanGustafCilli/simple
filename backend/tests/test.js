const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  test('GET /api/tasks returns an array', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/tasks creates a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ text: 'Learn testing' });
    expect(response.statusCode).toBe(201);
    expect(response.body.text).toBe('Learn testing');
    expect(response.body.done).toBe(false);
  });

  test('POST /api/tasks rejects empty text', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ text: '   ' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Text is required');
  });
});