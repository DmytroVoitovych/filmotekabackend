const { Action } = require("../../models/film");
const { Google } = require("../../models/userGoogle");
const jwt = require("jsonwebtoken");

const funcGetUserGoogleIP = async (req, res) => {
  const ip = req.headers["x-forwarded-for"]; // юзер браузер

  if (!(await Google.findOne({ ip }))) {
    const err = new Error("Not authorized");
    err.status = 401;
    throw err;
  }

  const {
    email = "",
    name = "",
    _id = "",
    token = "",
    tokenRefresh = "",
  } = await Google.findOne({ ip });

  const { exp } = jwt.decode(token);
  const die = new Date(exp * 1000).getTime();
  const curr = await Action.find({ owner: _id }, "");

  res.json({
    status: 200,
    data: {
      email,
      name,
      data: curr,
      token_die: {
        timeFormat: new Date(die).toLocaleTimeString(
          "en-GB",
          {
            timeZone: "Europe/Kiev",
          }
        ),
        jsDate: die,
      },
      token,
      tokenRefresh,
    },
  });
};

module.exports = funcGetUserGoogleIP;
