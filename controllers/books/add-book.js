const Book = require("../../models/bookModel");
const AppError = require("../utils/appError");

const addBook = async (req, res, next) => {
  const { name, numOfPages, category } = req.body;
  try {
    const book = await Book.findOne({
      where: {
        name,
      },
    });

    if (book) {
      throw new AppError("Book Already Exist", 409);
    }

    const newBook = await Book.create({
      name,
      numOfPages,
      UserId: req.user.id,
      category,
    });
    res.status(201).json({
      status: "success",
      newBook,
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

module.exports = addBook;
