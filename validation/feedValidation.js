const Joi = require("joi");

const feedValidation = (data) => {
  const shema = Joi.object({
    feedback: Joi.string()
      .trim()
      .min(10)
      .max(255)
      .required(),
  });

  return shema.validate(data);
};

module.exports = {
  feedValidation,
};
