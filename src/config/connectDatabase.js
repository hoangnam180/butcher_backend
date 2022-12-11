const mongoose = require('mongoose');
const url =
  process.env.DB_URL ||
  `mongodb+srv://butcher.n078oev.mongodb.net/retryWrites=true&w=majority`;
const connectDatabase = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('Database connection error: ' + err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
  });
};
module.exports = connectDatabase;
