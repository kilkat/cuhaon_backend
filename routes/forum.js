const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/forum.ctrl');

router.get('/index', controllers.forumIndexPage);
router.get('/ranking', controllers.forumRankingPage);
router.get('/board', controllers.forumBoard);

module.exports = router;
