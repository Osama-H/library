const Joi = require("@hapi/joi");

const createBookSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    numOfPages: Joi.number().min(10).required(),
    category: Joi.string()
      .required()
      .valid("Sport", "Programming", "Health", "Fantasy"),
    review: Joi.number().default(4.5),
})

module.exports = createBookSchema;
