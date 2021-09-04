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

const forumBoardPage = async (req, res) => {
  res.render('forum/board');
};

const forumWritePage = async (req, res) => {
  res.render('forum/write');
};

const forumWrite = async (req, res) => {
  const userInfo = req.params.userId;
  const { title, content } = req.body;

  try {
    await Forum.create({
      title,
      content,
      userId: userInfo,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect('/forum/board');
};

module.exports = {
  forumIndexPage,
  forumRankingPage,
  forumBoardPage,
  forumWritePage,
  forumWrite,
};
