import request from 'supertest';
import app from '../../src/app';
import ScreenShotRepository from '../../src/repositories/ScreenShotRepository';
import ImageService from '../../src/services/ImageService';

jest.setTimeout(20000);

afterEach(async () => {
  await ScreenShotRepository.deleteAll();
});

describe('POST /screenshots/snap', () => {
  test('should respond with 200 for a valid url', async () => {
    const payload = {
      url: 'https://google.com',
    };
    const response = await request(app).post('/screenshots/snap').send(payload);
    expect(response.status).toBe(200);
  });

  test('should respond with 400 for a invalid url', async () => {
    const payload = {
      url: 'hello-world',
    };
    const response = await request(app).post('/screenshots/snap').send(payload);
    expect(response.status).toBe(400);
  });

  test('should respond with 200 with a cached response', async () => {
    const screenShot = await ScreenShotRepository.create({
      name: 'name',
      link: 'http://google.com',
      identifier: 'identifier',
    });
    const url = 'http://medium.com';
    await ImageService.setInRedis(url, screenShot.link);
    const response = await request(app).post('/screenshots/snap').send({ url });
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('cache');
  });
});

describe('GET /screenshots/:identifier', () => {
  test('should respond with 400 a non-existent-identifier', async () => {
    const response = await request(app).get('/screenshots/fake-identifier');
    expect(response.status).toBe(400);
  });

  test('should respond with 400 a non-existent-identifier', async () => {
    await ScreenShotRepository.create({
      name: 'name',
      link: 'http://google.com',
      identifier: 'identifier',
    });
    const response = await request(app).get('/screenshots/identifier');
    expect(response.status).toBe(200);
  });
});
