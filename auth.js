// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Student login route
router.post('/login/student', passport.authenticate('student-local'), (req, res) => {
  res.json({ message: 'Student login successful!' });
});

// Teacher login route
router.post('/login/teacher', passport.authenticate('teacher-local'), (req, res) => {
  res.json({ message: 'Teacher login successful!' });
});

module.exports = router;

// controllers/auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Student Local Strategy
passport.use('student-local', new LocalStrategy((username, password, done) => {
  User.findOne({ username: username, role: 'student' }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!user.verifyPassword(password)) return done(null, false);
    return done(null, user);
  });
}));

// Teacher Local Strategy
passport.use('teacher-local', new LocalStrategy((username, password, done) => {
  User.findOne({ username: username, role: 'teacher' }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!user.verifyPassword(password)) return done(null, false);
    return done(null, user);
  });
}));
