module.exports = (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `${req.originalUrl} not Found`,
  });
};
