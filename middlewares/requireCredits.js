module.exports = (req, res, next) => {
  if (req.user.credits < 1)
    return res.status(403).send({ error: "Not enough credits" }); // 403 forbidden because the user does not have
  // enough credits
  next();
};
