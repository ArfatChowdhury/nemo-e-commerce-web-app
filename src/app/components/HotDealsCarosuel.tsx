'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HotDealsCarosuel = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const slides = [
        {
            image: '/banner/carosuel/banner-nemo-without-text-1.png',
            title: 'Premium Footwear',
            subtitle: 'Run Like Nemo',
            cta: 'Shop Now',
            link: '/categories/Shoes'
        },
        {
            image: '/banner/carosuel/banner-nemo-without-text-2.png',
            title: 'Summer Collection',
            subtitle: 'Up to 60% Off',
            cta: 'Explore',
            link: '/categories/Accessories'
        },
        {
            image: '/banner/carosuel/banner-nemo-without-text.png',
            title: 'New Arrivals',
            subtitle: 'Fresh Styles Just In',
            cta: 'View All',
            link: '/search?q=new'
        }
    ];

    if (!mounted) {
        return <div className="w-full h-56 md:h-80 lg:h-96 bg-zinc-100 rounded-[2.5rem] animate-pulse" />;
    }

    return (
        <div className="w-full px-4">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper w-full h-64 md:h-96 lg:h-[28rem] rounded-[3rem] overflow-hidden shadow-2xl shadow-teal-900/10 border border-white/20"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                        <div className="relative w-full h-full group">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover transition-transform duration-[10s] group-hover:scale-110"
                                priority={index === 0}
                            />
                            {/* Premium Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-12 md:px-24">
                                <span className="text-teal-400 font-black tracking-[0.3em] uppercase mb-4 animate-in slide-in-from-left duration-700">
                                    {slide.subtitle}
                                </span>
                                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 max-w-2xl leading-tight animate-in slide-in-from-left duration-1000 delay-100">
                                    {slide.title}
                                </h2>
                                <Link
                                    href={slide.link}
                                    className="w-fit px-10 py-4 bg-white text-zinc-900 font-black rounded-2xl hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-xl active:scale-95 animate-in slide-in-from-bottom duration-1000 delay-300"
                                >
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HotDealsCarosuel;
