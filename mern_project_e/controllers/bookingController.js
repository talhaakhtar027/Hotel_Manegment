const Booking = require('../model/booking');
const mongoose = require('mongoose'); 
const Room = require('../model/room');
const booking = require('../model/booking');

const Bookingmanual = require('../model/manualbooking');



exports.postcreatebookingmanual =  async (req, res) => {
  try {
    const newBooking = new Bookingmanual(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
}

// Helper function to normalize the date format (e.g. '2021-02-1' -> '2021-02-01')
function normalizeDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}



// ✅ Create a Booking
exports.createBooking = async (req, res) => {
  try {
    console.log("Booking Request Data:", req.body); // Log request data

    const { username, room, checkInDate, checkOutDate, totalAmount } = req.body;

    // Normalize the date format
    const normalizedCheckInDate = normalizeDate(checkInDate);
    const normalizedCheckOutDate = normalizeDate(checkOutDate);

    // ✅ Check for missing fields
    if (!username || !room || !normalizedCheckInDate || !normalizedCheckOutDate || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if Room ID is valid
    if (!mongoose.Types.ObjectId.isValid(room)) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }

    // ✅ Check if User ID is valid
    if (!mongoose.Types.ObjectId.isValid(username)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // ✅ Validate the check-in and check-out dates (only checking day, month, year)
    const checkIn = new Date(normalizedCheckInDate);
    const checkOut = new Date(normalizedCheckOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const checkInDay = checkIn.getDate();
    const checkInMonth = checkIn.getMonth(); // Month is 0-indexed
    const checkInYear = checkIn.getFullYear();

    const checkOutDay = checkOut.getDate();
    const checkOutMonth = checkOut.getMonth(); // Month is 0-indexed
    const checkOutYear = checkOut.getFullYear();

    if (checkInYear > checkOutYear || 
        (checkInYear === checkOutYear && checkInMonth > checkOutMonth) || 
        (checkInYear === checkOutYear && checkInMonth === checkOutMonth && checkInDay >= checkOutDay)) {
      return res.status(400).json({ message: "Check-in date must be before check-out date" });
    }

    // ✅ Ensure check-in date is not in the past
    const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); // Set to midnight (00:00:00) to compare only the date part

if (checkIn < currentDate) {
  return res.status(400).json({ message: "Check-in date must be today or in the future" });
}

    // ✅ Check if room exists
    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ✅ Check if room is already booked
    const existingBooking = await Booking.findOne({
      room,
      status: { $nin: ['Cancelled', 'CheckedOut'] },
      $or: [
        { checkInDate: { $lt: normalizedCheckOutDate }, checkOutDate: { $gt: normalizedCheckInDate } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Room is not available for these dates" });
    }

    // ✅ Create new booking
    const newBooking = new Booking({ username, room, checkInDate: normalizedCheckInDate, checkOutDate: normalizedCheckOutDate, totalAmount });
    await newBooking.save();

    // ✅ Mark room as unavailable
    await Room.findByIdAndUpdate(room, { availability: "Booked" });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking Error:", error); // Log full error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.putbookingstaus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Status updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Server error", error });
  }
}


// ✅ Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getAllBookingsuserroom = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("username", "name email") // Get user name & email
      .populate("room", "roomNumber"); // Get room number

    res.json({ data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};


exports.getbookingscount = async (req, res) => {
  try {
      const BookingCount = await Booking.countDocuments();
      res.json({ count: BookingCount });
  } catch (error) {
      res.status(500).json({ message: "Error fetching user count", error });
  }
}

// ✅ Get a Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('username room');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// ✅ Update Booking Status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Update room availability if booking is cancelled or checked out
    if (status === 'Cancelled' || status === 'CheckedOut') {
      await Room.findByIdAndUpdate(booking.room, { availability: true });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// ✅ Delete a Booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Make room available again
    await Room.findByIdAndUpdate(booking.room, { availability: true });

    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// ✅ Check Room Availability
exports.checkRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log(`Checking availability for room ID: ${roomId}`);  // Log roomId to ensure it's correct
    const room = await Room.findById(roomId);

    if (!room) {
      console.log(`Room not found for ID: ${roomId}`);  // Log if room is not found
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    console.log(`Room found: ${room.roomNumber}, availability: ${room.availability}`);  // Log room details
    res.status(200).json({
      success: true,
      roomId: room._id,
      availability: room.availability
    });
  } catch (error) {
    console.error('Error in checkRoomAvailability:', error);  // Log detailed error message
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


// exports.getbookingsuserroom = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("username", "name email") // Populate user details
//       .populate("room", "roomNumber"); // Populate room details

//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch bookings" });
//   }
// }

