const User = require("../../models/userModel");
const AppError = require("../utils/appError");

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password", "email", "updatedAt", "deletedAt"],
      },
    });
    if (!user) {
      throw new AppError("User Not Found", 404);
    }
    const books = await user.getBooks({
      attributes: {
        exclude: ["UserId", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    if (!books.length) {
      return res.json({
        status: "success",
        user,
        books: "User Doesn't have a books",
      });
    }

    res.status(200).json({
      status: "success",
      user,
      numOfBooks: books.length,
      books,
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

module.exports = getUser;
