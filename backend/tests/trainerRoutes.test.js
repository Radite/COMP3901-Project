const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Trainer = require('../models/trainerModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterEach(async () => {
  await Trainer.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Trainer Endpoints', () => {
  it('should create a new trainer', async () => {
    const res = await request(app)
      .post('/api/trainers')
      .send({
        name: 'John Doe',
        specialization: 'Fitness',
        schedule: [{ day: 'Monday', time: '10:00 AM' }]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all trainers', async () => {
    // Create some test trainers
    await Trainer.create([
      {
        name: 'Trainer 1',
        specialization: 'Weightlifting',
        schedule: [{ day: 'Tuesday', time: '11:00 AM' }]
      },
      {
        name: 'Trainer 2',
        specialization: 'Yoga',
        schedule: [{ day: 'Wednesday', time: '12:00 PM' }]
      }
    ]);

    // Send request to get all trainers
    const res = await request(app).get('/api/trainers');

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2); // Assuming 2 trainers are created
  });

  it('should get a single trainer by ID', async () => {
    // Create a test trainer
    const newTrainer = await Trainer.create({
      name: 'Trainer 3',
      specialization: 'Pilates',
      schedule: [{ day: 'Thursday', time: '1:00 PM' }]
    });

    // Send request to get the trainer by ID
    const res = await request(app).get(`/api/trainers/${newTrainer._id}`);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Trainer 3');
  });

  it('should update a trainer by ID', async () => {
    // Create a test trainer
    const newTrainer = await Trainer.create({
      name: 'Trainer 4',
      specialization: 'CrossFit',
      schedule: [{ day: 'Friday', time: '2:00 PM' }]
    });

    // Send request to update the trainer by ID
    const res = await request(app)
      .put(`/api/trainers/${newTrainer._id}`)
      .send({ specialization: 'Bootcamp' });

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body.specialization).toEqual('Bootcamp');
  });

  it('should delete a trainer by ID', async () => {
    // Create a test trainer
    const newTrainer = await Trainer.create({
      name: 'Trainer 5',
      specialization: 'HIIT',
      schedule: [{ day: 'Saturday', time: '3:00 PM' }]
    });

    // Log the new trainer object
    console.log('New Trainer:', newTrainer);

    // Send request to delete the trainer by ID
    const res = await request(app).delete(`/api/trainers/${newTrainer._id}`);

    // Log the delete response
    console.log('Delete Response:', res.body);

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Trainer deleted');

    // Check if the trainer is deleted from the database
    const deletedTrainer = await Trainer.findById(newTrainer._id);
    console.log('Deleted Trainer:', deletedTrainer);
  });
});
