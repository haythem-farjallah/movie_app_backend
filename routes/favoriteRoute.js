const express = require("express");
const { protect } = require("../service/userService");
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require("../service/favoriteService");

const router = express.Router();

router.post("/add", protect, addFavorite);
router.get("/all", protect, getFavorites);
router.delete("/delete/:imdbId", protect, deleteFavorite);

module.exports = router;
