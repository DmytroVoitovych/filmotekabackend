const express = require("express");
const {
  ctrPost,
  ctrGet,
  ctrDel,
} = require("../../controlers/film/index");
const {
  check,
  checkToken,
  checkList,
  checkFilmId,
  checkExpire,
} = require("../../utils/index");
// const checkFormatId = require('../../validation/funcValidateId');

const router = express.Router();

router.get(
  "/",
  checkList,
  checkToken,
  checkExpire,
  check(ctrGet)
);

router.post(
  "/add",
  checkList,
  checkToken,
  checkExpire,
  checkFilmId,
  check(ctrPost)
);

router.delete(
  "/remove/:type/:idFilm",
  checkList,
  checkToken,
  checkExpire,
  check(ctrDel)
);

module.exports = router;
