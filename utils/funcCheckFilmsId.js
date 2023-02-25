const { Action } = require("../models/film");

const funcCheckFilmsId = async ({ body }, _, next) => {
  try {
    const { idFilm, type } = body; // перевірка на унікальність
    const id = await Action.findOne({ idFilm, type });
    if (id) {
      const err = new Error(
        `Film with ${idFilm} allready exist`
      );
      err.status = 409;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = funcCheckFilmsId;
