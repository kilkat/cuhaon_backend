const express = require('express');
const router = express.Router();

const controllers = require('../controllers/wargame.ctrl');

const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

router.get('/', controllers.wargameIndexPage);
router.get('/create', isLoggedIn, controllers.wargameCreatePage);
router.post('/create', isLoggedIn, controllers.wargameCreate);
router.post('/update/:wargame_id', isLoggedIn, controllers.wargameUpdate);
router.post(
  '/update/success/:wargame_id',
  isLoggedIn,
  controllers.wargameUpdateSubmit,
);
router.get('/:wargame_id', controllers.wargameViewPage);
router.post('/delete/:wargame_id', isLoggedIn, controllers.wargameDelete);
router.post('/checkflag/:wargame_id', isLoggedIn, controllers.wargameCheckFlag);
router.post(
  '/:wargame_id/create/comment',
  isLoggedIn,
  controllers.wargameCreateComment,
);

module.exports = router;
