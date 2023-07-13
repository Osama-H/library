const User = require("./../../models/userModel");

const myProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: req.user.id,
      attributes: {
        exclude: ["password", "updatedAt", "deletedAt"],
      },
    });

    const { createdAt, ...attrs } = user.toJSON();

    const finalUser = {
      ...attrs,
      MemberSince: createdAt,
    };

    res.json({
      status: "success",
      finalUser,
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

module.exports = myProfile;
