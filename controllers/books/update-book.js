const Book = require("./../../models/bookModel");
const AppError = require("../utils/appError");

const updateBook = async (req, res, next) => {
  const { bookId } = req.params;

  const { name, numOfPages, category, review } = req.body;
  let updates = {};

  if (name) {
    updates.name = name;
  }

  if (numOfPages) {
    updates.numOfPages = numOfPages;
  }

  if (category) {
    updates.category = category;
  }

  if (review) {
    updates.review = review;
  }

  try {
    const findBook = await Book.findByPk(bookId);
    if (!findBook) {
      throw new AppError("Book Not Found", 404);
    }

    await Book.update(updates, { where: { id: bookId } });
    res.json({
      status: "Success",
      message: "Book Updated Successully",
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

module.exports = updateBook;
