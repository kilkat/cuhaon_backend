const Wargame = require('../schemas/wargame');
const Comment = require('../schemas/comment');
const action = require('./common/action');
const User = require('../schemas/user');

//메인페이지.
const indexPage = (req, res) => {
  res.render('index');
};

//wargame 페이지
const indexWargamePage = async (req, res) => {
  try {
    titleCount = req.query.title;

    //페이징 구문
    const totalPost = await Wargame.countDocuments({});
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 10),
      totalPost,
    );

    //게시물 출력
    const wargamePost = await Wargame.find({
      title: action.searchKeyword(req.query.title),
    })
      .sort('createAt')
      .skip(hide_post)
      .limit(limit);

    //페이지 랜더링
    res.render('wargame/index', {
      titleCount,
      posts: wargamePost,
      paging: {
        currentPage: current_page,
        totalPage: total_page,
        limit,
      },
    });
  } catch (error) {
    res.render('wargame/index', {
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

//wargame 게시물 내용 페이지
const viewWargamePage = async (req, res) => {
  const id = req.params.id;

  try {
    const wargame = await Wargame.findOne({ _id: id }).populate(
      'userId',
      'email nickname createdAt',
    );

    //페이징 함수
    const totalComment = await Comment.countDocuments({ wargameId: id });
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 3),
      totalComment,
    );

    //댓글 출력
    const comment = await Comment.find({ wargameId: id })
      .sort({ createAt: -1 })
      .skip(hide_post)
      .limit(limit)
      .populate('userId', 'email nickname')
      .sort({ createdAt: 'desc' });

    //페이지 랜더링
    res.render('wargame/view', {
      totalComment,
      wargame,
      comments: comment,
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

//wargame 등록 페이지
const createWargamePage = (req, res) => {
  res.render('wargame/create');
};

//wargame 등록
const createWargame = async (req, res) => {
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

//wargame 삭제 페이지
const deleteWargame = async (req, res) => {
  const wargameId = req.params.wargameId;

  try {
    await Wargame.remove({ _id: wargameId });
    await Comment.remove({ wargameId });

    res.redirect('/wargame');
  } catch (error) {
    console.error(error);
  }
};

//wargame 수정 페이지
const updateWargame = async (req, res) => {
  const wargameId = req.params.wargameId;
  const wargame = await Wargame.findOne({ _id: wargameId });

  try {
    res.render('wargame/update', { wargame });
  } catch (error) {
    console.error(error);
  }
};

//wargame 수정
const updateSubmitWargame = async (req, res) => {
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

//wargame 댓글 작성
const createCommentWargame = async (req, res) => {
  const content = req.body.content;
  const wargameId = req.params.id;

  try {
    await Comment.create({
      content,
      userId: req.user._id,
      wargameId,
    });

    res.redirect(`/wargame/${wargameId}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  indexPage,
  indexWargamePage,
  viewWargamePage,
  createWargamePage,
  createWargame,
  deleteWargame,
  updateWargame,
  updateSubmitWargame,
  createCommentWargame,
};
