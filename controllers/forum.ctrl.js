const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const Wargame = require('../schemas/wargame');
const action = require('./common/action');
const { joinValidator, adminMembersValidator } = require('./common/validator');
const { logger } = require('../config/winston');
const { findOne } = require('../schemas/user');
const user = require('../schemas/user');

const forumIndexPage = async (req, res) => {
  const rank = await User.find({});

  res.render('forum/index');
};

const forumRankingPage = async (req, res) => {
  res.render('forum/ranking');
};

const forumBoard = async (req, res) => {
  res.render('forum/board');
};

module.exports = { forumIndexPage, forumRankingPage, forumBoard };
