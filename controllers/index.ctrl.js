const Wargame = require('../schemas/wargame');
const Comment = require('../schemas/comment');
const User = require('../schemas/user');
//메인페이지
const getIndexPage = (req, res) => {
  res.render('index');
};
//wargame 페이지
const getWargameIndexPage = async (req, res) => {
  try {
    //페이징 구문
    let page = Math.max(1, parseInt(req.query.page));
    let limit = Math.max(1, parseInt(req.query.limit));
    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 10;
    const maxPost = 10;
    let hiddenPost = page === 1 ? 0 : (page - 1) * limit;
    let wargamePost = await Wargame.find({
      title: new RegExp(req.query.title, 'i'),
    })
      .sort('-createdAt') //내림차순 정렬
      .skip(hiddenPost)
      .limit(limit);
    const totalPost = await Wargame.countDocuments({});
    if (!totalPost) {
      throw Error();
    }
    const totalPage = Math.ceil(totalPost / maxPost);
    //페이징 구문 끝

    res.render('wargame/index', {
      posts: wargamePost,
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

const getWargameCreatePage = (req, res) => {
  res.render('wargame/create');
};

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
    if (!totalComment) {
      throw Error();
    }
    const totalPage = Math.ceil(totalComment / maxComment);
    //페이징 구문 끝

    res.render('wargame/view', {
      wargame,
      comments,
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

const postWargameUpdate = async (req, res) => {
  const wargameId = req.params.wargameId;
  const userId = req.params.wargameUserId;
  console.log(wargameId);
  console.log(userId);

  try {
    res.render('wargame/update');
  } catch (error) {
    console.error(error);
  }

  res.render('wargame/update');
};

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
};
