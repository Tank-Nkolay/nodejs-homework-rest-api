const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../models/userModel");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imgName = `${id}_${originalname}`;

  const avatar = await Jimp.read(tempUpload);
  avatar.resize(250, 250).write(tempUpload);

  try {
    const resultUpload = path.join(avatarsDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { updateAvatar };
