const User = require("../models/user.js");
const { hash } = require("../security/encryptdecrypt.js");

async function createUser(req, res, next) {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ error: "user exists" });
    const hashedPassword = await hash(req.body.password, 10);
    user = await User.create({
      username: req.body.username,
      password: hashedPassword
    });
    return res.status(201).json({ _id: user._id, username: user.username });
  } catch (err) {
    return next(err);
  }
}

async function getUser(req, res, next) {
  try {
    let users = await User.find({ _id: res.locals.userId });
    users = users.map(user => {
      return {
        _id: user._id,
        username: user.username
      };
    });
    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    return res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    return next(err);
  }
}

async function updateUserById(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId || res.locals.userId,
      {
        ...(req.body.password && { password: req.body.password })
      },
      { new: true }
    );
    return res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUserById
};
