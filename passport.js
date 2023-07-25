// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

// MongoDB setup - replace with your actual MongoDB connection string
const dbURI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Register the authentication routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Register the CRUD routes for courses
const courseRoutes = require('./routes/courses');
app.use('/api', courseRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
