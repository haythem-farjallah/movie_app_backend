const express = require("express");
const {
  login,
  signUp,
  protect,
  forgetPasswordSendEmail,
  forgetPasswordVerifyCode,
  updateProfile,
  forgetPassword,
} = require("../service/userService");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.put("/sendEmail", forgetPasswordSendEmail);
router.put("/verify", forgetPasswordVerifyCode);
router.put("/forgetpassword", forgetPassword);
router.patch("/update-profile", protect, updateProfile);

module.exports = router;
