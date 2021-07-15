const express = require("express");
const router = express.Router();

const controllers = require("../controllers/index.ctrl");

const { isLoggedIn, isNotLoggedIn } = require("../controllers/middlewares");

const authRouter = require("./auth");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
router.get("/", controllers.getIndexPage);
router.get("/wargame", controllers.getWargameIndexPage);
router.get("/wargame/create", controllers.getWargameCreatePage);
router.get("/wargame/:id", controllers.getWargameViewPage);
router.post("/wargame/:wargameId/update", controllers.postWargameUpdate);
router.post("/wargame/create", controllers.postWargameCreate);
router.post("/wargame/:id/commentCreate", controllers.postCreateComment);
router.use("/auth", authRouter);

module.exports = router;
