const express = require('express');
const cors = require('cors');
require('colors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('./model/user'); // Import your user model

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB


// POST route for login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;  // `password` here refers to the plain password from the user input
    try {
        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Log the user object to check if the Password is available
        console.log("User password from DB:", user.Password);

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // Generate and send token if credentials are valid
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        
        // Log the token to the console
        console.log("Generated token:", token);

        res.json({ success: true, token });
    
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "An error occurred during login." });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`.blue.bold);
});
