const express = require("express");
const router = express.Router();

const {
  userRegisterValidation,
  userLoginValidation,
  patchUpdateSubscValidation,
} = require("../../middlewares/valadationMiddleware");

const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { signup } = require("../../controllers/signup");
const { login } = require("../../controllers/login");
const { logout } = require("../../controllers/logout");
const { updateSubsc } = require("../../controllers/updateSubsc");
const { getCurrent } = require("../../controllers/currentUserController");
const { updateAvatar } = require("../../controllers/updateAvatar");

router.post("/signup", userRegisterValidation, asyncWrapper(signup));
router.post("/login", userLoginValidation, asyncWrapper(login));
router.get("/logout", auth, asyncWrapper(logout));
router.patch("/", auth, patchUpdateSubscValidation, asyncWrapper(updateSubsc));
router.get("/current", auth, asyncWrapper(getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  asyncWrapper(updateAvatar)
);

module.exports = router;
