'use client';

import React from 'react';
import { FiTruck, FiHeadphones, FiCreditCard, FiRotateCcw } from 'react-icons/fi';

const services = [
    {
        id: 1,
        icon: <FiTruck />,
        title: "Free Shipping",
        desc: "On all orders over $99",
        color: "bg-blue-50 text-blue-600"
    },
    {
        id: 2,
        icon: <FiHeadphones />,
        title: "24/7 Support",
        desc: "Get help anytime you need",
        color: "bg-purple-50 text-purple-600"
    },
    {
        id: 3,
        icon: <FiCreditCard />,
        title: "Secure Payment",
        desc: "100% protected payments",
        color: "bg-emerald-50 text-emerald-600"
    },
    {
        id: 4,
        icon: <FiRotateCcw />,
        title: "90 Days Return",
        desc: "Easy return policy",
        color: "bg-orange-50 text-orange-600"
    },
];

export default function ServiceHighlights() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-teal-100 transition-all duration-500 translate-y-0 hover:-translate-y-2"
                        >
                            <div className={`flex-shrink-0 w-20 h-20 ${service.color} rounded-full flex items-center justify-center text-3xl group-hover:rotate-[360deg] transition-all duration-700 shadow-inner`}>
                                {service.icon}
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed max-w-[200px]">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}