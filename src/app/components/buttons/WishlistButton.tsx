'use client';

import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAppDispatch } from '@/app/store/hooks';
import { addToWishlist } from '@/app/store/slices/productFormSlice';

interface WishlistButtonProps {
    product: any;
    className?: string;
}

export default function WishlistButton({ product, className = "" }: WishlistButtonProps) {
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(addToWishlist(product));
            }}
            className={className || "absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-500 translate-y-2 group-hover:translate-y-0 text-gray-600 z-10"}
        >
            <FiHeart size={18} />
        </button>
    );
}
