const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const Wargame = require('../schemas/wargame');
const action = require('./common/action');
const Forum = require('../schemas/forum');
const { joinValidator, adminMembersValidator } = require('./common/validator');
const { logger } = require('../config/winston');
const { findOne, create } = require('../schemas/user');
const user = require('../schemas/user');
const ForumComment = require('../schemas/forumComment');

const adminLogin = (req, res, next) => {
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
      return res.redirect('/admin/members');
    });
  })(req, res, next);
};

const AdminLoginPage = (req, res, next) => {
  res.render('admin/login');
};

const membersBoardPage = async (req, res) => {
  let userCount = req.query.nickname;
  let emptySearch = false;
  try {
    //페이징 구문
    const totalUser = await User.countDocuments({
      nickname: action.searchKeyword(req.query.nickname),
    });
    if (!totalUser) {
      emptySearch = true;
    }
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 5),
      totalUser,
    );

    //유저 출력
    const user = await User.find({
      nickname: action.searchKeyword(req.query.nickname),
    })
      .sort({ createAt: -1 })
      .skip(hide_post)
      .limit(limit);

    res.render('admin/members/index', {
      emptySearch,
      userCount,
      user,
      paging: {
        currentPage: current_page,
        totalPage: total_page,
        limit,
      },
    });
  } catch (error) {
    res.render('admin/members/index', {
      emptySearch: true,
      userCount: 0,
      user: [],
      paging: {
        currentPage: 1,
        totalPage: 1,
        limit: 5,
      },
    });
  }
};

const wargameBoardPage = async (req, res) => {
  let titleCount = req.query.title;
  let emptySearch = false;

  try {
    //페이징 구문
    const totalPost = await Wargame.countDocuments({
      title: action.searchKeyword(req.query.title),
    });
    if (!totalPost) {
      emptySearch = true;
    }
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 7),
      totalPost,
    );

    //게시물 출력
    const wargamePost = await Wargame.find({
      title: action.searchKeyword(req.query.title),
    })
      .populate('userId', 'email nickname createdAt')
      .sort({ createAt: -1 })
      .skip(hide_post)
      .limit(limit);

    //페이지 랜더링
    res.render('admin/wargame/index', {
      emptySearch,
      titleCount,
      posts: wargamePost,
      paging: {
        currentPage: current_page,
        totalPage: total_page,
        limit,
      },
    });
  } catch (error) {
    res.render('admin/wargame/index', {
      emptySearch: true,
      titleCount: 0,
      posts: [],
      paging: {
        currentPage: 1,
        totalPage: 1,
        limit: 10,
      },
    });
  }
};

