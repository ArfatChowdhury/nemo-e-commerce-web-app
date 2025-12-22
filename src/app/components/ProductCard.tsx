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
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full hover:-translate-y-1">
            {/* Image Container */}
            <Link href={`/product/${product._id}`} className="block">
                <div className="relative aspect-square w-full bg-gray-50/50 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={product.productName}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay Actions (Wishlist) */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WishlistButton product={product} />
                    </div>

                    {/* Badge */}
                    {product.category && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-white/90 backdrop-blur-md text-gray-900 rounded-full shadow-sm border border-gray-100 uppercase tracking-wider">
                            {product.category}
                        </span>
                    )}
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Product Title */}
                <Link href={`/product/${product._id}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight line-clamp-2 min-h-[3rem] hover:text-teal-600 transition-colors">
                        {product.productName}
                    </h3>
                </Link>

                {/* Description Excerpt */}
                <p className="text-gray-500 text-xs mb-4 line-clamp-2 flex-grow leading-relaxed">
                    {product.description}
                </p>

                {/* Footer: Price and Add Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-teal-600 tracking-tight">
                            {priceDisplay}
                        </span>
                    </div>

                    <AddToCartButton product={product} showLabel={false} className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-600 hover:bg-zinc-900 text-white transition-all duration-300 shadow-lg shadow-teal-600/20 active:scale-90" />
                </div>
            </div>
        </div>
    );
}