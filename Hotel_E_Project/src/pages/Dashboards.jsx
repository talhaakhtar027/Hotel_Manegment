import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/Navber.css";

function Dashboards() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("authToken"); // Remove token
  //   navigate("/app/login"); // Redirect to login page
  // };

  return (
    <>
      <nav className="flex justify-between items-center bg-gray-900 p-4 text-white">
        <div className="text-2xl font-bold">Admin Panel </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/admin/adminNav">Dashboards</Link>
          </li>
          <li>
            <Link to="/admin/user">User</Link>
          </li>
          <li>
            <Link to="/admin/room">Room</Link>
          </li>
          <li>
            <Link to="/admin/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/admin/ManualBooking">ManualBookings</Link>
          </li>
        
        </ul>
      </nav>
    </>
  );
}



export default Dashboards;
