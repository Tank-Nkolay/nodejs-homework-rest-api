const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { BASE_URL } = process.env;
const { sendEmail } = require("../helpers/sendEmail");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }
  const verificationToken = uuidv4();

  const hashPassword = await bcrypt.hashSync(password, 10);
  const avatarURL = gravatar.url(email);

  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirm registration",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${verificationToken}'>Click for confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      password,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = { signup };
