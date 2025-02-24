import React from 'react'
import aboutData from '../data/aboutData'
import "../fornt_end_css/css/gallery.css"

const AboutCards = () => {
    return <>
        {
            aboutData.map((data, index) => {

                console.log(data);

                return <div className='card2 1'>
                    <div className='mr-4 p-2 bg-color-1'>
                        {data.icon}
                    </div>
                    <div>
                        <h3 className='uppercase font-bold mb-2'>{data.heading}</h3>
                        <p className='text-base font-light'>{data.text}</p>
                    </div>
                </div>


            })
        }
    </>
}

export default AboutCards