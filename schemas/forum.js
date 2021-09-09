const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const forumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: false,
    default: 0,
  },
  category: {
    type: Number,
    required: true,
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
