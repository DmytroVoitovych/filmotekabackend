const funcSendMessageToTelegramBot = require("../../controlers/services/funcSendMessageToTelegramBot");
const { check } = require("../../utils");
const express = require("express");

const router = express.Router();

router.post(
  "/feedback",
  check(funcSendMessageToTelegramBot)
);

module.exports = router;
