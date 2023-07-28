const Book = require("../../models/book");
const AppError = require("../utils/appError");

const createBookSchema = require("./utils/update-book-schema");

const updateBook = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const result = await createBookSchema.validateAsync(req.body);

    const findBook = await Book.findByPk(bookId);
    if (!findBook) {
      throw new AppError("Book Not Found", 404);
    }

    await Book.update(result, { where: { id: bookId } });

    res.json({
      status: "Success",
      message: "Book Updated Successully",
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

module.exports = updateBook;
