'use strict';

process.env.SECRET = 'secret';

const app = require('../lib/server.js');
const supertest = require('supertest');
const server = supertest(app.app);
const jwt = require('jsonwebtoken');

const { db, Users } = require('../lib/model');

const bearerAuth = require('../lib/middleware/bearer.js');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  user: { username: 'user', password: 'password', role: 'user' },
};

describe('Auth Router', () => {

  it('can add an item to the DB if user has create permissions', async () => {
    const user = await Users.create(users['admin']);
    let req = {
      headers: {
        authorization: `Bearer: ${user.token}`
      }
    };
    let res = {
      status: () => {
        return {
          send: () => jest.fn()
        }
      }
    };

    let next = jest.fn();
    await bearerAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
