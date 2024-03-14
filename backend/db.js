const mongoose = require('mongoose')

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/GymManagement';

// Connect to MongoDB

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Export the Mongoose connection
module.exports = mongoose.connection;