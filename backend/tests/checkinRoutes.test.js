const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Checkin = require('../models/checkinModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterEach(async () => {
  await Checkin.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Checkin Endpoints', () => {
  it('should create a new checkin', async () => {
    // Define the checkout time
    const checkoutTime = new Date();
  
    // Define the expiration time (70 minutes after checkout time)
    const expirationTime = new Date(checkoutTime.getTime() + 70 * 60 * 1000); // Adding 70 minutes in milliseconds
  
    const res = await request(app)
      .post('/api/checkins')
      .send({
        user_id: '65e3cb66b4c081eda1abc6ce', // Replace with actual user ID
        checkout_time: checkoutTime.toISOString(), // Convert checkout time to ISO string format
        expiration_time: expirationTime.toISOString() // Convert expiration time to ISO string format
      });
  
    if (res.statusCode !== 201) {
      console.error('Error creating checkin:', res.body);
    }
  
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
  

  it('should get all checkins', async () => {
    await Checkin.create([
      {
        user_id: '65e3cb66b4c081eda1abc6ce',
        checkout_time: new Date(),
        expiration_time: new Date(Date.now() + 86400000)
      },
      {
        user_id: '65e3cb66b4c081eda1abc6cf',
        checkout_time: new Date(),
        expiration_time: new Date(Date.now() + 86400000)
      }
    ]);

    const res = await request(app).get('/api/checkins');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get a single checkin by ID', async () => {
    const newCheckin = await Checkin.create({
      user_id: '65e3cb66b4c081eda1abc6ce',
      checkout_time: new Date(),
      expiration_time: new Date(Date.now() + 86400000)
    });

    const res = await request(app).get(`/api/checkins/${newCheckin._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', newCheckin._id.toString());
  });

  it('should update a checkin by ID', async () => {
    const newCheckin = await Checkin.create({
      user_id: '65e3cb66b4c081eda1abc6ce',
      checkout_time: new Date(),
      expiration_time: new Date(Date.now() + 86400000)
    });

    const res = await request(app)
      .put(`/api/checkins/${newCheckin._id}`)
      .send({ checkout_time: new Date() });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('checkout_time', newCheckin.checkout_time.toISOString());
  });

  it('should delete a checkin by ID', async () => {
    const newCheckin = await Checkin.create({
      user_id: '65e3cb66b4c081eda1abc6ce',
      checkout_time: new Date(),
      expiration_time: new Date(Date.now() + 86400000)
    });

    const res = await request(app).delete(`/api/checkins/${newCheckin._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Checkin deleted successfully');
  });
});
