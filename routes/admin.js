const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/admin.ctrl');

router.get('/login', controllers.AdminLoginPage);
router.get('/members', isAdmin, isLoggedIn, controllers.membersBoardPage);
router.get('/wargame', isAdmin, isLoggedIn, controllers.wargameBoardPage);
router.get(
  '/forum/freeBoard',
  isAdmin,
  isLoggedIn,
  controllers.forumFreeBoardPage,
);
router.get(
  '/forum/QnABoard',
  isAdmin,
  isLoggedIn,
  controllers.forumQnABoardPage,
);
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

module.exports = router;
