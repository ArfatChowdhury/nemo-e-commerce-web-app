'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HotDealsCarosuel = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const images = [
        '/banner/carosuel/1-1280x384.png',
        '/banner/carosuel/2-1280x384.png',
        '/banner/carosuel/3-1280x384.png'
    ];

    if (!mounted) {
        return <div className="w-full h-56 md:h-80 lg:h-96 bg-zinc-100 rounded-xl animate-pulse" />;
    }

    return (
        <div className="w-full">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-56 md:h-80 lg:h-96 rounded-xl overflow-hidden"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index} className="relative w-full h-56 md:h-80 lg:h-96">
                        <div className="relative w-full h-full">
                            <Image
                                src={src}
                                alt={`Hot Deal ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HotDealsCarosuel;
