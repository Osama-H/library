const Book = require("../../models/book");
const createBookSchema = require("./utils/create-book-schema");
const AppError = require("../utils/appError");

const addBook = async (req, res, next) => {
  try {
    let result = await createBookSchema.validateAsync(req.body);

    const book = await Book.findOne({
      where: {
        // question
        name: result.name,
      },
    });

    if (book) {
      throw new AppError("Book Already Exist", 409);
    }
    result.UserId = req.user.id;

    const newBook = await Book.create({ ...result, UserId: req.user.id });

    res.status(201).json({
      status: "success",
      newBook,
    });
  } catch (err) {
    let statusCode;
    if (err instanceof AppError) {
      statusCode = err.statusCode;
    } else if (err.isJoi) {
      statusCode = 422;
    } else {
      statusCode = 400;
    }

    res.status(statusCode).json({
      status: "fail",
      err: err.message,
    });
  }
};

module.exports = addBook;
