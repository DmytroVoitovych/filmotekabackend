const { User } = require("../../models/user");
const {
  validationNewPass,
} = require("../../validation/dataValidationNewPass");
const bcrypt = require("bcryptjs");

const hashPass = (pass) =>
  bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

const funcPathPassword = async (req, res) => {
  const { error } = validationNewPass(req.body);
  const { email, password, newPassword } = req.body;

  const user = await User.findOne({ email }); // звичайна зміна
  const resetcode = await User.findOne({
    // зміна по доступу
    resetCode: password,
  });

  if (user && !error && !resetcode) {
    const pass = await bcrypt.compare(
      password,
      user.password
    );
    if (pass) {
      await User.findByIdAndUpdate(user._id, {
        password: hashPass(newPassword),
      });
      await User.findByIdAndUpdate(user._id, {
        resetCode: null,
      });
      res.status(204).json();
    } else {
      const err = new Error(`Password is wrong`);
      err.status = 401;
      throw err;
    }
  } else if (resetcode) {
    await User.findByIdAndUpdate(resetcode._id, {
      password: hashPass(newPassword),
    });
    await User.findByIdAndUpdate(user._id, {
      resetCode: null,
    });
    res.status(204).json();
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

module.exports = funcPathPassword;
