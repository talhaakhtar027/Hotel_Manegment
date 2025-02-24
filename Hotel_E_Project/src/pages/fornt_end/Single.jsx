import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { HiOutlineUserCircle, HiOutlineArrowsExpand, HiCheck } from "react-icons/hi";
import { BiBed } from "react-icons/bi";
import Breadcrumb from "./component/Breadcrumb";
import Button from "./component/Button";
import RoomPageSlider from "./component/RoomPageSlide";
import Navbar from "./component/Navbar";
import sectionImg3 from '/assets/images/bg-room.jpg';
import './fornt_end_css/css/style1.css';

const Single = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
              <Link to="/booking">
                <Button
                  text="Book Now"
                  sx={{
                    backgroundColor: '#e57c00',
                    '&:hover': { backgroundColor: '#cc6d00' },
                    color: 'black',
                  }}
                />
              </Link>
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
    </>
  );
};

export default Single;
