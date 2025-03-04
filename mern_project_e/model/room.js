const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['standard_room', 'deluxe_room', 'premier_room', 'family_suite', 'luxury_suite', 'president_suite'],
      required: true,
    },
    
    
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      default: 'Book-Now',
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Cleaning'],
      default: 'Available',
    },
    capacity: {
      type: Number,
      required: true,
    },
    cleaningStatus: {
      type: String,
      enum: ['Clean', 'Needs Cleaning', 'Being Cleaned'],
      default: 'Clean',
    },
    amenities: {
      type: [String],
     
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // URLs of room images
      default: [],
    },
    floor: {
      type: Number,
      required: true,
    },
    // bookingReference: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Booking',
    //   default: null, // Link to a booking if occupied
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
