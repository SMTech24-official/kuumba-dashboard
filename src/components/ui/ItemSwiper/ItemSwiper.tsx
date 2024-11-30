import React from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import './ItemSwiper.css'

const ItemSwiper: React.FC = () => {
  return (
    <div className="block sm:hidden">
      <Swiper
        navigation={{
          prevEl: ".custom-swiper-button-prev",
          nextEl: ".custom-swiper-button-next",
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        spaceBetween={10}
        loop={true}
        autoplay={true}
        slidesPerView={1}
      >
        {Array.from({ length: 9 }, (_, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard />
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}
        <div className="custom-swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark z-10">
          <FaAngleLeft />
        </div>
        <div className="custom-swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark z-10">
          <FaAngleRight />
        </div>
      </Swiper>
    </div>
  );
};

export default ItemSwiper;
