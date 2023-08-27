const { User } = require("../../models/user");
const {
  validationEmail,
} = require("../../validation/emailValidation");
const funcPostRefetchEmail = require("../services/mailer/funcPostRefetchEmail");

const funcGetResetCode = async (req, res, next) => {
  const { error } = validationEmail(req.body);
  const user = await User.findOne(req.body);

  if (!error && user) {
    const { email, id } = user;
    await funcPostRefetchEmail(email, id);

    res.status(200).json({
      status: "success",
      code: 200,
      message: `code was sent on this email: ${email}`,
    });
  } else if (!user && !error) {
    const err = new Error(
      `User with this ${req.body.email} is not exist`
    );
    err.status = 400;
    throw err;
  } else {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }
};

module.exports = funcGetResetCode;
