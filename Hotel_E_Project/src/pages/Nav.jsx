import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/Navber.css";

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    navigate("/app/login"); // Redirect to login page
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-gray-900 p-4 text-white">
        <div className="text-2xl font-bold">Hotel Booking</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app/rooms">Rooms</Link>
          </li>
          <li>
            <Link to="/app/bookings">Bookings</Link>
          </li>
          {token ? (
            // Show Logout button when logged in
            <li onClick={handleLogout} >

              Logout

            </li>
          ) : (
            // Show Login button when logged out
            <li>
              <Link to="/app/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
