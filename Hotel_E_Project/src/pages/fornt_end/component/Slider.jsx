import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import rooms from '../data/rooms'

import { HiOutlineClock, HiOutlineHome, HiChevronRight, HiOutlineUserCircle, HiOutlineArrowsExpand } from "react-icons/hi";
// import room6 from '../assets/images/room6.jpg'
import Button from "./Button";


// Import Swiper styles
import { Link } from "react-router-dom";

const Slider = () => {
    const [ImageChange, setImageChange] = useState(false)


    return <>
        <>
            <Swiper slidesPerView={1}
                spaceBetween={30}
                className="mySwiper"
                breakpoints={{
                    "600": {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    "992": {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }}
            >


                {
                    rooms.map((data, index) => {

                        return <SwiperSlide key={index}>
                            <div>
                                <div className="bg-black/40 shadow h-full">
                                    <div className="relative overflow-hidden" >
                                        <div className="image-hover-div">
                                            <Link to={`/single/${data.name}`}>
                                                <img src={data.img[1]} alt="" className="absolute duration-300 image-hover opacity-1 -z-10" />
                                                <img className="w-full duration-300 hover:opacity-0 image-hover" src={data.img[0]} alt="" />
                                            </Link>
                                        </div>
                                        <div className='absolute w-full bottom-0 px-12 py-2 text-white font-light tracking-wider flex bg-black/40'>
                                            <span className='mr-2 flex'><HiOutlineUserCircle className='h-6 w-auto mr-1' />{data.guests} Guests</span> <span className='flex'><HiOutlineArrowsExpand className='h-6 w-auto mr-1' />{data.foot} ft</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <Link to={`/single/${data.name}`}>
                                            <h5 className="mb-2 text-white text-xl font-semibold tracking-widest">{data.name}</h5>
                                        </Link>
                                        <p className="text-white text-base font-light mb-10">Most hotels and major hospitality companies have set industry standards to classify hotel types. An upscale full-service hotel facility…</p>
                                        <Link to={`/single/${data.name}`}>
                                            <Button text={`Book Now For $${data.price}`} className={'w-full hover:pl-12'} iconAfter={<HiChevronRight className='h-5 w-auto' />} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </>
    </>
}

export default Slider