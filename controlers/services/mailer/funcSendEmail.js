const transporter = require("./nodemailerConfig");
const { MAIL_FROM } = process.env;

const funcSendEmail = async (data) => {
  await transporter.sendMail({ ...data, from: MAIL_FROM });
};

module.exports = funcSendEmail;
