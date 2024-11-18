// routes/siteRoutes.js
const express = require('express');
const router = express.Router();
const Site = require('../models/Site'); // Import the Site model

// Route to get all sites
router.get('/', async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sites', error });
  }
});

// Route to get a single site by ID
router.get('/:id', async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json(site);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching site', error });
  }
});

// Route to create a new site
router.post('/', async (req, res) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return res.status(400).json({ message: 'Name and URL are required' });
  }

  try {
    const newSite = new Site({ name, link});
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (error) {
    res.status(500).json({ message: 'Error creating site', error });
  }
});

// Route to update a site by ID
router.put('/:id', async (req, res) => {
  const { name, link } = req.body;

  try {
    const updatedSite = await Site.findByIdAndUpdate(
      req.params.id,
      { name, link },
      { new: true } // Return the updated document
    );

    if (!updatedSite) return res.status(404).json({ message: 'Site not found' });

    res.json(updatedSite);
  } catch (error) {
    res.status(500).json({ message: 'Error updating site', error });
  }
});

// Route to delete a site by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSite = await Site.findByIdAndDelete(req.params.id);
    if (!deletedSite) return res.status(404).json({ message: 'Site not found' });
    res.json({ message: 'Site deleted successfully', site: deletedSite });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting site', error });
  }
});

module.exports = router;
