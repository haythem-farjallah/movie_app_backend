const asyncHandler = require("express-async-handler");
const Favorite = require("../model/favoriteModel");

exports.addFavorite = asyncHandler(async (req, res, next) => {
  const { title, imageUrl, imdbID, rating } = req.body; // Ensure these fields are provided in the body
  const userId = req.user._id; // Assuming req.user is populated from your authentication middleware

  // Create a new favorite movie directly

  const favorite = await Favorite.create({
    title,
    imageUrl,
    imdbID,
    rating,
    user: userId, // Link this favorite movie to the user
  });

  res.status(201).json({
    message: "Favorite movie added successfully",
    data: favorite,
  });
});

exports.getFavorites = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const favorites = await Favorite.find({ user: userId });

  res.status(200).json({
    message: "Favorite movies retrieved successfully",
    data: favorites,
  });
});

exports.deleteFavorite = asyncHandler(async (req, res, next) => {
  const userId = req.user._id; // Assuming req.user is populated from your authentication middleware
  const { imdbId } = req.params; // Assuming imdbId is passed as a URL parameter
  console.log(imdbId);
  const result = await Favorite.findOneAndDelete({
    user: userId,
    imdbID: imdbId,
  });

  if (!result) {
    return res.status(404).json({
      message:
        "No favorite movie found with the provided IMDb ID for this user.",
    });
  }

  res.status(200).json({
    message: "Favorite movie deleted successfully.",
  });
});
