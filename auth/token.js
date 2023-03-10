const jwt = require("jsonwebtoken");
const { SECRET_KEY, REFRESH_KEY } = process.env;

const funcGetToken = (user) => ({
  token: jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  ),
  refresh: jwt.sign({ id: user._id }, REFRESH_KEY, {
    expiresIn: "30d",
  }),
  email: user.email,
  name: user.name,
  id: user._id,
});

module.exports = funcGetToken;
