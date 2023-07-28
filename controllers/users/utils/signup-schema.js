const Joi = require("@hapi/joi");

const signupSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(30)
    // .regex(RegExp())
    // .pattern(new RegExp("[A-Za-z]"))

    .lowercase(),
  email: Joi.string().email(),
  password: Joi.string().required().min(8).max(20),
  passwordConfirm: Joi.ref("password"),
  nationality: Joi.string()
    .required()
    .pattern(new RegExp("[A-Za-z]"))
    .lowercase(),

  country: Joi.string().required().min(3).max(10).lowercase(),
  city: Joi.string().required().lowercase(),
});

module.exports = signupSchema;
