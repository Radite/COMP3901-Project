const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterEach(async () => {
  await Workout.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

const userId = '65e3d2e7b4c081eda1abc6d1'; // Replace this with the actual _id of the user

describe('Workout Endpoints', () => {
  it('should create a new workout', async () => {
    const workoutData = {
      user_id: userId,
      date: '2024-03-04T10:00:00Z',
      exercises: [
        { name: 'Exercise 1', sets: [{ reps: 10, weight: 100 }, { reps: 8, weight: 120 }] },
        { name: 'Exercise 2', sets: [{ reps: 12, weight: 80 }] }
      ]
    };
  
    const res = await request(app)
      .post('/api/workouts')
      .send(workoutData);
      
  
      console.log('Response Body:', res.body); // Log the response body
  
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all workouts', async () => {
    await Workout.create([
      {
        user: userId,
        date: '2024-03-01T10:00:00Z',
        exercises: [{ name: 'Exercise A', sets: [{ reps: 10, weight: 100 }] }]
      },
      {
        user: userId,
        date: '2024-03-02T10:00:00Z',
        exercises: [{ name: 'Exercise B', sets: [{ reps: 12, weight: 80 }] }]
      }
    ]);

    const res = await request(app).get('/api/workouts');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get a single workout by ID', async () => {
    const newWorkout = await Workout.create({
      user: userId,
      date: '2024-03-03T10:00:00Z',
      exercises: [{ name: 'Exercise C', sets: [{ reps: 8, weight: 90 }] }]
    });

    const res = await request(app).get(`/api/workouts/${newWorkout._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', newWorkout._id.toString());
  });

  it('should update a workout by ID', async () => {
    const newWorkout = await Workout.create({
      user: userId,
      date: '2024-03-04T10:00:00Z',
      exercises: [{ name: 'Exercise D', sets: [{ reps: 10, weight: 100 }] }]
    });

    const res = await request(app)
      .put(`/api/workouts/${newWorkout._id}`)
      .send({ date: '2024-03-05T10:00:00Z' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('date', '2024-03-05T10:00:00.000Z');
  });

  it('should delete a workout by ID', async () => {
    const newWorkout = await Workout.create({
      user: userId,
      date: '2024-03-06T10:00:00Z',
      exercises: [{ name: 'Exercise E', sets: [{ reps: 8, weight: 90 }] }]
    });

    const res = await request(app).delete(`/api/workouts/${newWorkout._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Workout deleted successfully');
  });
});
