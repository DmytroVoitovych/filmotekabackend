const { User } = require("../models/user");
const bcrypt = require("bcryptjs"); // хеширование
const jwt = require("jsonwebtoken");

const funcCheckUser = async (
  { body, headers },
  _,
  next
) => {
  try {
    const borwser = headers["x-forwarded-for"];
    const { email, password } = body; // проверка на наличие и совпадение
    const user = await User.findOne({ email });

    const all = await User.find({}, ""); // ищем все
    const n = all.map((e) => e.password); // забираем пароли
    const arr = [];

    for (let index = 0; index < n.length; index++) {
      // проверяю пароль на совбадения
      const c = await bcrypt.compare(password, n[index]);

      arr.push(c); // пушим для дальнейшей сверке
      if (arr.some((e) => e)) break; // остановка если найденно совпадение
    }

    if (arr.some((e) => e) && !user) {
      // если есть то дело в мыле а не в пароле

      const err = new Error(`User email ${email} is wrong`);
      err.status = 401;
      throw err;
    }

    if (!user && !arr.some((e) => e)) {
      // если и то и то не верно
      const err = new Error(
        `User ${email} is not registered`
      );
      err.status = 404;
      throw err;
    }

    const pass = await bcrypt.compare(
      password,
      user.password
    );

    if (!user || !pass) {
      // если неверный пароль
      const err = new Error(
        `${pass ? "Email" : "Password"} is wrong`
      );
      err.status = 401;
      throw err;
    } else if (user.token) {
      const { exp } = jwt?.decode(user.token);

      if (
        Math.floor(new Date() / 1000) < exp &&
        borwser === user.browser
      ) {
        // тест токена
        // якщо норм далі
        const err = new Error("You are already authorized");
        err.status = 400;
        throw err;
      }
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = funcCheckUser;
