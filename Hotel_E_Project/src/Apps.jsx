import React from "react";
import { Routes, Route } from "react-router-dom";
import Loginuser from "./pages/fornt_end/component/Loginuser";
import Booking from "./pages/fornt_end/Booking"
import "./assets/css/Navber.css";
import Home from "./pages/fornt_end/Home";
import About from "./pages/fornt_end/About";
import Room from "./pages/fornt_end/Room";
import Gallery from "./pages/fornt_end/Gallery";
import Contact from "./pages/fornt_end/data/Contact";
import Single from "./pages/fornt_end/Single";

function Apps() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/single/:id" element={<Single />} />
        <Route path="/login" element={<Loginuser />} />
      </Routes>
    </div>
  );
}

// Sample Home Component


export default Apps;
