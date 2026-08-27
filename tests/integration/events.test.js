const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
jest.setTimeout(15000);

describe('Events API', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/events should return 200 and an array of events', async () => {
    const response = await request(app)
      .get('/api/events');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/events without authentication should return 401', async () => {
  const response = await request(app)
    .post('/api/events')
    .send({
      title: 'Test Event',
      category: '6a8e03e81aefca46621f66a9',
      date: '2026-12-01',
      capacity: 100,
      description: 'Test event description',
      city: 'Cairo',
      venue: 'Test Venue'
    });

  expect(response.statusCode).toBe(401);
  });

  test('POST /api/events with missing required fields should return 422', async () => {
  const response = await request(app)
    .post('/api/events')
    .set('Authorization', 'Bearer invalid-token')
    .send({
      title: '',
      category: 'wrong-id',
      date: 'wrong-date',
      capacity: 0
    });

  expect(response.statusCode).toBe(422);
  });
});