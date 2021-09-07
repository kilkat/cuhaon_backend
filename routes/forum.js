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
router.get('/board', isLoggedIn, controllers.forumBoardPage);
router.get('/write/:userId', isLoggedIn, controllers.forumWritePage);
router.get('/view/:forumId', isLoggedIn, controllers.forumViewPage);

router.post('/write/:userId', isLoggedIn, controllers.forumWrite);

module.exports = router;
