const express = require("express");
const {
  check,
  checkUnique,
  checkUser,
  checkToken,
  checkRefresh,
  checkList,
  checkExpire,
} = require("../../utils/index");
const {
  ctrSignUp,
  ctrLogin,
  ctrCurrent,
  ctrLogout,
  ctrRefresh,
  ctrGoogle,
} = require("../../controlers/login/index");

const router = express.Router();

router.post("/signup", checkUnique, check(ctrSignUp)); // регистрация //двойная валидация

router.post("/login", checkUser, check(ctrLogin)); // вход //двойная валидация

router.post("/refresh", checkRefresh, check(ctrRefresh)); // рефреш //двойная валидация

router.get(
  "/current",
  checkList,
  checkToken,
  checkExpire,
  check(ctrCurrent)
); // перевірка поточного користувача

router.get(
  "/logout",
  checkList,
  checkToken,
  check(ctrLogout)
); // вихід

router.post("/googleauth", check(ctrGoogle)); // вхід через гугол
router.get("/googleIP", check(ctrGoogle));

module.exports = router;
