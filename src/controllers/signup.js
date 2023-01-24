const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = await bcrypt.hashSync(password, 10);
  const avatarURL = gravatar.url(email);

  await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email,
      password,
      avatarURL,
    },
  });
};

module.exports = { signup };
