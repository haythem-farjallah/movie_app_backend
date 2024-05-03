const { default: mongoose } = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imdbID: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: Number,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
