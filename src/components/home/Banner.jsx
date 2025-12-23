"use client";
import React from 'react';
// Swiper ইমপোর্ট করা হচ্ছে
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const Banner = () => {
    const bannerData = [
        {
            title: "আপনার প্রিয়জনের জন্য সেরা কেয়ার",
            description: "আমরা নিশ্চিত করি শিশু এবং বয়স্কদের জন্য নিরাপদ এবং মমতাময় পরিবেশ।",
            image: "https://images.pexels.com/photos/3020834/pexels-photo-3020834.jpeg" // ডামি ইমেজ
        },
        {
            title: "বিশ্বস্ত কেয়ারগিভার এখন আপনার হাতে",
            description: "দক্ষ এবং অভিজ্ঞ লোক দিয়ে আমরা আপনার পরিবারের যত্ন নিই।",
            image: "https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg"
        }
    ];

    return (
        <div className="container mx-auto mt-4 rounded-2xl overflow-hidden">
            <Swiper
                navigation={true}
                autoplay={{ delay: 3000 }}
                modules={[Navigation, Autoplay]}
                className="mySwiper h-[500px]"
            >
                {bannerData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="relative h-full w-full flex items-center px-10 md:px-20"
                            style={{ 
                                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="text-white max-w-xl">
                                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                                <p className="text-lg mb-6">{slide.description}</p>
                                <button className="btn btn-primary px-8">আমাদের সার্ভিস দেখুন</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;