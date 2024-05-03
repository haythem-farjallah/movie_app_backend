const express = require("express");
const {
  login,
  signUp,
  protect,
  updateProfile,
} = require("../service/userService");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.patch("/update-profile", protect, updateProfile);

module.exports = router;
