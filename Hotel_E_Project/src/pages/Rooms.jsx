import React, { useEffect, useState } from "react";
import "../assets/css/Rooms.css";
import Nav from "./Nav"

const API_URL = "http://localhost:3000/api/rooms";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "",
    price: "",
    status: "Available",
    capacity: "",
    cleaningStatus: "Clean",
    amenities: "",
    description: "",
    floor: "",
    images: [],
  });
  const [editId, setEditId] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, images: files });

      // Generate image previews
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let roomData;
    if (editId) {
      roomData = JSON.stringify({
        roomNumber: formData.roomNumber,
        type: formData.type,
        price: formData.price,
        status: formData.status,
        capacity: formData.capacity,
        cleaningStatus: formData.cleaningStatus,
        amenities: formData.amenities,
        description: formData.description,
        floor: formData.floor,
      });
    } else {
      roomData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          Array.from(formData.images).forEach((file) => roomData.append("images", file));
        } else {
          roomData.append(key, formData[key]);
        }
      });
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const options = {
        method,
        body: roomData,
        headers: editId ? { "Content-Type": "application/json" } : {},
      };

      await fetch(url, options);
      setEditId(null);
      setFormData({
        roomNumber: "",
        type: "",
        price: "",
        status: "Available",
        capacity: "",
        cleaningStatus: "Clean",
        amenities: "",
        description: "",
        floor: "",
        images: [],
      });
      setImagePreviews([]); // Clear previews
      fetchRooms();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleEdit = (room) => {
    setEditId(room._id);
    setFormData({ ...room, images: [] });
    setImagePreviews([]); // Clear previews when editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchRooms();
    }
  };

  return (
    <>
    <Nav />
    <div className="room-container">
      
      <h2>Room Management</h2>
      <h3>{editId ? "Edit Room" : "Add a New Room"}</h3>
      <form onSubmit={handleSubmit} className="room-form">
        <input name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="Room Number" required />
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Cleaning">Cleaning</option>
        </select>
        <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} placeholder="Capacity" required />
        <select name="cleaningStatus" value={formData.cleaningStatus} onChange={handleChange} required>
          <option value="Clean">Clean</option>
          <option value="Needs Cleaning">Needs Cleaning</option>
          <option value="Being Cleaned">Being Cleaned</option>
        </select>
        <input name="floor" type="number" value={formData.floor} onChange={handleChange} placeholder="Floor" required />
        <input name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

        <label>Upload Images:</label>
        <input type="file" multiple onChange={handleChange} />

        <div className="image-preview">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt="Preview" />
          ))}
        </div>

        <button type="submit">{editId ? "Update Room" : "Save Room"}</button>
      </form>

      <h2>Available Rooms</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Capacity</th>
            <th>Floor</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {rooms.map((room) => (
  <tr key={room._id}>
    <td>{room.roomNumber}</td>
    <td>{room.type}</td>
    <td>${room.price}</td>
    <td>{room.status}</td>
    <td>{room.capacity}</td>
    <td>{room.floor}</td>
    <td>
      {Array.isArray(room.images) ? (
        room.images.map((img, index) => (
          <img
            key={index}
            src={img.startsWith("http") ? img : `/uploads/${img}`}
            alt="Room"
            className="image-preview"
          />
        ))
      ) : (
        <img
          src={room.images?.startsWith("http") ? room.images : `/uploads/${room.images}`}
          alt="Room"
          className="image-preview"
        />
      )}
    </td>
    <td>
      <button onClick={() => handleEdit(room)} className="edit-btn">Edit</button>
      <button onClick={() => handleDelete(room._id)} className="delete-btn">
        Delete
      </button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
    </>
  );
};

export default Rooms;
