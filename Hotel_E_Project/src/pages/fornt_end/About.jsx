import React, { useEffect } from 'react'
import TwoColumSection from './component/TwoColumSection';
import { PiForkKnifeDuotone, PiSwimmingPoolDuotone } from "react-icons/pi";
import { TbTreadmill } from "react-icons/tb";
import Breadcrumb from './component/Breadcrumb';
import AboutCards from './component/AboutCards';
import "./fornt_end_css/css/gallery.css"

import beach from '/img/about1.jpg'
import Navbar from './component/Navbar';


const About = () => {

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    return <>
    < Navbar />
        <div className=' bg-cover bg-center fixed w-full h-[100vh] -z-50' style={{ backgroundImage: `url(${beach})` }}>
            <div className='h-full bg-black/50'></div>
        </div>
        <br /><br />

        <Breadcrumb text1="We Are" text2="Seaside" />

        <div className='section-2'>
            <TwoColumSection />
        </div>


        <div className='section-3 py-20'>
            <div className='m-auto px-12 max-lg:px-4'>
                <div className='flex flex-col justify-center items-center mb-12'>
                    <h2 className='text-4xl text-white font-semibold mb-6'>Hotel Facilites</h2>
                    <div className='h-0.5 w-12 bg-color-1'></div>
                </div>

                <div className='grid grid-cols-3 max-lg:grid-cols-1 max-lg:w-2/3 max-md:w-full gap-x-4 gap-y-8'>

                    <AboutCards />

                </div>
            </div>
        </div>

    </>
}

export default About