const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { Google } = require("../models/userGoogle");

const { SECRET_KEY } = process.env;

const funcCheckToken = async (req, _, next) => {
  const { authorization = "" } = req.headers; // беру заголовок
  const [bearer, token] = authorization.split(" "); // забираю данні
  const ip = req.headers["x-forwarded-for"]; // юзер ip

  try {
    if (!token || token === "undefined") {
      // звірка по адресі
      const userIP = await User.findOne({ ip }); // пошук власних юзерів
      const googleIP = await Google.findOne({ ip }); // пошук тих хто ввійшов через гугл
      // для синхронізації
      if (userIP) {
        const { token } = userIP;
        if (token) {
          jwt.verify(token, SECRET_KEY);
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
        console.log(1);
        const err = new Error("Not authorized");
        err.status = 401;
        throw err;
      }

      const check = await Google.findOne({
        email: jwt.decode(token).email,
        name: jwt.decode(token).name,
        // перевіряю наявність в базі
      });

      const { id } =
        !check && jwt.verify(token, SECRET_KEY);
      const user = !check ? await User.findById(id) : check; // записую актуального юзера

      if (!user || !user.token) {
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
        await User.findByIdAndUpdate(_id, {
          token: null,
          ip: null,
        }); // update token
        error.status = 498;
      } else {
        await User.findOneAndUpdate(ip, {
          token: null,
          ip: null,
        }); // update token
        error.status = 498;
      }
    }

    next(error);
  }
};

module.exports = funcCheckToken;
