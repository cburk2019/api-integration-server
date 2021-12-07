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
  // done();
});

afterAll(async () => {
  await db.drop();
  // done();
});

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  user: { username: 'user', password: 'password', role: 'user' },
};

describe('Auth Router', () => {

  it('can add an item to the DB if user has create permissions', async () => {
    const user = await Users.create(users['admin']);
    // test bearerAuth
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

    // const token = jwt.sign(users['admin'], process.env.SECRET);
    // await server.post('/signup').send(users['writer']);

    // const body = {};

    // const res = await server.post('/api/test')
    //   .set('Authorization', 'Bearer ' + token).send(body)

    // expect(res.statusCode).toBe(201);
    // expect(res.body).toBe(body);

    // const token2 = jwt.sign(users['user'], process.env.SECRET);
    // await server.post('/signup').send(users['user']);

    // const res2 = await server.post('/api/test')
    //   .set('Authorization', 'Bearer ' + token2).send(body)

    // expect(res2.statusCode).toBe(500);

  });

  // it('can get if user has read permissions =', async (done) => {
  //   const body = {};

  //   const token = jwt.sign(users['user'], process.env.SECRET);

  //   const res = await server.get('/signup').set('Authorization', 'Bearer ' + token);

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toBe(body);

  // });

});
