const { Action } = require("../../models/film");
const funcGetTypeFilm = require("./helpers/funcGetTypeFilm");

const WATCHED = "watched";
const QUEUE = "queue";

const funcGetTransaction = async ({ user, query }, res) => {
  const { page = 1, limit = 20 } = query; // пагинація
  const skip = (page - 1) * limit;
  const allList = await Action.find({ owner: user._id });

  if (query.page === undefined) {
    // ввідаю все
    return res.json({
      status: 200,
      allList,
    });
  }

  const data = await Action.find(
    { owner: user._id },
    "type  idFilm",
    { skip, limit: +limit }
  );
  const length = data.length;

  return res.json({
    status: 200,
    data: data,
    watchedFilms: funcGetTypeFilm(
      data,
      WATCHED,
      page,
      allList,
      limit
    ),
    queueFilms: funcGetTypeFilm(
      data,
      QUEUE,
      page,
      allList,
      limit
    ),
    page:
      length === 0 ? `sorry this page ${page} empty` : page,
    totalCount: allList.length ?? 0,
  });
};

module.exports = funcGetTransaction;

// watchedFilms: data
//       .filter(({ type }) => type === WATCHED)
//       .map(({ _id, idFilm, type }) => ({
//         _id,
//         idFilm,
//         type,
//       })),
