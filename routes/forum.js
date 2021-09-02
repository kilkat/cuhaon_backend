const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
} = require('../controllers/middlewares');
const controllers = require('../controllers/forum.ctrl');

router.get('/index', controllers.forumIndexPage);

module.exports = router;
