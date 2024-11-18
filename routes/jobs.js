const express = require('express');
const Jobs = require('../models/Jobs');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Jobs.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { companyName, appliedDate, site, password, status } = req.body;

  const newItem = new Jobs({  companyName, appliedDate, site, password, status });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing job
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { companyName, appliedDate, site, password, status } = req.body;

  // Validate request payload
  if (!companyName || !appliedDate || !site || !password || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Find the job by ID and update it
    const updatedJob = await Jobs.findByIdAndUpdate(
      id,
      { companyName, appliedDate, site, password, status },
      { new: true } // Return the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'An error occurred while updating the job.' });
  }
});


// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Jobs.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
