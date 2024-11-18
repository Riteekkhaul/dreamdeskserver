require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const watchlistRoutes = require('./routes/watchlist');
const wishlistRoutes = require('./routes/wishlist');
const jobRoutes = require('./routes/jobs');
const bucketlistRoutes = require('./routes/bucketlist');
const siteRoutes = require('./routes/site');

app.use('/api/watchlist', watchlistRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/bucketlist', bucketlistRoutes);
app.use('/api/sites', siteRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
