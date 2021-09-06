const User = require('../schemas/user');
const Forum = require('../schemas/forum');
const action = require('./common/action');
const { logger } = require('../config/winston');
const { findOne } = require('../schemas/user');
const user = require('../schemas/user');

const forumIndexPage = async (req, res) => {
  try {
    //검색
    let search_box = req.query.search_box;
    //랭크
    const rank = await User.find().sort({ point: -1 }).limit(3);

    //페이징 구문
    const totalPost = await Forum.countDocuments({
      title: action.searchKeyword(req.query.search_box),
    });

    if (!totalPost) {
      emptySearch = true;
    }
    let { hide_post, limit } = action.paging(
      req.query.page,
      (_limit = 5),
      totalPost,
    );

    //게시물 출력
    const forumPost = await Forum.find({
      title: action.searchKeyword(req.query.search_box),
    })
      .sort({ createdAt: -1 })
      .skip(hide_post)
      .limit(limit);

    res.render('forum/index', {
      search_box,
      rank,
      posts: forumPost,
    });
  } catch (error) {
    console.error(error);
  }
};

const forumRankingPage = async (req, res) => {
  try {
    const rank = await User.find().sort({ point: -1 });

    res.render('forum/ranking', { rank });
  } catch (error) {
    console.error(error);
  }
};

const forumBoardPage = async (req, res) => {
  try {
    //검색
    let search_box = req.query.search_box;
    //페이징 구문
    const totalPost = await Forum.countDocuments({
      title: action.searchKeyword(req.query.search_box),
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
    })
      .sort({ createdAt: -1 })
      .skip(hide_post)
      .limit(limit);

    res.render('forum/board', {
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

const forumWritePage = async (req, res) => {
  res.render('forum/write');
};

const forumWrite = async (req, res) => {
  const userInfo = req.params.userId;
  const { title, content } = req.body;

  try {
    await Forum.create({
      title,
      content,
      userId: userInfo,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect('/forum/board');
};

module.exports = {
  forumIndexPage,
  forumRankingPage,
  forumBoardPage,
  forumWritePage,
  forumWrite,
};
