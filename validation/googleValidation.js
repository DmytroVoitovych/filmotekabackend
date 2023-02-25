const Joi = require("joi");

const googleValidation = (data) => {
  const shema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    name: Joi.string().min(1).max(12).required(),
    token: [Joi.string(), Joi.number()],
    tokenRefresh: Joi.string(),
  });

  return shema.validate(data);
};

module.exports = {
  googleValidation,
};

// "email": "begunec23@gmail.com",
//     "name": "dima",
//     "token": "ya29.a0AVvZVsrhPi0EjVwIgeMyruZ0LN9tDHq-ahBfYFGduxk9HmfvGZ6-lNpAG47nMehxA4sKgeu_o-9vR6MdzT9_gi5rhPTeCdXC8ppvDxGuV2ZJuz5PXbHPMEg64sLGKoWOulYYu3ywAXAM5WZscbuBlVS0x63ohAaCgYKAVkSARESFQGbdwaIX3_Tet-pv9aWIi-VYGM-Zg0165",
// "tokenRefresh":"APJWN8dBPFbMX0zBywRHZEeWxJp4RQqTkH2-oCKlZQTfUzclubBmCJWTPQEGbyf8hMQFr-f_l2ZfSbDKXnIc40fJmDoPczv0IDdl--DKgDv3BhIr7mRrkKww8kRkYay2qUpc8E32hm4iztXaatiEQ0VLGbJ_JDX1QdjVqKg6cWstgZBqCa63e5Iiczy4yV9KjfbsoDNHfVWbolb8I_iEa_7AiBnGX6kXvkJe58zAvkmBqKlhZ-DdK4bNqRNGC0E1RyT3RLKFh8MWboPxC7NWcnlByWRU0u8iUAx4f9Xh4i_Oi96yd4QlOGyj9jxn6oG4jvhV4ZsKlDXghNPePvy7Iu-b1XZu7ZTDrQ6Y3vn-rzRrvkjymwC95V8Wo2YNppRysn_jpfESBcxS3Sm0caj7asl5w9x5GHfSKg"
