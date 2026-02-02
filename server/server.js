require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./models/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database (if MongoDB URI is provided)
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/officers', require('./routes/officers'));
app.use('/api/mentors', require('./routes/mentors'));
app.use('/api/events', require('./routes/events'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api', require('./routes/content'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IEEE JSU API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For Vercel, don't listen on a port
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
