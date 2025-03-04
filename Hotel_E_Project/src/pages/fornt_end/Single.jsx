import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineUserCircle, HiOutlineArrowsExpand, HiCheck } from "react-icons/hi";
import { BiBed } from "react-icons/bi";
import Breadcrumb from "./component/Breadcrumb";
import RoomPageSlider from "./component/RoomPageSlide";
import Navbar from "./component/Navbar";
import sectionImg3 from '/assets/images/bg-room.jpg';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button as MUIButton } from "@mui/material";
import './fornt_end_css/css/style1.css';

const Single = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const { id } = useParams();
  const imgRef = useRef(null);

  const fetchRoomData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/rooms/${id}`);
      if (!response.ok) {
        throw new Error("Room not found");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch room details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderAmenities = (amenities) => {
    if (!amenities) return <p>No amenities available.</p>;

    const amenitiesArray = Array.isArray(amenities)
      ? amenities
      : amenities.split(',').map(item => item.trim());

    return (
      <ul className="contact-text font-light">
        {amenitiesArray.map((amenity, index) => (
          <li key={index} className="flex items-center gap-2">
            <HiCheck className="text-green-500" /> {amenity}
          </li>
        ))}
      </ul>
    );
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in first!");
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  };

  const bookRoom = useCallback(async (roomId, price) => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    const bookingData = {
      username: userId,
      room: roomId,
      checkInDate,
      checkOutDate,
      totalAmount: price
    };

    try {
      const response = await fetch(`http://localhost:3000/api/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const result = await response.json();
      alert(result.message || 'Booking successful!');
      setIsModalOpen(false); // Close modal after successful booking
    } catch (error) {
      console.error("Booking failed:", error);
    }
  }, [checkInDate, checkOutDate]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!data) {
    return <p className="text-center text-white">Room not found</p>;
  }

  return (
    <>
      <Navbar />
      <div
        className="bg-cover bg-top fixed w-full h-[100vh] -z-50"
        style={{ backgroundImage: `url(${sectionImg3})` }}
      >
        <div className="h-full bg-black/40"></div>
      </div>

      <Breadcrumb text1={data.type} text2={`Room ${data.roomNumber}`} />

      <div className="m-auto px-12 max-xl:px-4 flex justify-center items-center">
        <div className="p-8 max-md:px-4 w-full bg-black/40">
          {/* Room Slider */}
          <RoomPageSlider
            Images={data.images}
            imgRef={imgRef}
            ActiveImg={(e) => {
              const modalImage = document.getElementById("img_modal");
              if (modalImage) {
                modalImage.src = e.target.src || null;
              }
            }}
            data_modal_target="defaultModal"
            data_modal_toggle="defaultModal"
          />

          {/* Room Information Section */}
          <div className="grid grid-cols-4 max-md:grid-cols-1 max-md:gap-4 border border-white/30 px-4 py-6 my-4">
            {data.capacity && (
              <div>
                <p className="single-info-text">
                  <HiOutlineUserCircle className="h-10 w-auto mr-3" />
                  {data.capacity} Guests
                </p>
              </div>
            )}

            {data.floor && (
              <div>
                <p className="single-info-text">
                  <HiOutlineArrowsExpand className="h-10 w-auto mr-3" />
                  Floor {data.floor}
                </p>
              </div>
            )}

            {data.price && (
              <div>
                <p className="single-info-text">
                  <BiBed className="h-10 w-auto mr-3" />${data.price} / Night
                </p>
              </div>
            )}

            <div className="flex justify-center items-center max-md:block">
              <MUIButton  variant="contained" sx={{
  textTransform: 'none',
  borderRadius: '12px',
  padding: '10px 20px',
  fontWeight: 'bold',
  backgroundColor: '#e57c00',
  '&:hover': { backgroundColor: '#cc6d00' },
  color: 'black',
}} onClick={() => setIsModalOpen(true)}>
                Book Now
              </MUIButton>
            </div>
          </div>

          {/* Room Overview & Features */}
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
            <div className="col-span-2">
              <h3 className="contact-heading">Room Overview</h3>
              <p className="contact-text font-light">{data.description}</p>
            </div>
            <div>
              <h3 className="contact-heading">Room Facilities</h3>
              {renderAmenities(data.amenities)}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Booking */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Book Room</DialogTitle>
        <DialogContent>
           <div className="mb-5">
            <TextField
              label="Check-In Date"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Check-Out Date"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={() => setIsModalOpen(false)} sx={{
        textTransform: 'none',
        borderRadius: '12px',
        padding: '10px 20px',
        fontWeight: 'bold',
       
          backgroundColor: 'black',
          '&:hover': { backgroundColor: 'red' },
          color: 'white',
       
      }}>
            Cancel
          </MUIButton>
          <MUIButton
            onClick={() => bookRoom(data._id, data.price)}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              padding: '10px 20px',
              fontWeight: 'bold',
             
                backgroundColor: '#e57c00',
                '&:hover': { backgroundColor: '#cc6d00' },
                color: 'black',
             
            }}
          >
            Confirm Booking
          </MUIButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Single;
