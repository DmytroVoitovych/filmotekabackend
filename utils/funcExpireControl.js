const jwt = require("jsonwebtoken");
const { Google } = require("../models/userGoogle");

const funcUpdateGoogleUserToken = async (email) =>
  await Google.findOneAndUpdate(email, { token: null }); // деактивую токен в базі

const funcExpireControl = (req, _, next) => {
  const { token } = req.user;

  const current = Math.floor(Date.now() / 1000); // звожу час до секунд

  // витягую час коли токен стане не активним
  const { exp, email } = jwt?.decode(token);

  if (current < exp) {
    next(); // якщо норм далі
  } else {
    funcUpdateGoogleUserToken(email);
    const err = new Error("Token expired");
    err.status = 498;
    throw err;
  }
};

module.exports = funcExpireControl;
