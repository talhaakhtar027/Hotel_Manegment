import React, { useRef, useState } from "react";
import commas from '/img/about-2.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import testimonialsData from '../data/testimonials.json'
import 'swiper/css/pagination';
import "../fornt_end_css/css/gallery.css"



// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';


const Testimonials = () => {

    const testimonials = testimonialsData.testimonials;

    return <>
        <>
            <Swiper
                pagination={{
                    clickable: true
                }}
                modules={[Pagination]}
                className="mySwiper">


                {
                    testimonials.map((data, index) => {
                        return <SwiperSlide key={index}>
                            <div className='flex flex-col justify-center items-center text-center pb-12 '>
                                {/* <img src={commas} alt="" className='mb-6' /> */}
                                <p className='w-2/3 max-md:w-full text-white text-3xl max-sm:text-xl font-serif leading-10 mb-8'><i>{data.review}</i></p>
                                <p className='text-white text-sm font-serif'>{data.name}, {data.designation}</p>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </>
    </>

}


export default Testimonials