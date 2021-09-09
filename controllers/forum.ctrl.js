const User = require('../schemas/user');
const Forum = require('../schemas/forum');
const action = require('./common/action');
const { logger } = require('../config/winston');
const { findOne } = require('../schemas/user');
const user = require('../schemas/user');
const ForumComment = require('../schemas/forumComment');

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

const forumFreeBoardPage = async (req, res) => {
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

    res.render('forum/freeBoard', {
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

const forumQnABoardPage = async (req, res) => {
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

    res.render('forum/QnABoard', {
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

const forumFreeBoardWritePage = async (req, res) => {
  res.render('forum/FreeWrite');
};

const forumQnABoardWritePage = async (req, res) => {
  res.render('forum/QnAWrite');
};

const forumFreeBoardWrite = async (req, res) => {
  const userInfo = req.params.userId;
  const { title, content } = req.body;

  try {
    await Forum.create({
      title,
      content,
      category: 0,
      userId: userInfo,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect('/forum/freeBoard');
};

const forumQnABoardWrite = async (req, res) => {
  const userInfo = req.params.userId;
  const { title, content } = req.body;

  try {
    await Forum.create({
      title,
      content,
      category: 1,
      userId: userInfo,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect('/forum/QnABoard');
};

const forumViewPage = async (req, res) => {
  const forumId = req.params.forumId;
  const forumInfo = await Forum.findOne({ _id: forumId });

  await Forum.updateOne(
    { _id: forumId },
    { $set: { views: forumInfo.views + 1 } },
  );

  res.render('forum/view', { forumInfo });
};

const forumCommentCreate = async (req, res) => {
  const forumId = req.params.forumId;
  const comment = req.body.comment;

  try {
    await ForumComment.create({
      comment: comment,
      userId: req.user._id,
      forumId: forumId,
    });
  } catch (error) {
    console.error(error);
  }

  return res.redirect(`/forum/view/${forumId}`);
};

const forumDelete = async (req, res) => {
  const forumId = req.params.forumId;

  await Forum.deleteOne({ _id: forumId });
  await ForumComment.deleteMany({ forumId });

  return res.redirect('/forum/index');
};

module.exports = {
  forumIndexPage,
  forumRankingPage,
  forumFreeBoardPage,
  forumQnABoardPage,
  forumFreeBoardWritePage,
  forumQnABoardWritePage,
  forumFreeBoardWrite,
  forumQnABoardWrite,
  forumViewPage,
  forumCommentCreate,
  forumDelete,
};
