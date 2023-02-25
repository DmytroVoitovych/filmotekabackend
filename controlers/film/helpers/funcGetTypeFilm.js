const funcGetTypeFilm = (
  data,
  filmType,
  page,
  all,
  limit
) => {
  return data
    .filter(({ type }) => type === filmType)
    .map(({ _id, idFilm, type }) => ({
      _id,
      idFilm,
      type,
      page,
      totalPage: Math.ceil(
        all.filter(({ type }) => type === filmType).length /
          limit
      ), // округлюю до більшого
    }));
};

module.exports = funcGetTypeFilm;
