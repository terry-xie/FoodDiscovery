const User = require("../models/user.js");
const { hash } = require("../security/encryptdecrypt.js");

function toResponseObj(obj) {
  return {
    id: obj._id,
    username: obj.username
  };
}

async function createUser(req, res, next) {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ error: "User exists" });
    const hashedPassword = await hash(req.body.password, 10);
    user = await User.create({
      username: req.body.username,
      password: hashedPassword
    });
    return res.status(201).json(toResponseObj(user));
  } catch (err) {
    return next(err);
  }
}

async function getUser(req, res, next) {
  try {
    let users = await User.find({ _id: res.locals.userId });
    users = users.map(user => {
      return toResponseObj(user);
    });
    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(toResponseObj(user));
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
    return res.status(200).json(toResponseObj(user));
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
