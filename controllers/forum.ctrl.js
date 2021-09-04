const User = require('../schemas/user');
const Forum = require('../schemas/forum');
const action = require('./common/action');
const { logger } = require('../config/winston');
const { findOne } = require('../schemas/user');
const user = require('../schemas/user');

const forumIndexPage = async (req, res) => {
  const rank = await User.find().sort({ point: -1 }).limit(3);

  res.render('forum/index', { rank });
};

const forumRankingPage = async (req, res) => {
  const rank = await User.find().sort({ point: -1 });

  res.render('forum/ranking', { rank });
};

const forumBoard = async (req, res) => {
  res.render('forum/board');
};

const forumWrite = async (req, res) => {
  res.render('forum/write');
};

module.exports = { forumIndexPage, forumRankingPage, forumBoard, forumWrite };
