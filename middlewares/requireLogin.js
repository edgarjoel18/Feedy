const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ errorMessage: "You must be logged in" });
  }
  next();
};

module.exports = requireLogin;
