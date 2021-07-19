const Wargame = require('../schemas/wargame');
const Comment = require('../schemas/comment');
const Common = require('./common');
const User = require('../schemas/user');

//메인페이지
const getIndexPage = (req, res) => {
  res.render('index');
};

//wargame 페이지
const getWargameIndexPage = async (req, res) => {
  try {
    let titleCount = req.query.title;
    const totalPost = await Wargame.countDocuments({
      title: new RegExp(req.query.title, 'i'),
    });

    let { hiddenPost, page, totalPage, limit } = Common.paging(
      req.query.page,
      req.query.limit,
      totalPost,
    );

    let wargamePost = await Wargame.find({
      title: new RegExp(req.query.title, 'i'),
    })
      .sort('-createdAt') //내림차순 정렬
      .skip(hiddenPost)
      .limit(limit);

    res.render('wargame/index', {
      titleCount,
      posts: wargamePost,
      paging: {
        currentPage: page,
        totalPage,
        limit,
      },
    });
  } catch (error) {
    res.render('wargame/index', {
      titleCount: [],
      posts: [],
      paging: {
        currentPage: 1,
        totalPage: 1,
        limit: 10,
      },
    });
  }
};

//wargame 등록 페이지
const getWargameCreatePage = (req, res) => {
  res.render('wargame/create');
};
//wargame 게시물 내용
const getWargameViewPage = async (req, res) => {
  const id = req.params.id;

  try {
    const wargame = await Wargame.findOne({ _id: id }).populate(
      'userId',
      'email nickname createdAt',
    );

    //페이징 구문
    let page = Math.max(1, parseInt(req.query.page));
    let limit = Math.max(1, parseInt(req.query.limit));
    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 3;
    const maxComment = 3;
    let hiddenComment = page === 1 ? 0 : (page - 1) * limit;
    const comments = await Comment.find({ wargameId: id })
      .populate('userId', 'email nickname')
      .sort({ createdAt: 'desc' })
      .skip(hiddenComment)
      .limit(limit);
    const totalComment = await Comment.countDocuments({ wargameId: id });
    const totalPage = Math.ceil(totalComment / maxComment);
    //페이징 구문 끝

    res.render('wargame/view', {
      wargame,
      comments,
      totalComment,
      paging: {
        currentPage: page,
        totalPage,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//wargame 수정
const postWargameUpdate = async (req, res) => {
  const wargameId = req.params.wargameId;
  const wargame = await Wargame.findOne({ _id: wargameId });

  try {
    res.render('wargame/update', { wargame });
  } catch (error) {
    console.error(error);
  }
};

//수정 ctrl
const postWargameUpdateSuccess = async (req, res) => {
  const { title, content, type, level, point, flag, updateAt } = req.body;
  const wargameId = req.params.wargameId;
  const wargame = await Wargame.findOne({ _id: wargameId });

  try {
    await Wargame.updateOne(
      { _id: wargameId },
      {
        $set: {
          title,
          content,
          type,
          level,
          point,
          flag: `${process.env.FLAG_FORMAT}_${flag}`,
          updateAt,
        },
      },
    );
    console.log(wargame);
    res.redirect(`/wargame/${wargameId}`);
  } catch (error) {
    console.error(error);
  }
};

//wargame 등록
const postWargameCreate = async (req, res) => {
  const { title, content, type, level, point, flag } = req.body;

  try {
    await Wargame.create({
      title,
      content,
      type,
      level,
      point,
      flag: `${process.env.FLAG_FORMAT}_${flag}`, //${process.env.FLAG_FORMAT}_${flag}
      userId: req.user,
    });

    res.redirect('/wargame');
  } catch (error) {
    console.error(error);
  }
};

const postWargameDelete = async (req, res) => {
  const wargameId = req.params.wargameId;

  try {
    await Wargame.remove({ _id: wargameId });
    await Comment.remove({ wargameId });

    res.redirect('/wargame');
  } catch (error) {
    console.error(error);
  }
};

//댓글 작성
const postCreateComment = async (req, res) => {
  const content = req.body.content;
  const wargameId = req.params.id;

  try {
    await Comment.create({
      content,
      userId: req.user,
      wargameId,
    });

    res.redirect(`/wargame/${wargameId}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getIndexPage,
  getWargameIndexPage,
  getWargameCreatePage,
  getWargameViewPage,
  postWargameUpdate,
  postWargameCreate,
  postCreateComment,
  postWargameDelete,
  postWargameUpdateSuccess,
};
