const { Action } = require("../../models/film");
const {
  validation,
} = require("../../validation/postActionValidation");

const funcPostFilmsId = async (req, res) => {
  const { error } = validation(req.body);

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  } else {
    const { _id } = req.user; // id авторизованого користувача

    const dat = new Date();
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Kiev",
      hour: "numeric",
      minute: "numeric",
    }).format(dat); // формат часу 23:29

    const { idFilm, type } = req.body; // приходить в тілі запиту

    res.status(201).json({
      status: "success",
      code: 201,
      data: await Action.create({
        type,
        idFilm,
        owner: _id,
        date: new Date() // формат дата 19.11.2022
          .toLocaleDateString("en-GB")
          .replaceAll("/", "."),
        time,
      }), // метод додавання в колекцію,
    });
  }
};

module.exports = funcPostFilmsId;
