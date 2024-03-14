const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'testpassword',
        ID_number: '123456789',
        role: 'gym_goer'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toEqual('testuser');
  });

  it('should get all users', async () => {
    // Create test users
    await User.create([
      { username: 'user1', password: 'pass1', ID_number: '123', role: 'gym_goer' },
      { username: 'user2', password: 'pass2', ID_number: '456', role: 'gym_goer' }
    ]);

    // Send request to get all users
    const res = await request(app).get('/api/users');

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2); // Assuming 2 users are created
  });

  it('should get a single user by ID', async () => {
    // Create a test user
    const newUser = await User.create({
      username: 'testuser2',
      password: 'testpassword2',
      ID_number: '987654321',
      role: 'gym_goer'
    });

    // Send request to get the user by ID
    const res = await request(app).get(`/api/users/${newUser._id}`);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('testuser2');
  });

  it('should update a user by ID', async () => {
    // Create a test user
    const newUser = await User.create({
      username: 'testuser3',
      password: 'testpassword3',
      ID_number: '111222333',
      role: 'gym_goer'
    });

    // Send request to update the user by ID
    const res = await request(app)
      .put(`/api/users/${newUser._id}`)
      .send({ username: 'updateduser' });

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('updateduser');
  });

  it('should delete a user by ID', async () => {
    // Create a test user
    const newUser = await User.create({
      username: 'testuser4',
      password: 'testpassword4',
      ID_number: '444555666',
      role: 'gym_goer'
    });

    // Send request to delete the user by ID
    const res = await request(app).delete(`/api/users/${newUser._id}`);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  // error handling, edge cases, etc.
});
