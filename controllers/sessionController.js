const User = require("../models/user.js");
const { compare } = require("../security/encryptdecrypt.js");
const { generateToken } = require("../security/token.js");

async function createSession(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(400)
        .send({ Error: "Username does not exist or password is incorrect" });
    const isPasswordMatch = await compare(req.body.password, user.password);
    if (!isPasswordMatch)
      return res
        .status(400)
        .send({ Error: "Username does not exist or password is incorrect" });
    const token = await generateToken(
      { sub: user._id },
      process.env.APP_PRIVATEKEY
    );
    return res.status(201).send({ Token: token });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createSession };
