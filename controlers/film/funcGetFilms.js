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

  const watched = await Action.find(
    { owner: user._id, type: "watched" },
    "type  idFilm",
    { skip, limit: +limit }
  );
  const queue = await Action.find(
    { owner: user._id, type: "queue" },
    "type  idFilm",
    { skip, limit: +limit }
  );

  const length = allList.length;

  return res.json({
    status: 200,
    data: {
      watchedFilms: allList.filter(
        ({ type }) => type === WATCHED
      ),
      queueFilms: allList.filter(
        ({ type }) => type === QUEUE
      ),
    },
    watchedFilms: funcGetTypeFilm(
      watched,
      WATCHED,
      page,
      allList,
      limit
    ),
    queueFilms: funcGetTypeFilm(
      queue,
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
