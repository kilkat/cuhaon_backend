const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const { joinValidator } = require('./common/validator');

//회원가입
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
    const exNickname = await User.findOne({ nickname });

    if (exUser || exNickname || password !== cfm_password) {
      if (exUser) errors['email'] = '이미 존재하는 계정입니다.';
      if (exNickname) errors['nickname'] = '이미 존재하는 닉네임입니다.';
      if (password !== cfm_password)
        errors['cfm_password'] = '비밀번호가 일치하지 않습니다.';
      return res.render('join', { errors, values });
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

//로그인
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

//로그아웃
const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

//회원가입 페이지
const getJoin = (req, res, next) => {
  res.render('join');
};

//로그인 페이지
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
