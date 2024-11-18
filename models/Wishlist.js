const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., Pending, Completed
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
