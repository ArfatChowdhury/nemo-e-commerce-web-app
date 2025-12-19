
import React from 'react';

const services = [
    { id: 1, icon: "🚚", title: "Free Shipping", desc: "On all orders over $99" },
    { id: 2, icon: "🎧", title: "24/7 Support", desc: "Get help anytime you need" },
    { id: 3, icon: "💳", title: "Secure Payment", desc: "100% protected payments" },
    { id: 4, icon: "🔄", title: "90 Days Return", desc: "Easy return policy" },
];

export default function ServiceHighlights() {
    return (
        <div className="bg-gray-50 py-10 mt-12 border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-4">
                        <span className="text-4xl">{service.icon}</span>
                        <div>
                            <h3 className="font-bold text-gray-800">{service.title}</h3>
                            <p className="text-sm text-gray-500">{service.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}