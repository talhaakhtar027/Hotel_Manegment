import React from "react";
import { Routes, Route } from "react-router-dom";

import UserManagement from "./admin/UserManagement";
import Bookings from "./admin/BookingMangement";
import RoomManagement from "./admin/RoomManagement";
import AdminNav from "./admin/AdminNav";

function Adminrouter() {
  return (
    <div>
      <Routes>
  <Route path="/" element={<AdminNav />} />
  <Route path="/user" element={<UserManagement />} />
  <Route path="/bookings" element={<Bookings />} />
  <Route path="/room" element={<RoomManagement />} />
</Routes>

    </div>
  );
}

// Sample Home Component
// const Dashboard = () => <>  < Dashboards  /></>;
export default Adminrouter;
