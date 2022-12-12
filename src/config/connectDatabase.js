const mongoose = require('mongoose');
const connectDatabase = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.DB_URL, {
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
