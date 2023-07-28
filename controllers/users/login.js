const bcrypt = require("bcrypt");
const User = require("./../../models/user");
const AppError = require("../utils/appError");
const generateToken = require("./utils/generateToken");
const loginInSchema = require("./utils/login-schema");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const isValid = await loginInSchema.validateAsync(req.body);

    // if (!isValid) {
    //   throw new Error("VALIDATION_ERROR");
    // }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Email or Password Not Correct", 400);
    }

    const token = generateToken(user.id);

    res.json({
      status: "success",
      token,
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

module.exports = login;
