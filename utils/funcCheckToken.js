const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { Google } = require("../models/userGoogle");

const { SECRET_KEY } = process.env;

const funcCheckToken = async (req, _, next) => {
  const { authorization = "" } = req.headers; // беру заголовок
  const [bearer, token] = authorization.split(" "); // забираю данні
  const ip = req.headers["x-forwarded-for"]; // юзер браузер
  // const browser = req.headers["sec-ch-ua"] || null; // юзер браузер

  try {
    if (bearer !== "Bearer") {
      console.log(1);
      const err = new Error("Not authorized");
      err.status = 401;
      throw err;
    }

    const userIP = await User.findOne({ ip });

    if (!token || token === "undefined") {
      // для синхронізації
      const { token } = userIP;
      jwt.verify(token, SECRET_KEY);
      req.user = userIP;
      next();
    } else {
      const check = await Google.findOne({
        email: jwt.decode(token).email, // перевіряю наявність в базі
      });

      const { id } =
        !check && jwt.verify(token, SECRET_KEY);
      const user = !check ? await User.findById(id) : check; // записую актуального юзера

      if (!user || !user.token) {
        console.log(ip);
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
      }

      req.user = user;
      next();
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      const expire = await User.find({ token }, "");

      if (expire.length > 0) {
        const [{ _id }] = expire;
        await User.findByIdAndUpdate(_id, { token: null }); // update token
        error.status = 498;
      } else {
        error.status = 498;
      }
    }

    next(error);
  }
};

module.exports = funcCheckToken;
