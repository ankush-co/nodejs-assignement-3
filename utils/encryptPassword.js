const bcrypt = require("bcrypt");

const generateSalt = async () => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  return salt;
};

const generatePassword = async (password) => {
  const salt = await generateSalt();
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

module.exports = generatePassword;
