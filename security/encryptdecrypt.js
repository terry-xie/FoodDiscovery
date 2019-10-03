const bcrypt = require("bcryptjs");

module.exports.hash = async (plainText, saltRounds) => {
  const hashedText = await bcrypt.hash(plainText, saltRounds);
  return hashedText;
};

module.exports.compare = async (plainText, hashedText) => {
  const isMatch = await bcrypt.compare(plainText, hashedText);
  return isMatch;
};
