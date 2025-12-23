'use client'

import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { FiClock } from 'react-icons/fi';
import { useAppSelector } from '../store/hooks';

export default function FlashSale({ products }: { products: any }) {
    const [limit, setLimit] = useState(4);
    const [timeLeft, setTimeLeft] = useState({
        hours: 4,
        minutes: 20,
        seconds: 15
    });

    const orderHistory = useAppSelector((state: any) => state.productForm.orderHistory);
    console.log(orderHistory)
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 4);
    }

    return (
        <div className="bg-zinc-50 py-12 rounded-[3rem] border border-zinc-100 shadow-inner">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 mb-10 gap-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-black text-gray-900 border-l-8 border-teal-500 pl-6">
                        Flash Sale
                    </h1>
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-2xl font-black text-lg animate-pulse border border-red-100">
                        <FiClock className="text-xl" />
                        <span>
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {limit < products.length && (
                    <button
                        className="px-10 py-4 bg-zinc-900 text-white font-black rounded-2xl hover:bg-teal-600 transition-all duration-300 shadow-xl shadow-zinc-900/10 active:scale-95"
                        onClick={handleLoadMore}
                    >
                        View All Deals
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8">
                {products.slice(0, limit).map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}