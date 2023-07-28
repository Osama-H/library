const User = require("./../../models/user");

const deleteMyAccount = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err: err.message,
    });
  }
};

module.exports = deleteMyAccount;
