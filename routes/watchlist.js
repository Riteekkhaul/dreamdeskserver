const express = require('express');
const Watchlist = require('../models/Watchlist');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Watchlist.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { category, name, releaseDate } = req.body;

  const newItem = new Watchlist({ category, name, releaseDate });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing item in the watchlist
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, releaseDate, category } = req.body;

  // Validate request payload
  if (!name || !releaseDate || !category) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Find the item by ID and update it
    const updatedItem = await Watchlist.findByIdAndUpdate(
      id,
      { name, releaseDate, category },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'An error occurred while updating the item.' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
