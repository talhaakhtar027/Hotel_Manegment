import { useState, useEffect } from "react";
import "../assets/css/Bookings.css";
import Nav from "./Nav";

export default function Bookings() {
  const [rooms, setRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const API_URL = "http://localhost:3000/api";

  async function fetchRooms() {
    try {
      const [bookingsResponse, roomsResponse] = await Promise.all([
        fetch(`${API_URL}/bookings/`),
        fetch(`${API_URL}/rooms`),
      ]);
      
      const bookings = await bookingsResponse.json();
      const rooms = await roomsResponse.json();
      
      setRooms(
        rooms.map((room) => ({
          ...room,
          isBooked: bookings.some(
            (booking) => booking.room._id === room._id && booking.status !== "Cancelled"
          ),
        }))
      );
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  async function checkAvailability(roomId) {
    try {
      const response = await fetch(`${API_URL}/bookings/availability/${roomId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch availability: ${response.availabilityText}`);
      }
      const data = await response.json();
      alert(`Room is ${data.availability === "Booknow" ? "Available" : "Not Available"}`);
    } catch (error) {
      console.error("Error checking room availability:", error);
      alert("There was an error checking the room availability. Please try again later.");
    }
  }

  function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in first!");
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (error) {
      console.error("Invalid token format", error);
      alert("Invalid token. Please log in again.");
      return null;
    }
  }

  const handleBooking = async (roomId, price) => {
    const userId = getUserIdFromToken();
    if (!userId || !roomId) return;
    const checkInDate = prompt("Enter check-in date (YYYY-MM-DD):");
            const checkOutDate = prompt("Enter check-out date (YYYY-MM-DD):");

    const bookingData = {
      username: userId,
      room: roomId,
      checkInDate,
      checkOutDate,
      totalAmount: price
  };

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      alert(data.message || "Booking Successful!");
      fetchRooms();
    } catch (error) {
      alert("Failed to book room. Please try again.");
    }
  };

  return (
    <>
    < Nav />
    <div id="rooms" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
      {rooms.map((room) => (
        <div key={room._id} className="room-card border p-4 rounded shadow-lg bg-white">
          <div className="image-container">
            {Array.isArray(room.images) && room.images.length > 0 ? (
              room.images.map((img, index) => (
                <img
                  key={index}
                  src={img.startsWith("http") ? img : `/uploads/${img}`}
                  className="image-preview w-full h-40 object-cover rounded"
                  alt={`Room ${room.roomNumber}`}
                />
              ))
            ) : (
              <img
                src="/uploads/default-room.jpg"
                className="image-preview w-full h-40 object-cover rounded"
                alt="Default Room"
              />
            )}
          </div>
          <h3 className="text-xl font-semibold mt-2">Room {room.roomNumber} - {room.type}</h3>
          <p className="text-gray-600">Price: ${room.price}/night</p>
          <p className="text-gray-700">{room.description}</p>
          <button
            onClick={() => checkAvailability(room._id)}
            className="mt-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
          >
            Check Availability
          </button>
          {room.isBooked || room.availability !== "Booknow" ? (
            <p className="mt-1 p-2 bg-red-500 text-white px-3 py-2 font-bold rounded inline-block">
              Booked
            </p>
          ) : (
            <button
              onClick={() => handleBooking(room._id, room.price)}
              className="mt-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            >
              Book Now
            </button>
          )}
        </div>
      ))}
    </div>
    </>
  );
}