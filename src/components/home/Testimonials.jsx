"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css/navigation';


const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Anika Rahman",
      role: "Parent",
      comment:
        "Care.xyz er baby sitting service amar jibon ke onek shohoj kore diyeche. Tader caregiver khub e bishosto.",
      image: "https://i.pravatar.cc/150?u=anika",
    },
    {
      id: 2,
      name: "Karim Uddin",
      role: "Son",
      comment:
        "Amar babar elderly care er jonno ekhane khub valo maner care giver peyechi. Ami khub e tripto.",
      image: "https://i.pravatar.cc/150?u=karim",
    },
    {
      id: 3,
      name: "Sumi Akter",
      role: "Working Mother",
      comment:
        "Eto kom shomoye eto bhalo service pabo bhabini. Caregiver-ra khub e professional.",
      image: "https://i.pravatar.cc/150?u=sumi",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ushnotar Golpo</h2>
        <p className="text-gray-500 mb-12">
          Amader user-ra amader niye ki bolchen
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="card bg-base-100 shadow-xl border border-gray-100 p-8 h-full">
                <div className="flex flex-col items-center">
                  <div className="avatar mb-4">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={review.image} alt={review.name} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{review.name}</h3>
                  <p className="text-primary text-sm mb-4">{review.role}</p>
                  <p className="text-gray-600 italic">
                    &quot;{review.comment}&quot;
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
