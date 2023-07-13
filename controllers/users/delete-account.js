const User = require("./../../models/userModel");

const deleteMyAccount = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
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

module.exports = deleteMyAccount;
