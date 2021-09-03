const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/forum.ctrl');

router.get('/index', isLoggedIn, controllers.forumIndexPage);
router.get('/ranking', isLoggedIn, controllers.forumRankingPage);
router.get('/board', isLoggedIn, controllers.forumBoard);

module.exports = router;
