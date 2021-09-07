const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const categorySchema = new Schema({
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
});

module.exports = mongoose.model('Category', categorySchema);
