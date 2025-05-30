const express = require('express');
const cors = require('cors');
require('colors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const  User  = require('../model/user'); // Import your schema

const app = express();

app.use(cors());
app.use(express.json());

// GET API: Fetch all users
exports.getusers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(`📥 GET Request - Fetched ${users.length} Users`.cyan.bold);
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (err) {
        console.error('❌ Error fetching users:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: err.message, // Include error message for debugging
        });
    }
}

exports.getuserscount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ count: userCount });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user count", error });
    }
}

// POST API: Add a new user
exports.postusers = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !password) {
            console.log('⚠️ Validation Error: Missing required fields'.yellow);
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt rounds of 10

        const newUser = await User.create({ name, email, phone, password: hashedPassword, role });
        console.log(`✅ User added: ${newUser.name} (${newUser.email})`.green.bold);

        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: newUser,
        });
    } catch (err) {
        console.error('❌ Error adding user:'.red.bold, err.message.red);
        res.status(500).json({
            success: false,
            message: 'Failed to add user',
        });
    }
}

// PUT API: Update user information
exports.putusersid = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, role } = req.body;

    try {
        // If the password is provided, hash it before updating
        let updatedData = { name, email, phone, role };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10); // Hash new password if provided
        }

        // Find the user by ID and update with new details
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating user'
        });
    }
}

// DELETE API: Delete a user
exports.deleteusersid = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            console.log(`❌ User with ID ${id} not found`.red.bold);
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        console.log(`🗑️ User deleted: ${deletedUser.name} (${deletedUser.email}) (${deletedUser.phone})`.yellow.bold);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (err) {
        console.error('❌ Error deleting user:'.red.bold, err.message.red);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
        });
    }
}
