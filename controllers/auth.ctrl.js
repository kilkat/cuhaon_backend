const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const { joinValidator } = require('./common/validator');

const join = async (req, res, next) => {
  const { email, nickname, password, cfm_password } = req.body;

  const errors = {};
  const values = { email, nickname, password, cfm_password };

  joinValidator(errors, values);

  if (!(Object.keys(errors).length === 0)) {
    return res.render('join', { errors, values });
  }

  try {
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.redirect(`/join?error=exist`);
    }
    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      nickname,
      password: hash,
    });
    return res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

const getJoin = (req, res, next) => {
  res.render('join');
};

const getLogin = (req, res, next) => {
  res.render('login');
};

module.exports = {
  join,
  login,
  logout,
  getJoin,
  getLogin,
};
