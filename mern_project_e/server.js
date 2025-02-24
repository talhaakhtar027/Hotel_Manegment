const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop the server if database fails
  });

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);



const roomRoutes = require('./routes/roomRoutes'); // Fixed typo
app.use('/api/rooms', roomRoutes);

const userRoutes = require('./routes/userRoutes'); // Fixed typo
app.use('/api/users', userRoutes);


// Protected Route Example

const authenticateToken = require('./routes/userRoutes'); // Fixed typo
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
