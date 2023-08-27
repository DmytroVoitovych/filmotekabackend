const randomstring = require("randomstring");
const funcSendEmail = require("./funcSendEmail");
const { User } = require("../../../models/user");

const funcPostRefetchEmail = async (MAIL_TO, id) => {
  const code = randomstring.generate(6);

  const letter = {
    to: MAIL_TO,
    subject: "password resset",
    html: `<p style="color: #153643; font-family: Arial, sans-serif; font-size: 20px;">
             To reset your password, click the link and enter the code along with your information.
             <br/><a href='https://vue-filmoteka.vercel.app/auth/newpassword'>Link: changing page</a><br/>
             <b >Reset code:</b><br/><code style="color: red">${code}</code><br/>
            Best regards,<br/>
            Voit Team
            </p>`,
  };

  await funcSendEmail(letter);
  await User.findByIdAndUpdate(
    id,
    { $set: { resetCode: code } },
    { new: true }
  );
  setTimeout(
    async () =>
      await User.findByIdAndUpdate(id, { resetCode: null }),
    300000
  );
};

module.exports = funcPostRefetchEmail;
