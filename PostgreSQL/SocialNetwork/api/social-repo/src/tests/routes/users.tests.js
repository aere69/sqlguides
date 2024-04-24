const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/user-repo');
const pool = require('../../pool');
const Context = require('../context');

let context;
beforeAll(async () => {
    context = await Context.build();
});

beforeEach(async () => {
    await context.reset();
});

afterAll(() => {
    return context.close();
});

it('create user', async () => {
    const startingCount = await UserRepo.count();

    await request(buildApp())
        .post('/users')
        .send({username: 'testUser', bio: 'The testUser bio'})
        .expect(200);

    const endingCount = await UserRepo.count();
    expect (endingCount - startingCount).toEqual(1);
});