const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const ExerciseLibrary = require('../models/exerciseLibraryModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterEach(async () => {
  await ExerciseLibrary.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Exercise Library Endpoints', () => {
  it('should create a new exercise', async () => {
    const res = await request(app)
      .post('/api/exerciseLibrary')
      .send({
        name: 'Exercise 1',
        description: 'Description for Exercise 1',
        video_url: 'https://www.example.com/exercise1'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all exercises', async () => {
    await ExerciseLibrary.create([
      {
        name: 'Exercise 1',
        description: 'Description for Exercise 1',
        video_url: 'https://www.example.com/exercise1'
      },
      {
        name: 'Exercise 2',
        description: 'Description for Exercise 2',
        video_url: 'https://www.example.com/exercise2'
      }
    ]);

    const res = await request(app).get('/api/exerciseLibrary');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get a single exercise by ID', async () => {
    const newExercise = await ExerciseLibrary.create({
      name: 'Exercise 3',
      description: 'Description for Exercise 3',
      video_url: 'https://www.example.com/exercise3'
    });

    const res = await request(app).get(`/api/exerciseLibrary/${newExercise._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', newExercise._id.toString());
  });

  it('should update an exercise by ID', async () => {
    const newExercise = await ExerciseLibrary.create({
      name: 'Exercise 4',
      description: 'Description for Exercise 4',
      video_url: 'https://www.example.com/exercise4'
    });

    const res = await request(app)
      .put(`/api/exerciseLibrary/${newExercise._id}`)
      .send({ description: 'Updated description for Exercise 4' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('description', 'Updated description for Exercise 4');
  });

  it('should delete an exercise by ID', async () => {
    const newExercise = await ExerciseLibrary.create({
      name: 'Exercise 5',
      description: 'Description for Exercise 5',
      video_url: 'https://www.example.com/exercise5'
    });

    const res = await request(app).delete(`/api/exerciseLibrary/${newExercise._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Exercise deleted successfully');
  });
});
