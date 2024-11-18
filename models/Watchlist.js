const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., Movies, Web-series, Anime
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
