'use strict';

const { db, Users } = require('../lib/model');

beforeAll( async () => {
  await db.sync();
});
afterAll( async () => {
  await db.drop();
});

describe('Testing Server CRUD', () => {

  let testUser = { username: 'Test User', password: 'testpassword', id: null };

  it('Should be able to create a user with hashed password and a signed token', async () => {
    let newUser = await Users.create(testUser);
    expect(newUser.username).toBe(testUser.username);
    expect(newUser.password).not.toBe(testUser.password);
    expect(newUser.role).toBe('user');
    expect(newUser.token).toBeTruthy();

    testUser.id = newUser.id;
  });

  it('Should be able to find a row with test username', async () => {
    let userQuery = await Users.findOne({ where: { username: testUser.username }});

    expect(userQuery.username).toBe(testUser.username);
    expect(userQuery.password).not.toBe(testUser.password);
  });

  it('Should be able to update a user row', async () => {
    await Users.update({username: 'Test User 2'},{ where: { id: testUser.id }});
    let userQuery = await Users.findOne({ where: { username: 'Test User 2'}});

    expect(userQuery.username).toBe('Test User 2');
    expect(userQuery.password).not.toBe(testUser.password);
  });

  it('Should be able to remove a user row', async () => {
    await Users.destroy({ where: { id: testUser.id }});
    let userQuery = await Users.findOne({ where: { username: 'new test user'}});
    
    expect(userQuery).toBe(null);
  });
});
