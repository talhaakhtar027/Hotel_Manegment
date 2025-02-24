import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import Breadcrumb from './component/Breadcrumb';
import RoomsCompenent from './component/RoomsCompenent';
import sectionImg3 from '/assets/images/room-bg1.3a17f7238afe7753f573.jpg';
import './fornt_end_css/css/style1.css';

const Room = () => {
  const main = useRef(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Background Image Section */}
      <Box
        className="backimage"
        sx={{
          position: 'absolute',
          backgroundImage: `url(${sectionImg3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '330vh',
          zIndex: -1, // Ensure this stays behind the navbar
        }}
      >
        <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      </Box>

      {/* Navbar Section */}
      <Box className="content" sx={{ position: 'relative', zIndex: 10 }}>
        {/* Ensure navbar is above the background */}
        <nav className="navbar" style={{ position: 'relative', zIndex: 20 }}>
          <div className="logo">Marina Hotel</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/app/about">About</Link></li>
            <li><Link to="/app/rooms">Rooms</Link></li>
            <li><Link to="/app/booking">Booking</Link></li>
            <li><Link to="/app/gallery">Gallery</Link></li>
            <li><Link to="/app/contact">Contact</Link></li>
          </ul>
          <Button variant="contained" sx={{ backgroundColor: '#e57c00', '&:hover': { backgroundColor: '#cc6d00' } }}>Booking</Button>
        </nav>
      </Box>

      {/* Breadcrumb Section */}
      <Breadcrumb text1="We Are" text2="Seaside" sx={{ top: '30%' }} />

      {/* Rooms Section */}
      <Box className="section-3" py={10}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <RoomsCompenent gridCols={'grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1'} />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Room;
