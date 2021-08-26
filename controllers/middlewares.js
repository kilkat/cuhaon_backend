const User = require('../schemas/user');
const { logger } = require('../config/winston');
const { ROLETYPE } = require('../CONSTANT/constant');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인한 상태입니다.');
  }
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user.roleType === ROLETYPE.ADMIN) {
    next();
  } else {
    res.send(
      '<script>alert("어드민이 아닙니다."); location.href="/";</script>',
    );
  }
};
