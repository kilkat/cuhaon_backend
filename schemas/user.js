const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);
