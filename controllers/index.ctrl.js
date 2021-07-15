const Wargame = require("../schemas/wargame");
const Comment = require("../schemas/comment");
const User = require("../schemas/user");

const getIndexPage = (req, res) => {
  res.render("index");
};

const getWargameIndexPage = async (req, res) => {
  try {
    const wargame = await Wargame.find();

    res.render("wargame/index", { wargame });
  } catch (error) {
    console.error(error);
  }
};

const getWargameCreatePage = (req, res) => {
  res.render("wargame/create");
};

const getWargameViewPage = async (req, res) => {
  const id = req.params.id;

  try {
    const wargame = await Wargame.findOne({ _id: id }).populate(
      "userId",
      "email nickname createdAt"
    );

    const comment = await Comment.find({ wargameId: id })
      .populate("userId", "email nickname")
      .sort({ createdAt: "desc" });

    res.render("wargame/view", { wargame, comment });
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
    res.render("wargame/update");
  } catch (error) {
    console.error(error);
  }

  res.render("wargame/update");
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

    res.redirect("/wargame");
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
