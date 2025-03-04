import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Dashboards from "../Dashboards";

const API_URL = "http://localhost:3000/api/rooms";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "",
    price: "",
    status: "Available",
    capacity: "",
    cleaningStatus: "Clean",
    amenities: "", // Amenity as comma separated string
    description: "",
    floor: "",
    images: [], // images will hold file references
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const response = await axios.get(API_URL);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({ ...prevState, images: e.target.files }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const saveRoom = async () => {
    // Validate required fields
    const requiredFields = [
      "roomNumber",
      "type",
      "price",
      "capacity",
      "amenities",
      "description",
      "floor",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    // Ensure amenities is an array (if user enters a string, convert it)
    let updatedFormData = { ...formData };
    if (typeof updatedFormData.amenities === "string") {
      updatedFormData.amenities = updatedFormData.amenities
        .split(",")
        .map((a) => a.trim());
    }

    // Check if at least one amenity is provided
    if (updatedFormData.amenities.length === 0) {
      alert("Please enter at least one amenity.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(updatedFormData).forEach((key) => {
      if (key === "images") {
        Array.from(updatedFormData.images).forEach((image) => {
          formDataToSend.append("images", image);
        });
      } else {
        formDataToSend.append(key, updatedFormData[key]);
      }
    });

    try {
      if (editingId) {
        // Update existing room
        await axios.put(`${API_URL}/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create new room
        await axios.post(API_URL, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      handleClose();
      getRooms();
    } catch (error) {
      console.error("Error saving room:", error.response ? error.response.data : error);
      alert(error.response?.data?.error || "Failed to save room.");
    }
  };

  const editRoom = (room) => {
    setFormData({
      ...room,
      amenities: room.amenities.join(", "),  // Join array back into comma-separated string for editing
      images: [], // Clear image files as they can't be pre-filled
    });
    setEditingId(room._id);
    handleOpen();
  };

  const deleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        getRooms();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  const clearForm = () => {
    setFormData({
      roomNumber: "",
      type: "",
      price: "",
      status: "Available",
      capacity: "",
      cleaningStatus: "Clean",
      amenities: "", // Reset to empty string
      description: "",
      floor: "",
      images: [],
    });
    setEditingId(null);
  };

  return (
    <>
      <Dashboards />
      <Container>
        <Typography variant="h4" gutterBottom>
          Room Management
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Room
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>{editingId ? "Edit Room" : "Add Room"}</DialogTitle>
          <DialogContent>
            <TextField
              name="roomNumber"
              label="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
         <InputLabel>Type</InputLabel>
<Select
  name="type"
  value={formData.type}
  onChange={handleChange}
  fullWidth
  label="Type"
>
  <MenuItem value="Standard Room">Standard Room</MenuItem>
  <MenuItem value="Deluxe Room">Deluxe Room</MenuItem>
  <MenuItem value="Premier Room">Premier Room</MenuItem>
  <MenuItem value="Family Suite">Family Suite</MenuItem>
  <MenuItem value="Luxury Suite">Luxury Suite</MenuItem>
  <MenuItem value="President Suite">President Suite</MenuItem>
</Select>


            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="capacity"
              label="Capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="amenities"
              label="Amenities (comma separated)"
              value={formData.amenities}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="floor"
              label="Floor Number"
              type="number"
              value={formData.floor}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Room Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={saveRoom}
            >
              {editingId ? "Update" : "Save"} Room
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Cleaning Status</TableCell>
                <TableCell>Amenities</TableCell>
                <TableCell>Floor</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room._id}>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>${room.price}</TableCell>
                    <TableCell>{room.status}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>{room.cleaningStatus}</TableCell>
                    <TableCell>{room.amenities.join(", ")}</TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>
                      {room.images?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="room"
                          width={50}
                          height={50}
                          style={{ marginRight: 5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => editRoom(room)}
                        style={{ marginRight: 5 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteRoom(room._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default RoomManagement;
