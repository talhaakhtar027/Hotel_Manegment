const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();  // Make sure to load environment variables
const router = express.Router();

exports.postadminlogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password match the ones in .env
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  try {
    // Create and send a JWT token
    const token = jwt.sign({ email: process.env.ADMIN_EMAIL, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


