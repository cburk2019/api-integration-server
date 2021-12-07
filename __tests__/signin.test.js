'use strict';

require('dotenv');
const SECRET = process.env.SECRET;
const supertest = require('supertest');
const server = require('../lib/server.js');
const { db } = require('../lib/model/index');
const base64 = require('base-64');
const { expect } = require('@jest/globals');

const authRequest = supertest(server.app);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Testing Auth Routes', () => {
  it('Should create a new user on POST /signup', async () => {
    let response = await authRequest.post('/signup').send({
      username: 'Joe',
      password: 'test',
    });

    expect(response.status).toBe(201);
  });

  it('Should login a user on POST /signin', async () => {
    let encodedString = base64.encode('Joe:test');

    let response = await authRequest.post('/signin').set({
      Authorization: `Basic ${encodedString}`,
    });

    expect(response.status).toBe(200);
  });
});
