const bcrypt = require("bcrypt");
const User = require("./../../models/userModel");
const generateToken = require("./utils/generateToken");
const AppError = require("./../utils/appError");

const signup = async (req, res, next) => {
  const { username, password, passwordConfirm, email, nationality } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new AppError("User Already Registerd", 409);
    }

    if (password != passwordConfirm) {
      throw new AppError("Passwords Aren't the Same", 403);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      nationality,
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (error) {
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

module.exports = signup;
