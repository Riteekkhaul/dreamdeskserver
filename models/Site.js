// models/Site.js
const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    link: { type: String, required: true}
  });

module.exports = mongoose.model('Site', siteSchema);
