const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  appliedDate: { type: Date, required: true },
  site: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true }, // e.g., Applied, Interviewing, Hired, Rejected
});

module.exports = mongoose.model('Job', JobSchema);
