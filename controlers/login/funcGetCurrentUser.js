const { Action } = require("../../models/film");
const jwt = require("jsonwebtoken");
const onHeaders = require("on-headers");

const funcGetCurrentUser = async (req, res) => {
  const { email, name, _id, token, tokenRefresh } =
    req.user;

  const { exp } = jwt.decode(token);
  const die = new Date(exp * 1000).getTime();
  const curr = await Action.find({ owner: _id }, "");

  onHeaders(res, function () {
    console.log("Headers have been sent!");
  });

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

module.exports = funcGetCurrentUser;
