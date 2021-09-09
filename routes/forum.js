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
router.get('/freeBoard', isLoggedIn, controllers.forumFreeBoardPage);
router.get('/QnABoard', isLoggedIn, controllers.forumQnABoardPage);
router.get(
  '/freeBoard/write/:userId',
  isLoggedIn,
  controllers.forumFreeBoardWritePage,
);
router.get(
  '/QnABoard/write/:userId',
  isLoggedIn,
  controllers.forumQnABoardWritePage,
);
router.get('/view/:forumId', isLoggedIn, controllers.forumViewPage);

router.post(
  '/freeBoard/write/:userId',
  isLoggedIn,
  controllers.forumFreeBoardWrite,
);
router.post(
  '/QnABoard/write/:userId',
  isLoggedIn,
  controllers.forumQnABoardWrite,
);
router.post(
  '/view/comment/create/:forumId',
  isLoggedIn,
  controllers.forumCommentCreate,
);

module.exports = router;
