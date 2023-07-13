const jwt = require("jsonwebtoken");
const User = require('../../../models/userModel');

const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);

    const foundUser = await User.findByPk(decodedPayload.id);

    req.user = foundUser;

    next();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = protect;
