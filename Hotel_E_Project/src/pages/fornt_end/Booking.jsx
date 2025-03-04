import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Breadcrumb from './component/Breadcrumb';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from './component/Button';
import './fornt_end_css/css/gallery.css';
import bgImage from '/assets/images/bg-home.jpg';
import Navbar from './component/Navbar';

const Booking = () => {
    const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [MonthStartingDays, setMonthStartingDays] = useState([]);
    const [localState, setlocalState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Adults, setAdults] = useState(0);
    const [Children, setChildren] = useState(0);
    const [timeSlot, setTimeSlot] = useState('9:00 AM  - 10:00 AM');
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Number, setNumber] = useState('');
    const [Message, setMessage] = useState('');
    const [SelectedRoom, setSelectedRoom] = useState('standard_room');
    const [data, setData] = useState({
        dates: [],
        selectedDates: [],
        standard_room: [],
        deluxe_room: [],
        premier_room: [],
        family_suite: [],
        luxury_suite: [],
        president_suite: [],
    });

    const btnRef = useRef();

    const getBookedRoom = () => {
        return JSON.parse(localStorage.getItem(SelectedRoom));
    };

    const getDaysInMonth = () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        setData((prevData) => ({
            ...prevData,
            dates: days,
        }));

        setLoading(false);

        const startingDays = [];
        for (let i = 0; i < 7; i++) {
            const index = days[i].getDay();
            startingDays.push(daysName[index]);
        }
        setMonthStartingDays(startingDays);
    };

    const selectDates = (e) => {
        const selectedDate = e.target.value;
        const isAlreadySelected = data.selectedDates.includes(selectedDate);

        if (isAlreadySelected) {
            setData((prevData) => ({
                ...prevData,
                selectedDates: prevData.selectedDates.filter(date => date !== selectedDate)
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                selectedDates: [...prevData.selectedDates, selectedDate]
            }));
        }
    };

    const formSubmit = async () => {
        if (data.selectedDates.length === 0) {
            alert('Please Select Date');
            return;
        }

        const customerData = {
            SelectedRoom,
            Adults,
            Children,
            TimeSlot: timeSlot,
            Name,
            Email,
            Number,
            Message,
            SelectedDates: data.selectedDates,
        };

        try {
            const response = await fetch('http://localhost:3000/api/bookings/postcreatebookingmanual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Booking successful!');
            } else {
                alert(`Booking failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    useEffect(() => {
        getDaysInMonth();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        let booked = getBookedRoom();
        if (booked === null) booked = [];
        setlocalState(booked);
    }, [SelectedRoom]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Navbar />
            <div className="bg-cover bg-center fixed w-full h-[100vh] -z-50" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="h-full bg-black/40"></div>
            </div>
            <br /><br />
            <Breadcrumb text2={'Booking'} />
            <div className="m-auto px-12 max-lg:px-4 flex justify-center items-center">
                <div className="p-8 max-md:px-2 w-[600px] max-md:w-full bg-black/40">
                    <form onSubmit={(e) => { e.preventDefault(); formSubmit(); }}>
                        <div className="px-3 mb-5">
                            <label htmlFor="" className="label">Select Room:</label>
                            <select name="" className="select form-input" onChange={(e) => setSelectedRoom(e.target.value)}>
                                <option value="standard_room">Standard Room</option>
                                <option value="deluxe_room">Deluxe Room</option>
                                <option value="premier_room">Premier Room</option>
                                <option value="family_suite">Family Suite</option>
                                <option value="luxury_suite">Luxury Suite</option>
                                <option value="president_suite">President Suite</option>
                            </select>
                        </div>

                        <div className="calendar-container px-3 mb-5">
                            <label htmlFor="" className="label">Choose Date*:</label>
                            <div className="grid grid-cols-7 text-white text-center">
                                <div className="col-span-7 border-gray-600 border font-semibold py-2">
                                    {monthName[new Date().getMonth()]} {new Date().getFullYear()}
                                </div>
                                {MonthStartingDays.map((day, index) => (
                                    <div key={index} className="calendaer-dates py-2">
                                        {day}
                                    </div>
                                ))}
                                {data.dates.map((thisDate, index) => (
                                    <div key={index} className={`calendaer-dates ${(data.selectedDates?.includes(thisDate.getDate().toString())) ? 'bg-white text-black' : ''} 
                                    ${thisDate.getDate() <= new Date().getDate() || localState.includes(thisDate.getDate().toString()) || data[SelectedRoom]?.includes(thisDate.getDate().toString()) 
                                        ? 'text-white/50 bg-gray-400/20' 
                                        : 'hover:bg-white hover:text-black'}`}>
                                        <button
                                            type="button"
                                            ref={btnRef}
                                            onClick={(e) => selectDates(e)}
                                            disabled={thisDate.getDate() <= new Date().getDate() || localState.includes(thisDate.getDate().toString()) || data[SelectedRoom]?.includes(thisDate.getDate().toString())}
                                            className="w-full py-2 outline-none"
                                            value={thisDate.getDate()}>
                                            {thisDate.getDate()}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex max-md:block mb-5">
                            <div className="px-3 max-md:mb-5">
                                <label htmlFor="" className="label">Adults:</label>
                                <div className="flex items-center">
                                    <button type="button" className="form-count-btn bg-color-1" onClick={() => setAdults(Math.max(0, Adults - 1))}>-</button>
                                    <input type="number" className="form-input-count" value={Adults} onChange={(e) => setAdults(Number(e.target.value))} />
                                    <button type="button" className="form-count-btn bg-color-1" onClick={() => setAdults(Adults + 1)}>+</button>
                                </div>
                            </div>
                            <div className="px-3">
                                <label htmlFor="" className="label">Children:</label>
                                <div className="flex items-center">
                                    <button type="button" className="form-count-btn bg-color-1" onClick={() => setChildren(Math.max(0, Children - 1))}>-</button>
                                    <input type="number" className="form-input-count" value={Children} onChange={(e) => setChildren(Number(e.target.value))} />
                                    <button type="button" className="form-count-btn bg-color-1" onClick={() => setChildren(Children + 1)}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className="px-3 mb-5">
                            <label htmlFor="" className="label">Time Slots*:</label>
                            <div className="mb-2">
                                <button type="button" className={`form-time-btn mr-4 max-md:mb-3 ${timeSlot === '9:00 AM  - 10:00 AM' && 'bg-color1 font-semibold'}`} onClick={() => setTimeSlot('9:00 AM  - 10:00 AM')}>9:00 AM  - 10:00 AM</button>
                                <button type="button" className={`form-time-btn mr-4 max-md:mb-3 ${timeSlot === '10:00 AM - 11:00 AM' && 'bg-color1 font-semibold'}`} onClick={() => setTimeSlot('10:00 AM - 11:00 AM')}>10:00 AM - 11:00 AM</button>
                            </div>
                            <div>
                                <button type="button" className={`form-time-btn mr-4 max-md:mb-3 ${timeSlot === '11:00 AM - 12:00 PM (Noon)' && 'bg-color1 font-semibold'}`} onClick={() => setTimeSlot('11:00 AM - 12:00 PM (Noon)')}>11:00 AM - 12:00 PM (Noon)</button>
                                <button type="button" className={`form-time-btn mr-4 max-md:mb-3 ${timeSlot === '12:00 PM (Noon) - 1:00 PM' && 'bg-color1 font-semibold'}`} onClick={() => setTimeSlot('12:00 PM (Noon) - 1:00 PM')}>12:00 PM (Noon) - 1:00 PM</button>
                            </div>
                        </div>

                        <div className="px-3 mb-5">
                            <label htmlFor="" className="label">Your Name:</label>
                            <input type="text" className="form-input" value={Name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="px-3 mb-5">
                            <label htmlFor="" className="label">Your Email:</label>
                            <input type="email" className="form-input" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="px-3 mb-5">
                            <label htmlFor="" className="label">Your Number:</label>
                            <input type="text" className="form-input" value={Number} onChange={(e) => setNumber(e.target.value)} />
                        </div>

                        <div className="px-3 mb-5">
                            <label htmlFor="" className="label">Message:</label>
                            <textarea className="form-input" value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>

                        <div className="text-center">
                            <Button text={'Submit Form'} onClick={() => formSubmit()} className={'mx-4 bg-transparent'} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Booking;