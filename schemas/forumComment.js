const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const forumCommentSchema = new Schema({
  comment: {
    type: String,
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
  forumId: {
    type: ObjectId,
    require: true,
    ref: 'Wargame',
  },
});

module.exports = mongoose.model('ForumComment', forumCommentSchema); //Comment exports해주는 이름으로 불러와야함
