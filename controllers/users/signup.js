const bcrypt = require("bcrypt");
const User = require("./../../models/user");

const db = require("./../../config/database");

const generateToken = require("./utils/generateToken");
const AppError = require("./../utils/appError");

const signupSchema = require("./utils/signup-schema");

const signup = async (req, res, next) => {
  let {
    username,
    email,
    password,
    passwordConfirm,
    nationality,
    country,
    city,
  } = req.body;

  const transaction = await db.transaction();
  try {
    const isValid = await signupSchema.validateAsync(req.body);

    if (!isValid) throw new Error("VALIDATION_ERROR");

    const user = await User.findOne({ where: { email } });

    if (user) throw new AppError("User Already Registerd", 409);

    if (password != passwordConfirm) {
      throw new AppError("Passwords Aren't the Same", 403);
    }

    password = await bcrypt.hash(password, 12);

    const newUser = await User.create(
      {
        email,
        username,
        password,
        nationality,
      },
      { transaction }
    );

    // await newUser.createAddress({ country, city }, { transaction });

    const token = generateToken(newUser.id);

    await transaction.commit();

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    await transaction.rollback();

    let statusCode;
    if (err instanceof AppError) {
      statusCode = err.statusCode;
    } else if (err.isJoi) {
      statusCode = 422;
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
