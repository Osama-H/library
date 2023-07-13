const User = require("./../../models/userModel");

const updateAccount = async (req, res, next) => {
  const { username, nationality } = req.body;
  let finalObject = {};

  if (username) {
    finalObject.username = username;
  }

  if (nationality) {
    finalObject.nationality = nationality;
  }

  try {
    await User.update(finalObject, {
      where: {
        id: req.user.id,
      },
    });
    res.json({
      status: "success",
      message: "Account Updated Successfully",
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

module.exports = updateAccount;
