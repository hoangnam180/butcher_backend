const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    trim: true,
    minlength: 3,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    required: [true, 'Email is required'],
  },
  role: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
