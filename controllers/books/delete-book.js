const Book = require("./../../models/bookModel");
const AppError = require("../utils/appError");

const deleteBook = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new AppError("Book Not Found", 404);
    }

    await Book.destroy({ where: { id: bookId } });

    res.status(204).json({
      status: "success",
      data: null,
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

module.exports = deleteBook;
