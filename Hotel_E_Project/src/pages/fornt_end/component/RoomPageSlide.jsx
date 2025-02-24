import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "swiper/css";
import "swiper/css/pagination";

const RoomPageSlider = ({ Images }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper room123123"
        breakpoints={{
          600: {
            slidesPerView: "auto",
            spaceBetween: 10,
          },
          992: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
        }}
      >
        {Images?.map((data, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-80 w-max mb-12 cursor-pointer"
              onClick={() => {
                setOpen(true);
                setIndex(i);
              }}
            >
              <img src={data} alt="room-images" className="h-80" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={Images.map((src) => ({ src }))}
        />
      )}
    </>
  );
};

export default RoomPageSlider;
