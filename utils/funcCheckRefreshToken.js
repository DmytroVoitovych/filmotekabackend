const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { Google } = require("../models/userGoogle");

const { REFRESH_KEY } = process.env;

const funcCheckRefreshToken = async (req, _, next) => {
  const { authorization = "" } = req.headers; // извлекаем заголовок
  const [bearer, refresh] = authorization.split(" "); // разбиваем строку
  const ip = req.headers["x-forwarded-for"]; // юзер браузер

  try {
    if (!refresh || refresh === "undefined") {
      const userIP = await User.findOne({ ip });
      const googleIP = await Google.findOne({ ip });
      // для синхронізації
      if (userIP) {
        const { tokenRefresh } = userIP;
        if (tokenRefresh) {
          jwt.verify(tokenRefresh, REFRESH_KEY);
          req.user = userIP;
          next();
          return;
        }
      } else if (googleIP) {
        const { token } = googleIP;
        if (token) {
          req.user = googleIP;
          next();
          return;
        }
      }
      const err = new Error("Not authorized");
      err.status = 401;
      throw err;
    } else {
      if (bearer !== "Bearer") {
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
      }

      const { id } = jwt.verify(refresh, REFRESH_KEY);
      const user = await User.findById(id);
      console.log(id);
      if (!user || !user.tokenRefresh) {
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
      }

      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = funcCheckRefreshToken;
