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
router.get('/forum/qnaBoard', isAdmin, isLoggedIn, controllers.qnaBoardPage);
router.get(
  '/members/create',
  isAdmin,
  isLoggedIn,
  controllers.membersCreatePage,
);
router.get(
  '/members/update/:userId',
  isAdmin,
  isLoggedIn,
  controllers.membersUpdatePage,
);
router.get(
  '/members/delete/:userId',
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
  '/wargame/update/wargameId',
  isAdmin,
  isLoggedIn,
  controllers.wargameUpdatePage,
);
router.get(
  '/wargame/delete/wargameId',
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
  '/forum/qnaBoard/create',
  isAdmin,
  isLoggedIn,
  controllers.qnaBaordCreatePage,
);
router.get(
  '/forum/qnaBoard/update/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.qnaBoardUpdatePage,
);
router.get(
  '/forum/qnaBoard/delete/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.qnaBoardDelete,
);
router.get('/logout', controllers.adminLogout);

router.post('/login', controllers.adminLogin);
router.post('/members/create', isAdmin, isLoggedIn, controllers.membersCreate);
router.post(
  '/members/update/:userId',
  isAdmin,
  isLoggedIn,
  controllers.membersUpdate,
);
router.post('/wargame/create', isAdmin, isLoggedIn, controllers.wargameCreate);
router.post(
  '/wargame/update/:wargameId',
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
  '/forum/qnaBoard/create',
  isAdmin,
  isLoggedIn,
  controllers.qnaBoardCreate,
);
router.post(
  '/forum/qnaBoard/update/:forumId',
  isAdmin,
  isLoggedIn,
  controllers.qnaBoardUpdate,
);

module.exports = router;
