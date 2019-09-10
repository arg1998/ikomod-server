const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(60)
    .required(),
  phone: Joi.string()
    .length(11)
    .required(),
  password: Joi.string()
    .min(6)
    .max(60)
    .required(),
  referral_code: Joi.string().length(10)
});

module.exports = {
  userSignUpValidator: async (req, res, next) => {
    try {
      const user = await userValidationSchema.validate(req.body);
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send({ error: error.details });
    }
  }
};
