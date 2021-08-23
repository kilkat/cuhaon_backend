const express = require('express');
const router = express.Router();

const controllers = require('../controllers/index.ctrl');

const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

const authRouter = require('./auth');
const adminRouter = require('./admin');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes 순서 바꾸기 x
router.get('/', controllers.indexPage);
router.get('/wargame', controllers.indexWargamePage);
router.get('/wargame/create', isLoggedIn, controllers.createWargamePage);
router.post('/wargame/create', isLoggedIn, controllers.createWargame);
router.post(
  '/wargame/update/:wargameId',
  isLoggedIn,
  controllers.updateWargame,
);
router.post(
  '/wargame/update/success/:wargameId',
  isLoggedIn,
  controllers.updateSubmitWargame,
);
router.get('/wargame/:id', controllers.viewWargamePage);
router.post(
  '/wargame/delete/:wargameId',
  isLoggedIn,
  controllers.deleteWargame,
);
router.post(
  '/wargame/viewFlag/:wargameId/:nickname', // 수정
  isLoggedIn,
  controllers.checkFlagWargame,
);
router.post(
  '/wargame/:id/create/comment',
  isLoggedIn,
  controllers.createCommentWargame,
);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);

module.exports = router;
