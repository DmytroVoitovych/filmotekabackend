const Joi = require("joi");

const validationNewPass = (data) => {
  const shema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });

  return shema.validate(data);
};

module.exports = {
  validationNewPass,
};
