const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/admin.ctrl');

router.get('/login', controllers.getAdminLogin);
router.get('/members', isAdmin, controllers.membersBoard);
router.get('/wargame', isAdmin, controllers.wargameBoardPage);
router.get('/members/create', isAdmin, controllers.membersCreatePage);
router.get('/members/update/:_id', isAdmin, controllers.membersUpdatePage);
router.get('/members/delete/:_id', isAdmin, controllers.membersDelete);
router.get('/wargame/create', isAdmin, controllers.wargameCreatePage);
router.get('/wargame/update/:_id', isAdmin, controllers.wargameUpdatePage);
router.get('/wargame/delete/:_id', isAdmin, controllers.wargameDelete);
router.get('/logout', controllers.adminLogout);

router.post('/login', controllers.adminLogin);
router.post('/members/create', isAdmin, controllers.membersCreate);
router.post('/members/update/:_id', isAdmin, controllers.membersUpdate);
router.post('/wargame/create', isAdmin, controllers.wargameCreate);
router.post('/wargame/update/:_id', isAdmin, controllers.wargameUpdate);

module.exports = router;
