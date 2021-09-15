const Wargame = require('../schemas/wargame');
const Comment = require('../schemas/comment');
const action = require('./common/action');
const User = require('../schemas/user');
const validator = require('validator');
const Solved = require('../schemas/Solved');
const { commentSaveValidator } = require('./common/validator');
const { saveWargameValidator } = require('./common/validator');
const { logger } = require('../config/winston');
//메인페이지.
const indexPage = (req, res) => {
  res.render('index');
};

module.exports = {
  indexPage,
};
