const {
  feedValidation,
} = require("../../validation/feedValidation");

const { TELEGA_API } = process.env;

const funcSendMessageToTelegramBot = async (req, res) => {
  const { error } = feedValidation(req.body);

  const dat = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Kiev",
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dat);

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  } else {
    const { feedback } = req.body;

    const text = `<pre>
    ${feedback}
    \n
   ❤️${time}❤️</pre>`;

    // eslint-disable-next-line no-undef
    fetch(`${TELEGA_API}&text=${text}&parse_mode=HTML`, {
      method: "POST",
    });

    res.status(201).json({
      status: "success",
      code: 201,
    });
  }
};

module.exports = funcSendMessageToTelegramBot;
