const joi = require("joi");

module.exports = schema => {
  return async (req, res, next) => {
    try {
      await joi.validate(req.body, schema, { abortEarly: false });
      return next();
    } catch (err) {
      return res
        .status(400)
        .send({ Error: err.details.map(x => x.message).join(",") });
    }
  };
};
