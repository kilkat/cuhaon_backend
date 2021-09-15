const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/forum.ctrl');

router.get('/', isLoggedIn, controllers.forumIndexPage);
router.get('/ranking', isLoggedIn, controllers.forumRankingPage);
router.get('/freeBoard', isLoggedIn, controllers.forumfreeBoardPage);
router.get('/qnaBoard', isLoggedIn, controllers.forumqnaBoardPage);
router.get(
  '/freeBoard/write/:userId',
  isLoggedIn,
  controllers.forumfreeBoardWritePage,
);
router.get(
  '/qnaBoard/write/:userId',
  isLoggedIn,
  controllers.forumqnaBoardWritePage,
);
router.get('/view/:forumId', isLoggedIn, controllers.forumViewPage);
router.get('/view/edit/:forumId', isLoggedIn, controllers.forumViewEditPage);
router.get('/view/delete/:forumId', isLoggedIn, controllers.forumViewDelete);

router.post(
  '/freeBoard/write/:userId',
  isLoggedIn,
  controllers.forumfreeBoardWrite,
);
router.post(
  '/qnaBoard/write/:userId',
  isLoggedIn,
  controllers.forumqnaBoardWrite,
);
router.post(
  '/view/comment/create/:forumId',
  isLoggedIn,
  controllers.forumCommentCreate,
);
router.post('/view/edit/:forumId', isLoggedIn, controllers.forumViewEdit);

module.exports = router;
