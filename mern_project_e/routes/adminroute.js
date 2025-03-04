const express = require('express');
const { postadminlogin } = require('../controllers/adminlogin'); // Import the controller
const router = express.Router();

// POST request for admin login
router.post('/login', postadminlogin);

module.exports = router;
