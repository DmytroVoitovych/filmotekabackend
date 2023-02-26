const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { Google } = require("../models/userGoogle");

const { SECRET_KEY } = process.env;

const funcCheckToken = async (req, _, next) => {
  const { authorization = "" } = req.headers; // беру заголовок
  const [bearer, token] = authorization.split(" "); // забираю данні

  try {
    if (bearer !== "Bearer") {
      const err = new Error("Not authorized");
      err.status = 401;
      throw err;
    }

    const check = await Google.findOne({
      email: jwt.decode(token).email, // перевіряю наявність в базі
    });

    const { id } = !check && jwt.verify(token, SECRET_KEY);
    const user = !check ? await User.findById(id) : check; // записую актуального юзера

    if (!user || !user.token) {
      const err = new Error("Not authorized");
      err.status = 401;
      throw err;
    }

    req.user = user;
    next();
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
