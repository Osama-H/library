const Book = require("../../models/book");
const AppError = require("../utils/appError");

const getBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.findAll({
      attributes: { exclude: ["updatedAt"] },
      limit: 10,
      order: [["review", "DESC"]],
    });

    if (!allBooks.length) {
      throw new AppError("No Books Found", 404);
    }

    res.json({
      status: "success",
      allBooks,
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

module.exports = getBooks;
