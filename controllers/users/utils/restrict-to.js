const retrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new Error("You don't have a permission to do this");
    }
  };
};

module.exports = retrictTo;