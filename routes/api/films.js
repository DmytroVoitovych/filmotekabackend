const express = require("express");
const {
  ctrPost,
  ctrGet,
} = require("../../controlers/film/index");
const {
  check,
  checkToken,
  checkList,
  checkFilmId,
} = require("../../utils/index");
// const checkFormatId = require('../../validation/funcValidateId');

const router = express.Router();

router.get("/", checkList, checkToken, check(ctrGet));

router.post(
  "/add",
  checkList,
  checkToken,
  checkFilmId,
  check(ctrPost)
);

module.exports = router;
