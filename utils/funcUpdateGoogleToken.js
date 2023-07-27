const jwt = require("jsonwebtoken");
const { Google } = require("../models/userGoogle");
// функція відповідальна за авторефетч користувачів
const funcUpdateGoogleToken = async (req, res, next) => {
  const { authorization = "" } = req.headers; // беру заголовок
  const [, token] = authorization.split(" "); // забираю данні

  // для синхронізації
  if (token) {
    console.log(jwt.decode(token).email);
    await Google.findOneAndUpdate(
      { email: jwt.decode(token).email },
      {
        token,
      }
    );
    next();
  } else {
    next();
  }
};

module.exports = funcUpdateGoogleToken;
