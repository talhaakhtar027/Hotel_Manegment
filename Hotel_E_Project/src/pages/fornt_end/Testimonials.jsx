import React from "react";
import commas from '/img/about6.jpg'; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Pagination } from 'swiper/modules'; 
import testimonialsData from './testimonials.json'; 

// MUI components
import { Typography, Box } from '@mui/material';

// Import Swiper styles
import "swiper/css"; 
import 'swiper/css/pagination'; 

const Testimonials = () => {
    const testimonials = testimonialsData.testimonials;

    return (
        <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {testimonials.map((data, index) => (
                <SwiperSlide key={index}>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center" 
                        alignItems="center" 
                        textAlign="center" 
                        paddingBottom={4} 
                    >
                        <Box 
                            component="img" 
                            src={commas} 
                            alt="testimonial" 
                            mb={2} 
                            width={80} 
                            height={80} 
                            borderRadius="50%"  // Circular image
                            objectFit="cover"
                        />
                        <Typography 
                            variant="h5" 
                            component="p" 
                            sx={{ fontStyle: 'italic', color: 'white', maxWidth: '600px', marginBottom: 2, fontFamily: 'serif', lineHeight: 1.6 }}
                        >
                            <i>{data.review}</i>
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}
                        >
                            {data.name}, {data.designation}
                        </Typography>
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Testimonials;
