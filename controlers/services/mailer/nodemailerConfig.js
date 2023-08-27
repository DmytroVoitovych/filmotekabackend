const nodemailer = require("nodemailer");
require("dotenv").config();
const { PASSWORD, MAIL_FROM } = process.env;

const config = {
  host: "smtp.meta.ua", // smtp выступает в качестве прокладки между отправителем и получателем , кароче говоря почтальон
  port: 465, // защищенный SSL ПОРТ раньше был 25
  secure: true,

  auth: {
    // данные отправителя
    user: MAIL_FROM,
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config); // создаем транспортер с описаными выше настройками

module.exports = transporter;
