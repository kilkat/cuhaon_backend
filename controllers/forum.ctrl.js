const User = require('../schemas/user');
const Forum = require('../schemas/forum');
const action = require('./common/action');
const { logger } = require('../config/winston');
const { findOne } = require('../schemas/user');
const user = require('../schemas/user');
const ForumComment = require('../schemas/forumComment');

//홈
const forumIndexPage = async (req, res) => {
  try {
    //검색
    let search_box = req.query.search_box;
    //랭크
    const rank = await User.find().sort({ point: -1 }).limit(3);

    //게시판 표시 구문
    //자유 게시판 출력
    const freeforumPost = await Forum.find({
      title: action.searchKeyword(req.query.search_box),
      category: 0,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const QnAforumPost = await Forum.find({
      title: action.searchKeyword(req.query.search_box),
      category: 1,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.render('forum/index', {
      search_box,
      rank,
      freeposts: freeforumPost,
      QnAposts: QnAforumPost,
    });
  } catch (error) {
    console.error(error);
  }
};

//랭킹 페이지
const forumRankingPage = async (req, res) => {
  try {
    const rank = await User.find().sort({ point: -1 });

    res.render('forum/ranking', { rank });
  } catch (error) {
    console.error(error);
  }
};

const forumfreeBoardPage = async (req, res) => {
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

const forumqnaBoardPage = async (req, res) => {
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

    res.render('forum/qnaBoard', {
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

const forumfreeBoardWritePage = async (req, res) => {
  res.render('forum/freeWrite');
};

const forumqnaBoardWritePage = async (req, res) => {
  res.render('forum/qnaWrite');
};

const forumfreeBoardWrite = async (req, res) => {
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

const forumqnaBoardWrite = async (req, res) => {
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

  return res.redirect('/forum/qnaBoard');
};

//게시물 페이지
const forumViewPage = async (req, res) => {
  const forumId = req.params.forumId;
  try {
    const forumInfo = await Forum.findOne({ _id: forumId }).populate(
      'userId',
      'nickname',
    );

    await Forum.updateOne(
      { _id: forumId },
      { $set: { views: forumInfo.views + 1 } },
    );
    //페이징 구문
    const totalComment = await ForumComment.countDocuments({
      forumId,
    });

    if (!totalComment) {
      emptySearch = true;
    }
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 5),
      totalComment,
    );

    //게시물 출력
    const forumComment = await ForumComment.find({
      forumId,
    })
      .populate('userId', 'nickname')
      .sort({ createdAt: -1 })
      .skip(hide_post)
      .limit(limit);

    res.render('forum/view', {
      totalComment,
      forumInfo,
      posts: forumComment,
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

//포럼 댓글
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

//수정 페이지
const forumViewEditPage = async (req, res) => {
  const forumId = req.params.forumId;
  const forumInfo = await Forum.findOne({ _id: forumId });

  res.render('forum/edit', { forumId, forumInfo });
};

const forumViewDelete = async (req, res) => {
  const forumId = req.params.forumId;

  await Forum.deleteOne({ _id: forumId });
  await ForumComment.deleteMany({ forumId });

  return res.redirect('/forum/index');
};

const forumViewEdit = async (req, res) => {
  const forumId = req.params.forumId;
  const { title, content } = req.body;

  try {
    await Forum.updateOne({ _id: forumId }, { $set: { title, content } });
  } catch (error) {
    console.error(error);
  }

  return res.redirect(`/forum/view/${forumId}`);
};

module.exports = {
  forumIndexPage,
  forumRankingPage,
  forumfreeBoardPage,
  forumqnaBoardPage,
  forumfreeBoardWritePage,
  forumqnaBoardWritePage,
  forumfreeBoardWrite,
  forumqnaBoardWrite,
  forumViewPage,
  forumCommentCreate,
  forumViewEditPage,
  forumViewDelete,
  forumViewEdit,
};
