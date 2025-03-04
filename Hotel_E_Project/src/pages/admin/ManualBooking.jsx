import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Dashboards from "../Dashboards";

export default function ManualBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Fetch manual bookings
  async function fetchBookings() {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/bookings/manual-bookings`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  async function updateStatus(bookingId, newStatus) {
    try {
      const response = await fetch(`${API_URL}/bookings/manual-bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Optimistic update to improve UI responsiveness
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      setSnackbar({ open: true, message: "Status updated successfully!", severity: "success" });
    } catch (error) {
      console.error("Error updating status:", error);
      setSnackbar({ open: true, message: "Failed to update status.", severity: "error" });
    }
  }
  

  // Format date function
  function formatDate(dateString) {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";
  }

  return (
    <>
      <Dashboards />

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
          <p>Loading bookings...</p>
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Adults</TableCell>
                <TableCell>Children</TableCell>
                <TableCell>Time Slot</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.Name || "Unknown User"}</TableCell>
                  <TableCell>{booking.Email || "No Email"}</TableCell>
                  <TableCell>{booking.Number || "N/A"}</TableCell>
                  <TableCell>{booking.SelectedRoom || "N/A"}</TableCell>
                  <TableCell>{booking.Adults || 0}</TableCell>
                  <TableCell>{booking.Children || 0}</TableCell>
                  <TableCell>{booking.TimeSlot || "N/A"}</TableCell>
                  <TableCell>{booking.Message || "No Message"}</TableCell>
                  <TableCell>{booking.status || "Pending"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateStatus(booking._id, "Confirmed")}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => updateStatus(booking._id, "Cancelled")}
                      sx={{ marginLeft: 1 }}
                    >
                      Cancel
                    </Button>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
