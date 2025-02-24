const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Room = require('../model/room'); // Ensure this is correctly pointing to your Room model
const EventEmitter = require('events');

// Initialize Express
const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Serve static files from the "uploads" directory


// Set up Multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and JPG images are allowed'));
    }
    cb(null, true);
  },
});

// Middleware for handling image uploads
exports.uploadRoomImages = upload.array('images', 5);

// Event Emitter
const eventBus = new EventEmitter();
eventBus.setMaxListeners(20);

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    console.log("Fetched Rooms:", rooms);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getroomscount = async (req, res) => {
  try {
      const RoomCount = await Room.countDocuments();
      res.json({ count: RoomCount });
  } catch (error) {
      res.status(500).json({ message: "Error fetching user count", error });
  }
}
// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Invalid room ID format' });
  }
};

// Add a new room with image uploads
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, capacity, description, floor } = req.body;

    if (!roomNumber || !type || !price || !capacity || !description || !floor) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room number already exists' });
    }

    // Store full URL of images
    const imagePaths = req.files ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];

    const room = new Room({
      roomNumber,
      type,
      price,
      capacity,
      description,
      floor,
      images: imagePaths,
    });

    await room.save();
    eventBus.emit('roomCreated', room);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a room with image uploads
exports.updateRoomById = async (req, res) => {
  try {
    const imagePaths = req.files ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(imagePaths.length > 0 && { images: imagePaths }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a room
exports.deleteRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



