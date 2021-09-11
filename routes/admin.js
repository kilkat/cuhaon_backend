const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/admin.ctrl');

//params: _id -> userId 이런식으로 맞출것
router.get('/login', controllers.AdminLoginPage);
router.get('/members', isAdmin, isLoggedIn, controllers.membersBoardPage);
router.get('/wargame', isAdmin, isLoggedIn, controllers.wargameBoardPage);
router.get('/forum/freeBoard', isAdmin, isLoggedIn, controllers.FreeBoardPage);
router.get('/forum/QnABoard', isAdmin, isLoggedIn, controllers.QnABoardPage);
router.get(
  '/members/create',
  isAdmin,
  isLoggedIn,
  controllers.membersCreatePage,
);
router.get(
  '/members/update/:_id',
  isAdmin,
  isLoggedIn,
  controllers.membersUpdatePage,
);
router.get(
  '/members/delete/:_id',
  isAdmin,
  isLoggedIn,
  controllers.membersDelete,
);
router.get(
  '/wargame/create',
  isAdmin,
  isLoggedIn,
  controllers.wargameCreatePage,
);
router.get(
  '/wargame/update/:_id',
  isAdmin,
  isLoggedIn,
  controllers.wargameUpdatePage,
);
router.get(
  '/wargame/delete/:_id',
  isAdmin,
  isLoggedIn,
  controllers.wargameDelete,
);
router.get(
  '/forum/freeBoard/create',
  isAdmin,
  isLoggedIn,
  controllers.freeBoardCreatePage,
);
router.get(
  '/forum/freeBoard/update/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.freeBoardUpdatePage,
);
router.get(
  '/forum/freeBoard/delete/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.freeBoardDelete,
);
router.get(
  '/forum/QnABoard/create',
  isAdmin,
  isLoggedIn,
  controllers.QnABaordCreatePage,
);
router.get(
  '/forum/QnABoard/update/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.QnABoardUpdatePage,
);
router.get('/logout', controllers.adminLogout);

router.post('/login', controllers.adminLogin);
router.post('/members/create', isAdmin, isLoggedIn, controllers.membersCreate);
router.post(
  '/members/update/:_id',
  isAdmin,
  isLoggedIn,
  controllers.membersUpdate,
);
router.post('/wargame/create', isAdmin, isLoggedIn, controllers.wargameCreate);
router.post(
  '/wargame/update/:_id',
  isAdmin,
  isLoggedIn,
  controllers.wargameUpdate,
);
router.post(
  '/forum/freeBoard/create',
  isAdmin,
  isLoggedIn,
  controllers.freeBoardCreate,
);
router.post(
  '/forum/freeBoard/update/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.freeBoardUpdate,
);
router.post(
  '/forum/QnABoard/create',
  isAdmin,
  isLoggedIn,
  controllers.QnABoardCreate,
);
router.post(
  '/forum/QnABoard/update/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.QnABoardUpdate,
);

module.exports = router;
