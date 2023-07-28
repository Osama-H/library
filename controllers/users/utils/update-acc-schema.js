const Joi = require("@hapi/joi");

const updateAccSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/[A-Za-z]/)
    .lowercase(),
  nationality: Joi.string()
    .pattern(/[A-Za-z]/)
    .lowercase(),
  photo: Joi.string(),
});

module.exports = updateAccSchema;
