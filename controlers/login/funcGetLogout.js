const { User } = require("../../models/user");
const { Blist } = require("../../models/blist");
const { Google } = require("../../models/userGoogle");

const funcGetLogout = async (req, res) => {
  const { _id } = req.user;
  const { authorization = "" } = req.headers; // забираю аус хедера
  const [, token] = authorization.split(" "); // забираю токен

  const googleModel = await Google.findById(_id); // тест на наявність

  if (googleModel) {
    await Google.findByIdAndUpdate(_id, {
      token: null,
    });
    console.log(googleModel);
    return res.status(204).json();
  }

  await Blist.create({ token }); // токен в блеклист
  await User.findByIdAndUpdate(_id, { token: null }); // сохраняем токен в базу
  return res.status(204).json();
};

module.exports = funcGetLogout;
