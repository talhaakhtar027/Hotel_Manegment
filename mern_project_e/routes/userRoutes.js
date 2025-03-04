const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const loginController = require('../controllers/login12');
const { verifyToken } = require('../middlewares/authMiddleware'); // Make sure you import the token verification middleware

// Define routes
router.get('/', userController.getusers); // Fetch all users
router.get('/count', userController.getuserscount); // Get user count
router.post('/', userController.postusers); // Add a new user
router.put('/:id', userController.putusersid); // Update user by ID
router.delete('/:id', userController.deleteusersid); // Delete user by ID

// Authentication routes
router.post("/login", loginController.postlogin); // Login user
router.post("/register", loginController.register); // Register user

// Profile routes (protected by token verification)
router.get("/me", verifyToken, userController.getUserProfile); // Get current user's profile
router.put("/me", verifyToken, userController.updateUserProfile); // Update current user's profile

module.exports = router;
