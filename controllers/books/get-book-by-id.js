const Book = require("./../../models/bookModel");
const AppError = require("../utils/appError");

const getBook = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByPk(bookId, {
      attributes: {
        exclude: ["id", "updatedAt", "UserId"],
      },
    });

    if (!book) {
      throw new AppError("Book Not Found", 404);
    }

    res.json({
      status: "success",
      book,
    });
  } catch (err) {
    let statusCode;
    if (err instanceof AppError) {
      statusCode = err.statusCode;
    } else {
      statusCode = 400;
    }

    res.status(statusCode).json({
      status: "fail",
      err: err.message,
    });
  }
};

module.exports = getBook;
