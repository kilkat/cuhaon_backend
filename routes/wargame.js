const express = require('express');
const router = express.Router();

const controllers = require('../controllers/wargame.ctrl');

const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

router.get('/', controllers.wargameIndexPage);
router.get('/create', isLoggedIn, controllers.wargameCreatePage);
router.post('/create', isLoggedIn, controllers.wargameCreate);
router.post('/update/:wargameId', isLoggedIn, controllers.wargameUpdate);
router.post(
  '/update/success/:wargameId',
  isLoggedIn,
  controllers.wargameUpdateSubmit,
);
router.get('/:wargameId', controllers.wargameViewPage);
router.post('/delete/:wargameId', isLoggedIn, controllers.wargameDelete);
router.post('/checkflag/:wargameId', isLoggedIn, controllers.wargameCheckFlag);
router.post(
  '/:wargameId/create/comment',
  isLoggedIn,
  controllers.wargameCreateComment,
);

module.exports = router;
