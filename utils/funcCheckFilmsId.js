const { Action } = require("../models/film");

const funcCheckFilmsId = async (req, _, next) => {
  try {
    console.log(req.params);
    const { idFilm } = req.params; // перевірка на унікальність
    const id = await Action.findOne({ idFilm });
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
