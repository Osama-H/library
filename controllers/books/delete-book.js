const Book = require("../../models/book");
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
    res.status(400).json({
      status: "fail",
      err: err.message,
    });
  }
};

module.exports = deleteBook;
