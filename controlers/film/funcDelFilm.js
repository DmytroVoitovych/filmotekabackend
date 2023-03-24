const { Action } = require("../../models/film");

const funcDelContacts = async (req, res) => {
  const { idFilm, type } = req.params; // id фільма який маю видалити
  const { id } = req.user; // овнер id

  const removeId = await Action.deleteOne({
    // видаляю один
    owner: id,
    idFilm,
    type,
  });

  if (removeId && removeId.deletedCount > 0) {
    // перевіряю чи взагалі є такий індекс
    return res.status(201).json({
      status: "success",
      code: 200,
      message: "film deleted",
      data: removeId[0],
    });
  } else {
    // якщо нема
    const error = new Error(`Film id=${idFilm} not found.`);
    error.status = 404;
    throw error;
  }
};

module.exports = funcDelContacts;
