const express = require('express');
const { createBooking,updateManualBookingStatus, getAllManualBookings, postcreatebookingmanual ,getAllBookingsuserroom, getbookingscount, getAllBookings, getBookingById, updateBookingStatus, deleteBooking, checkRoomAvailability } = require('../controllers/bookingController');

const router = express.Router();

// Booking Routes
router.post('/', createBooking);
router.post('/postcreatebookingmanual', postcreatebookingmanual);
router.get('/count', getbookingscount);
router.get('/manual-bookings', getAllManualBookings);
router.put("/manual-bookings/:bookingId/status", updateManualBookingStatus);
router.get('/', getAllBookings);
router.get('/userroom', getAllBookingsuserroom); // this is user room get
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);
router.get('/availability/:roomId', checkRoomAvailability);

module.exports = router;
