const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/fullstack";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfullyyyyy');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
