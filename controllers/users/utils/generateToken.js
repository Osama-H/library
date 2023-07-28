const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "3d",
  });
  return token;
};

module.exports = generateToken;
