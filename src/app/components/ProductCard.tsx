import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './buttons/AddToCartButton';
import WishlistButton from './buttons/WishlistButton';

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
        ? `$${product.price.toLocaleString()}`
        : `$${product.price}`;

    return (
        <div className="group relative rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">

            {/* Category badge */}
            {product.category && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    {product.category}
                </span>
            )}

            {/* Wishlist Button */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <WishlistButton product={product} />
            </div>

            {/* Image */}
            <Link href={`/product/${product._id}`} className="block">
                <div className="flex h-56 items-center justify-center overflow-hidden rounded-t-2xl bg-gray-50/50 relative">
                    <Image
                        src={imageUrl}
                        alt={product.productName}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/product/${product._id}`}>
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors min-h-[2.5rem]">
                        {product.productName}
                    </h3>
                </Link>

                <p className="mt-2 text-xl font-bold text-teal-600">
                    {priceDisplay}
                </p>

                {/* Action */}
                <div className="mt-4">
                    <AddToCartButton product={product} className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 active:scale-95 shadow-md hover:shadow-teal-900/10" />
                </div>
            </div>
        </div>
    );
}