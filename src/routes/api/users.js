const express = require("express");
const router = express.Router();

const {
  userRegisterValidation,
  userLoginValidation,
  patchUpdateSubscValidation,
} = require("../../middlewares/valadationMiddleware");

const { auth } = require("../../middlewares/auth");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { signup } = require("../../controllers/signup");
const { login } = require("../../controllers/login");
const { logout } = require("../../controllers/logout");
const { updateSubsc } = require("../../controllers/updateSubsc");
const { getCurrent } = require("../../controllers/currentUserController");

router.post("/signup", userRegisterValidation, asyncWrapper(signup));

router.post("/login", userLoginValidation, asyncWrapper(login));

router.get("/logout", auth, asyncWrapper(logout));

router.patch("/", auth, patchUpdateSubscValidation, asyncWrapper(updateSubsc));

router.get("/current", auth, asyncWrapper(getCurrent));

module.exports = router;
