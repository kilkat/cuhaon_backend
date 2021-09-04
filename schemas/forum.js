const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const forumSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: false,
    default: 0,
  },
  solved: {
    type: Number,
    required: false,
    default: 0,
  },
  point: {
    type: Number,
    required: true,
    default: 0,
  },
  flag: {
    type: String,
    required: true,
    unique: false,
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
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Forum', forumSchema);