const FreeBoardPage = async (req, res) => {
  try {
    //검색
    let search_box = req.query.search_box;
    //페이징 구문
    const totalPost = await Forum.countDocuments({
      title: action.searchKeyword(req.query.search_box),
      category: 0,
    });

    if (!totalPost) {
      emptySearch = true;
    }
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 5),
      totalPost,
    );

    //게시물 출력
    const forumPost = await Forum.find({
      title: action.searchKeyword(req.query.search_box),
      category: 0,
    })
      .populate('userId', 'nickname')
      .sort({ createdAt: -1 })
      .skip(hide_post)
      .limit(limit);

    res.render('admin/forum/freeBoard/index', {
      search_box,
      posts: forumPost,
      paging: {
        currentPage: current_page,
        totalPage: total_page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const qnaBoardPage = async (req, res) => {
  try {
    //검색
    let search_box = req.query.search_box;
    //페이징 구문
    const totalPost = await Forum.countDocuments({
      title: action.searchKeyword(req.query.search_box),
      category: 1,
    });

    if (!totalPost) {
      emptySearch = true;
    }
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 5),
      totalPost,
    );

    //게시물 출력
    const forumPost = await Forum.find({
      title: action.searchKeyword(req.query.search_box),
      category: 1,
    })
      .populate('userId', 'nickname')
      .sort({ createdAt: -1 })
      .skip(hide_post)
      .limit(limit);

    res.render('admin/forum/qnaBoard/index', {
      search_box,
      posts: forumPost,
      paging: {
        currentPage: current_page,
        totalPage: total_page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const membersCreatePage = async (req, res) => {
  res.render('admin/members/create');
};

const membersCreate = async (req, res) => {
  const { email, nickname, password, cfm_password } = req.body;

  const errors = {};
  const values = { email, nickname, password, cfm_password };
  joinValidator(errors, values);

  if (password != cfm_password) {
    errors['cfm_password'] = '비밀번호가 일치하지 않습니다.';
    return res.render('admin/members/create', { errors, values });
  }

  if (!(Object.keys(errors).length === 0)) {
    return res.render('admin/members/create', { errors, values });
  }

  try {
    const exUser = await User.findOne({ email });
    const exNickname = await User.findOne({ nickname });

    if (exUser || exNickname) {
      if (exUser) errors['email'] = '이미 존재하는 계정입니다.';
      if (exNickname) errors['nickname'] = '이미 존재하는 닉네임입니다.';
      return res.render('admin/members/create', { errors, values });
    }

    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      nickname,
      password: hash,
    });
    return res.redirect('/admin/members');
  } catch (error) {
    console.error(error);
  }
};

const membersUpdatePage = async (req, res) => {
  const user_id = req.params.userId;
  const userInfo = await User.findOne({ _id: user_id });

  res.render('admin/members/update', { userInfo });
};

const membersUpdate = async (req, res) => {
  const { email, nickname, point, roleType, password, cfm_password } = req.body;
  const userId = req.params.userId;
  const userInfo = User.findOne({ _id: userId });
  const exUser = await User.findOne({ _id: userId });
  const hash = await bcrypt.hash(password, 12);

  const errors = {};
  const values = { email, nickname, point, roleType, password, cfm_password };
  adminMembersValidator(errors, values);

  if (password != cfm_password) {
    errors['cfm_password'] = '비밀번호가 일치하지 않습니다.';
    return res.render(`admin/members/update/${userId}`, { errors, userInfo });
  }

  if (!(Object.keys(errors).length === 0)) {
    return res.render(`admin/members/update/${userId}`, { errors, userInfo });
  }

  try {
    if (exUser.email === email && exUser.nickname === nickname) {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            email,
            nickname,
            point,
            roleType,
            password: hash,
          },
        },
      );
      return res.redirect('/admin/members');
    } else {
      const emailcheck = await User.findOne({ email });
      const nicknamecheck = await User.findOne({ nickname });

      if (!(emailcheck === null || nicknamecheck === null)) {
        return res.redirect('/admin/members');
      } else {
        await User.updateOne(
          { _id: userId },
          { $set: { email, nickname, point, roleType, password: hash } },
        );
      }
    }

    return res.redirect('/admin/members');
  } catch (error) {
    console.error(error);
  }
};

const membersDelete = async (req, res) => {
  const user_id = req.params.userId;
  const wargameInfo = await Wargame.deleteMany({ userId: user_id });

  try {
    await User.deleteOne({ _id: user_id });

    return res.redirect('/admin/members');
  } catch (error) {
    console.error(err);
  }
};

const wargameCreatePage = async (req, res) => {
  res.render('admin/wargame/create');
};

const wargameCreate = async (req, res) => {
  const { title, nickname, type, level, point, flag, content } = req.body;
  const userInfo = await User.findOne({ nickname });
  const userId = userInfo._id;

  try {
    await Wargame.create({
      title,
      nickname,
      type,
      level,
      point,
      flag: `${process.env.FLAG_FORMAT}${flag}`,
      content,
      userId: userId,
    });
    return res.redirect('/admin/wargame');
  } catch (error) {
    console.error(error);
  }
};

const wargameUpdatePage = async (req, res) => {
  const wargame_id = req.params.wargameId;
  const wargameInfo = await Wargame.findOne({ _id: wargame_id }).populate(
    'userId',
    'nickname',
  );
  const flag = wargameInfo.flag.replace(process.env.FLAG_FORMAT, '');

  res.render('admin/wargame/update', { wargameInfo, flag });
};

const wargameUpdate = async (req, res) => {
  const wargame_id = req.params.wargameId;
  const { title, nickname, type, level, point, flag, content } = req.body;

  console.log(wargame_id);

  try {
    await Wargame.updateOne(
      { _id: wargame_id },
      {
        $set: {
          title,
          nickname,
          type,
          level,
          point,
          flag: `${process.env.FLAG_FORMAT}${flag}`,
          content,
        },
      },
    );

    return res.redirect('/admin/wargame');
  } catch (error) {
    console.error(error);
  }
};

const wargameDelete = async (req, res) => {
  const wargameId = req.params.wargameId;

  try {
    await Wargame.deleteOne({ _id: wargameId });

    return res.redirect('/admin/wargame');
  } catch (error) {
    console.error(err);
  }
};

const freeBoardCreatePage = async (req, res) => {
  res.render('admin/forum/freeBoard/create');
};

//nickname이 없을경우 에러메세지 나오게 설계
const freeBoardCreate = async (req, res) => {
  const { title, nickname, content } = req.body;
  const userInfo = await User.findOne({ nickname });

  try {
    await Forum.create({
      title,
      nickname,
      content,
      category: 0,
      userId: userInfo._id,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect('/admin/forum/freeBoard');
};

const freeBoardUpdatePage = async (req, res) => {
  const forumId = req.params.forumId;
  const forumInfo = await Forum.findOne({ _id: forumId });
  const userInfo = await User.findOne({ _id: forumInfo.userId });

  res.render('admin/forum/freeBoard/update', { forumInfo, userInfo });
};

const freeBoardUpdate = async (req, res) => {
  const { title, nickname, content } = req.body;
  const forumId = req.params.forumId;
  const userId = await User.findOne({ nickname });

  try {
    await Forum.updateOne(
      { _id: forumId },
      {
        $set: {
          title,
          userId: userId._id,
          content,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }

  res.redirect('/admin/forum/freeBoard');
};

const freeBoardDelete = async (req, res) => {
  const forumId = req.params.forumId;

  try {
    await Forum.deleteOne({ _id: forumId });
    await ForumComment.deleteMany({ forumId });
  } catch (error) {
    console.error(error);
  }
  return res.redirect('/admin/forum/freeBoard');
};

const qnaBaordCreatePage = async (req, res) => {
  res.render('admin/forum/qnaBoard/create');
};

const qnaBoardCreate = async (req, res) => {
  const { title, nickname, content } = req.body;
  const userInfo = await User.findOne({ nickname });

  try {
    await Forum.create({
      title,
      nickname,
      content,
      category: 1,
      userId: userInfo._id,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect('/admin/forum/qnaBoard');
};

const qnaBoardUpdatePage = async (req, res) => {
  const forumId = req.params.forumId;
  const forumInfo = await Forum.findOne({ _id: forumId });
  const userInfo = await User.findOne({ _id: forumInfo.userId });

  res.render('admin/forum/qnaBoard/update', { forumInfo, userInfo });
};

const qnaBoardUpdate = async (req, res) => {
  const { title, nickname, content } = req.body;
  const forumId = req.params.forumId;
  const userId = await User.findOne({ nickname });

  try {
    await Forum.updateOne(
      { _id: forumId },
      {
        $set: {
          title,
          userId: userId._id,
          content,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }

  res.redirect('/admin/forum/qnaBoard');
};

const qnaBoardDelete = async (req, res) => {
  const forumId = req.params.forumId;

  try {
    await Forum.deleteOne({ _id: forumId });
    await ForumComment.deleteMany({ forumId });
  } catch (error) {
    console.error(error);
  }
  return res.redirect('/admin/forum/qnaBoard');
};

const adminLogout = async (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/admin/login');
};

module.exports = {
  adminLogin,
  AdminLoginPage,
  membersBoardPage,
  wargameBoardPage,
  FreeBoardPage,
  qnaBoardPage,
  membersCreatePage,
  membersCreate,
  membersUpdatePage,
  membersUpdate,
  membersDelete,
  wargameCreatePage,
  wargameCreate,
  wargameUpdatePage,
  wargameUpdate,
  wargameDelete,
  freeBoardCreatePage,
  freeBoardCreate,
  freeBoardUpdatePage,
  freeBoardUpdate,
  freeBoardDelete,
  qnaBaordCreatePage,
  qnaBoardCreate,
  qnaBoardUpdatePage,
  qnaBoardUpdate,
  qnaBoardDelete,
  adminLogout,
};
