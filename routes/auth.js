/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');
const controllers = require('../controllers/auth.ctrl');

/**
 * @swagger
 * paths:
 *  /auth/join:
 *    get:
 *      summary: 유저 조회
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: A user schema
 *    post:
 *      summary: 회원가입
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router
  .route('/join')
  .get(isNotLoggedIn, controllers.getJoin)
  .post(isNotLoggedIn, controllers.join);

/**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      summary: 로그인
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router
  .route('/login')
  .get(isNotLoggedIn, controllers.getLogin)
  .post(isNotLoggedIn, controllers.login);

/**
 * @swagger
 * paths:
 *  /auth/logout:
 *    get:
 *      summary: 로그아웃
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: ok
 */
router.get('/logout', isLoggedIn, controllers.logout);

module.exports = router;
