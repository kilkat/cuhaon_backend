const express = require('express');
const router = express.Router();

const controllers = require('../controllers/index.ctrl');

const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

const authRouter = require('./auth');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
router.get('/', controllers.indexPage);
router.get('/wargame', controllers.indexWargamePage);
router.get('/wargame/create', controllers.createWargamePage);
router.post('/wargame/create', controllers.createWargame);
router.post('/wargame/update/:wargameId', controllers.updateWargame);
router.post(
  '/wargame/update/success/:wargameId',
  controllers.updateSubmitWargame,
);
router.get('/wargame/:id', controllers.viewWargamePage);
router.post('/wargame/delete/:wargameId', controllers.deleteWargame);
router.post('/wargame/:id/create/comment', controllers.createCommentWargame);
router.use('/auth', authRouter);

module.exports = router;
