const Joi = require("@hapi/joi");

const updateBookSchema = Joi.object({
  name: Joi.string().lowercase(),
  numOfPages: Joi.number().min(10),
  category: Joi.string()
  .valid("Sport", "Programming", "Health", "Fantasy"),
  review: Joi.number().default(4.5),
});

module.exports = updateBookSchema;
