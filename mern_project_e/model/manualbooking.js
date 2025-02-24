const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  SelectedRoom: String,
  Adults: Number,
  Children: Number,
  TimeSlot: String,
  Name: String,
  Email: String,
  Number: String,
  Message: String,
  SelectedDates: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'CheckedIn', 'CheckedOut', 'Cancelled'],
    default: 'Pending',
  },
},
{ timestamps: true });

module.exports = mongoose.model('Bookingmanual', bookingSchema);
