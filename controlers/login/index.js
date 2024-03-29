const ctrSignUp = require("./funcPostSignUp");
const ctrLogin = require("./funcPostLogin");
const ctrCurrent = require("./funcGetCurrentUser");
const ctrLogout = require("./funcGetLogout");
const ctrRefresh = require("./funcPostRefresh");
const ctrGoogle = require("./funcRegisterUserGoogle");
const ctrGoogleIP = require("./funcGetUserGoogleIP");
const ctrResetCode = require("./funcGetResetCode");
const ctrSetNewPass = require("./funcPathPassword");

module.exports = {
  ctrSignUp,
  ctrLogin,
  ctrCurrent,
  ctrLogout,
  ctrRefresh,
  ctrGoogle,
  ctrGoogleIP,
  ctrResetCode,
  ctrSetNewPass,
};
