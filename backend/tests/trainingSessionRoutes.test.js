const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const TrainingSession = require('../models/trainingSessionModel');

// Replace 
const trainerId = '65e3c99fb4c081eda1abc6cb';
const userId = '65e3c1d8b4c081eda1abc6ca'; 


beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterEach(async () => {
  await TrainingSession.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Training Session Endpoints', () => {
  it('should create a new training session', async () => {
    const res = await request(app)
      .post('/api/trainingsessions')
      .send({
        trainer: trainerId,
        user: userId,
        time: '2024-03-04T10:00:00Z'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all training sessions', async () => {
    await TrainingSession.create([
      {
        trainer: trainerId,
        user: userId,
        time: '2024-03-01T10:00:00Z'
      },
      {
        trainer: trainerId,
        user: userId,
        time: '2024-03-02T10:00:00Z'
      }
    ]);

    const res = await request(app).get('/api/trainingsessions');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get a single training session by ID', async () => {
    const newSession = await TrainingSession.create({
      trainer: trainerId,
      user: userId,
      time: '2024-03-03T10:00:00Z'
    });

    const res = await request(app).get(`/api/trainingsessions/${newSession._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', newSession._id.toString());
  });

  it('should update a training session by ID', async () => {
    const newSession = await TrainingSession.create({
      trainer: trainerId,
      user: userId,
      time: '2024-03-04T10:00:00Z'
    });

    const res = await request(app)
      .put(`/api/trainingsessions/${newSession._id}`)
      .send({ time: '2024-03-05T10:00:00Z' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('time', '2024-03-05T10:00:00.000Z');
  });

  it('should delete a training session by ID', async () => {
    const newSession = await TrainingSession.create({
      trainer: trainerId,
      user: userId,
      time: '2024-03-06T10:00:00Z'
    });

    const res = await request(app).delete(`/api/trainingsessions/${newSession._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Training session deleted successfully');
  });
});
