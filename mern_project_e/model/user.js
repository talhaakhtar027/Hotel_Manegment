// Correct way to export the User model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'], default: 'guest' },
    isActive: { type: Boolean, default: true },
    preferences: { type: Object, default: {} }
});

const User = mongoose.model("User", userSchema);

// Ensure to export like this
module.exports = User;
