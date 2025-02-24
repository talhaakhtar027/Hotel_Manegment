import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'

const Navbar = () => {
  const [scroll, setScroll] = useState('')

  window.onscroll = function () {
    if (window.scrollY > 50) {
      setScroll('down')
    } else {
      setScroll('top')
    }
  }

  return (
    <Box className="content" sx={{ position: 'relative', zIndex: 10  }}>
      {/* Ensure navbar is above the background */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          zIndex: 20,
          transition: 'all 0.3s',
          boxShadow: scroll === 'down' ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            Marina Hotel
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', margin : '10px 20%' }}>
            <ul className="nav-links flex space-x-6 text-white">
              <li>
                <Link to="/" className="text-white hover:text-[#e57c00]">Home</Link>
              </li>
              <li>
                <Link to="/app/about" className="text-white hover:text-[#e57c00]">About</Link>
              </li>
              <li>
                <Link to="/app/rooms" className="text-white hover:text-[#e57c00]">Rooms</Link>
              </li>
              <li>
                <Link to="/app/booking" className="text-white hover:text-[#e57c00]">Booking</Link>
              </li>
              <li>
                <Link to="/app/gallery" className="text-white hover:text-[#e57c00]">Gallery</Link>
              </li>
              <li>
                <Link to="/app/contact" className="text-white hover:text-[#e57c00]">Contact</Link>
              </li>
            </ul>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#e57c00',
              '&:hover': { backgroundColor: '#cc6d00' },
              color: 'black',
            }}
          >
            Booking
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
