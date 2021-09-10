const Wargame = require('../schemas/wargame');
const Comment = require('../schemas/comment');
const action = require('./common/action');
const User = require('../schemas/user');
const validator = require('validator');
const whoSolved = require('../schemas/whoSolved');
const { commentSaveValidator } = require('./common/validator');
const { saveWargameValidator } = require('./common/validator');
const { logger } = require('../config/winston');
//메인페이지.
const indexPage = (req, res) => {
  res.render('index');
};

//wargame 페이지
const indexWargamePage = async (req, res) => {
  try {
    let titleCount = req.query.title;
    let emptySearch = false;

    //페이징 구문
    const totalPost = await Wargame.countDocuments({
      title: action.searchKeyword(req.query.title),
    });
    if (!totalPost) {
      emptySearch = true;
    }
    let { hide_post, limit, total_page, current_page } = action.paging(
      req.query.page,
      (_limit = 10),
      totalPost,
    );

    //게시물 출력
    const wargamePost = await Wargame.find({
      title: action.searchKeyword(req.query.title),
    })
      .sort({ createdAt: -1 })
      .skip(hide_post)
      .limit(limit);

    console.log(wargamePost);

    //페이지 랜더링
    res.render('wargame/index', {
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
    res.render('wargame/index', {
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

//wargame 게시물 내용 페이지
const viewWargamePage = async (req, res) => {
  const id = req.params.wargame_id;

  try {
    const wargame = await Wargame.findOne({ _id: id }).populate(
      'userId',
      'email nickname createdAt',
    );

    //views count
    await Wargame.updateOne(
      { _id: id },
      { $set: { views: wargame.views + 1 } },
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
      .skip(hide_post)
      .limit(limit)
      .populate('userId', 'email nickname point')
      .sort({ createdAt: 'desc' });

    console.log(comment);

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

  //에러 검증
  const errors = {};
  const values = { title, content, type, level, point, flag };

  saveWargameValidator(errors, values);

  if (!(Object.keys(errors).length === 0)) {
    return res.render('wargame/create', { errors, values });
  }

  try {
    await Wargame.create({
      title,
      content,
      type,
      level,
      point,
      flag: `${process.env.FLAG_FORMAT}${flag}`, //${process.env.FLAG_FORMAT}${flag}
      userId: req.user,
    });

    res.redirect('/wargame');
  } catch (error) {
    console.error(error);
  }
};

//wargame 삭제 페이지
const deleteWargame = async (req, res) => {
  const wargameId = req.params.wargame_id;

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
  const wargameId = req.params.wargame_id;
  const wargame = await Wargame.findOne({ _id: wargameId });
  const flag = wargame.flag.replace(process.env.FLAG_FORMAT, '');

  try {
    res.render('wargame/update', { wargame, flag });
  } catch (error) {
    console.error(error);
  }
};

//wargame 수정
const updateSubmitWargame = async (req, res) => {
  const { title, content, type, level, point, flag, updateAt } = req.body;
  const wargameId = req.params.wargame_id;
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
          flag: `${process.env.FLAG_FORMAT}${flag}`,
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

const validateSolvedInfo = (
  req,
  res,
  flag,
  wargameId,
  nickname,
  solvedInfo,
) => {
  if (flag.length < 1) {
    return res.send(
      //alert도 안뜨고 window.location 이동도 안먹힘
      `<script>alert('flag값을 제출해주세요.'); window.location='/wargame/${wargameId};</script>`,
    );
  } else if (
    solvedInfo.wargameId == wargameId &&
    solvedInfo.whoSolved == nickname
  ) {
    return res.send(
      `<script>alert('이미 맞춘 문제입니다.'); window.location='/wargame/${wargameId}';</script>`,
    );
  }

  return req, res, flag, solvedInfo, wargameId, nickname;
};

const validateFlag = (req, res, wargameId, submitFlag, wargameInfo) => {
  if (!(submitFlag == wargameInfo.flag)) {
    return res.send(
      `<script>alert('정답이 아닙니다.'); window.location='/wargame/${wargameId}';</script>`,
    );
  } else {
    return req, res, wargameId, submitFlag, wargameInfo;
  }
};

//wargame flag 검증
const checkFlagWargame = async (req, res) => {
  const wargameId = req.params.wargame_id;
  const nickname = req.user.nickname;
  const userInfo = await User.findOne({ nickname });

  const flag = req.body.flag;
  const submitFlag = `${process.env.FLAG_FORMAT}${flag}`;
  const wargameInfo = await Wargame.findOne({ _id: wargameId });

  const solvedInfo = await whoSolved.findOne({
    wargameId: wargameId,
    whoSolved: nickname,
  });

  if (!(solvedInfo === null)) {
    validateSolvedInfo(req, res, flag, wargameId, nickname, solvedInfo);
  }

  validateFlag(req, res, wargameId, submitFlag, wargameInfo);

  try {
    if (submitFlag === wargameInfo.flag) {
      if (solvedInfo === null) {
        await whoSolved.create({
          wargameId: wargameId,
          whoSolved: nickname,
        });

        await Wargame.updateOne(
          { _id: wargameId },
          { $set: { solved: wargameInfo.solved + 1 } },
        );

        await User.updateOne(
          { nickname },
          {
            $set: {
              point: userInfo.point + wargameInfo.point,
            },
          },
        );
        return res.send(
          `<script>alert('정답입니다.'); window.location='/wargame/${wargameId}';</script>`,
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};

//wargame 댓글 작성
const createCommentWargame = async (req, res) => {
  const { content } = req.body;
  const wargameId = req.params.wargame_id;
  const backURL = `/wargame/${wargameId}`;
  //에러 검증
  const errors = {};
  const values = { content };

  commentSaveValidator(errors, values);
  //댓글에 빈 문자열 입력시 경고문 출력
  if (!(Object.keys(errors).length === 0)) {
    return res.send(
      `<script>alert("내용을 작성해 주세요"); location.href='/wargame/${wargameId}';</script>`,
    );
  }

  try {
    await Comment.create({
      content,
      userId: req.user._id,
      wargameId,
    });

    res.redirect(backURL);
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
  checkFlagWargame,
  createCommentWargame,
};
