const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    SelectedRoom: String,
    Adults: Number,
    Children: Number,
    TimeSlot: String,
    Name: String,
    Email: String,
    Number: String,
    Message: String,
    SelectedDates: [String], // Array of dates (Check-in and Check-out)
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "CheckedIn", "CheckedOut", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookingmanual", bookingSchema);
