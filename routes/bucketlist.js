const express = require('express');
const Bucketlist = require('../models/Bucketlist');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Bucketlist.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const {name,amount,deadline,status} = req.body;

  const newItem = new Bucketlist({ name,amount,deadline,status });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing item in the bucket list
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, amount, deadline, status } = req.body;

  // Validate request payload
  if (!name || !amount || !deadline || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Find the item by ID and update it
    const updatedItem = await Bucketlist.findByIdAndUpdate(
      id,
      { name, amount, deadline, status },
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
    await Bucketlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
