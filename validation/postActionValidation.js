const Joi = require("joi");

const validation = (data) => {
  const shema = Joi.object({
    type: Joi.string().valid("watched", "queue").required(), // или или
    idFilm: Joi.number().min(1).max(1000000).required(), // число сумы транзакции
  });

  return shema.validate(data);
};

module.exports = {
  validation,
};
