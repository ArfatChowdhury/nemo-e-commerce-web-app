'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

interface Product {
    _id: string;
    productName: string;
    price: string | number;
    description: string;
    images?: string[];
    category?: string;
    stock?: string | number;
}

export default function ProductCard({ product }: { product: Product }) {
    // Ensure we have an image fallbacks
    const imageUrl = product.images?.[0] || '/placeholder.png';
    const priceDisplay = typeof product.price === 'number'
        ? `$${product.price.toFixed(2)}`
        : `$${product.price}`;

    return (
        <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/product/${product._id}`} className="block">
                <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={product.productName}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay Actions (Wishlist) */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // Wishlist logic
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-500 translate-y-2 group-hover:translate-y-0 text-gray-600 z-10"
                    >
                        <FiHeart size={18} />
                    </button>

                    {/* Badge */}
                    {product.category && (
                        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-zinc-900/80 backdrop-blur-sm text-white rounded-md">
                            {product.category}
                        </span>
                    )}
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Brand/Category Tag */}
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {product.stock ? 'In Stock' : 'Out of Stock'}
                </div>

                {/* Product Title */}
                <Link href={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 leading-tight line-clamp-2 min-h-[3.5rem] hover:text-teal-600 transition-colors">
                        {product.productName}
                    </h3>
                </Link>

                {/* Description Excerpt */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Footer: Price and Add Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Price</span>
                        <span className="text-xl font-bold text-teal-700">
                            {priceDisplay}
                        </span>
                    </div>

                    <button className="flex items-center gap-2 bg-zinc-900 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-300 shadow-md hover:shadow-lg active:scale-95">
                        <FiShoppingCart size={16} />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}