import React from "react";
import { Routes, Route } from "react-router-dom";

import UserManagement from "./admin/UserManagement";
import Bookings from "./admin/BookingMangement";
import RoomManagement from "./admin/RoomManagement";
import AdminNav from "./admin/AdminNav";
import ManualBooking from "./admin/ManualBooking";
import AdminLogin from "./admin/AdminLogin";

function Adminrouter() {
  return (
    <div>
      <Routes>
  <Route path="/adminNav" element={<AdminNav />} />
  <Route path="/user" element={<UserManagement />} />
  <Route path="/bookings" element={<Bookings />} />
  <Route path="/room" element={<RoomManagement />} />
  <Route path="/ManualBooking" element={<ManualBooking />} />
  <Route path="/" element={<AdminLogin />} />
</Routes>

    </div>
  );
}

// Sample Home Component
// const Dashboard = () => <>  < Dashboards  /></>;
export default Adminrouter;
