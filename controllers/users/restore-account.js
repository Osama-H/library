const { Op } = require("sequelize");
const User = require("./../../models/userModel");
const AppError = require("./../utils/appError");

const restoreAccount = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findByPk(userId);
    if (foundUser) {
      throw new Error("User activated Already");
    }

    const user = await User.restore({ where: { id: userId } });

    res.json({
      status: "success",
      user,
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

module.exports = restoreAccount;
