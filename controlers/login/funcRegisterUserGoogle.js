const { Google } = require("../../models/userGoogle");
const {
  googleValidation,
} = require("../../validation/googleValidation");

const funcRegisterUserGoogle = async (req, res, next) => {
  const {
    email: mail,
    name: userName,
    token,
    tokenRefresh,
  } = req.body; // тело запроса
  const ip = req.headers["x-forwarded-for"] || null; // юзер браузер
  //   console.log(token);
  const { error } = await googleValidation(req.body);
  const check = await Google.findOne({
    mail,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  } else if (check) {
    await Google.findOneAndUpdate(check.email, {
      token,
      ip,
    });
    res.status(201).json({ status: "success", code: 201 });
  } else {
    const { email, name, _id } = await Google.create({
      // метод для добавление в колекцию в мангуссе
      email: mail,
      name: userName,
      token,
      tokenRefresh,
      ip,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { user: { email, name, id: _id } },
    });
  }
};

module.exports = funcRegisterUserGoogle;
