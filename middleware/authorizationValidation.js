function authorizationValidation(req, res, next) {
  if (res.locals.userId !== req.params.userId)
    return res.status(400).json({ error: "Unauthorized access" });

  return next();
}

module.exports = authorizationValidation;
