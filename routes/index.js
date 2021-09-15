const express = require('express');
const router = express.Router();

const controllers = require('../controllers/index.ctrl');

const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

const authRouter = require('./auth');
const adminRouter = require('./admin');
const wargameRouter = require('./wargame');
const forumRouter = require('./forum');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes 순서 바꾸기 x
router.get('/', controllers.indexPage);

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/wargame', wargameRouter);
router.use('/forum', forumRouter);

module.exports = router;
