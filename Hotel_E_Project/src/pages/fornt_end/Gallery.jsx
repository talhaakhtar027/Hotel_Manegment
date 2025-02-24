import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Box, Button } from '@mui/material'; // Import Box and Button from MUI
import Breadcrumb from './component/Breadcrumb'
import beach from '/assets/images/beach.jpg'
import roomView from '/assets/images/room1.jpg'
import bed from '/assets/images/bed.jpg'
import therapy from '/assets/images/therapy.jpg'
import resort from '/assets/images/resort.jpg'
import pool from '/assets/images/pool.jpg'
import bathroom from '/assets/images/bathroom.jpg'
import "./fornt_end_css/css/gallery.css"
import "./fornt_end_css/css/style1.css"

const Gallery = () => {
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            {/* Background Section */}
            <Box sx={{ position: 'relative' }}>
                <Box
                    className="backimage"
                    sx={{
                        position: 'absolute',
                        backgroundImage: `url(${beach})`, // Use the desired background image here
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
                        <Button variant="contained" sx={{ backgroundColor: '#e57c00', '&:hover': { backgroundColor: '#cc6d00' } }}>
                            Booking
                        </Button>
                    </nav>
                </Box>
            </Box>

            {/* Rest of the content (Gallery section) */}
            <div className="bg-[url('./assets/images/room-bg1.jpg')] bg-cover bg-top fixed w-full h-[100vh] -z-50">
                <div className="h-full bg-black/40"></div>
            </div>

            <Breadcrumb text1={'Latest'} text2={'Gallery'} />

            <div className="m-auto px-20 max-lg:px-4">
                <div className="grid grid-cols-3 max-md:grid-cols-1 max-sm:grid-cols-1 gap-4">
                    <div className="col-span-2 grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                        <div className="h-max img-div">
                            <img alt="gallery" className="h-full w-full" src={pool} />
                            <div className="img-overlay">
                                <p>Swimming Pool</p>
                            </div>
                        </div>
                        <div className="h-max img-div">
                            <img alt="gallery" className="h-full w-full" src={bathroom} />
                            <div className="img-overlay">
                                <p>Bathrooms</p>
                            </div>
                        </div>
                        <div className="h-max img-div">
                            <img alt="gallery" className="h-full w-full" src={bed} />
                            <div className="img-overlay">
                                <p>Soft & Clean Bed</p>
                            </div>
                        </div>
                        <div className="h-max img-div">
                            <img alt="gallery" className="h-full w-full" src={therapy} />
                            <div className="img-overlay">
                                <p>Spa Therapy</p>
                            </div>
                        </div>
                        <div className="col-span-2 max-sm:col-span-1 h-max img-div">
                            <img alt="gallery" className="h-full w-full" src={beach} />
                            <div className="img-overlay">
                                <p>Beach</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                        <div className="h-max w-full img-div">
                            <img alt="gallery" className="w-full" src={resort} />
                            <div className="img-overlay max-sm:img-big-overlay">
                                <p>Resort</p>
                            </div>
                        </div>
                        <div className="h-max img-div">
                            <img alt="gallery" className="w-full" src={roomView} />
                            <div className="img-overlay">
                                <p>Room View</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Gallery;
