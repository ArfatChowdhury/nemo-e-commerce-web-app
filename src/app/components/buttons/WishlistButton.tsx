'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addToWishlist, removeFromWishlist } from '@/app/store/slices/productFormSlice';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
interface WishlistButtonProps {
    product: any;
    className?: string;
}

export default function WishlistButton({ product, className = "" }: WishlistButtonProps) {
    const dispatch = useAppDispatch();
    const isProductInWishlist = useAppSelector((state) => state.productForm.wishlist.some((item: any) => item._id === product._id));

    const toggleWishlist = () => {
        if (isProductInWishlist) {
            dispatch(removeFromWishlist(product));
        } else {
            dispatch(addToWishlist(product));
        }
    };
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist();
            }}
            className={className || "absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-500 translate-y-2 group-hover:translate-y-0 text-gray-600 z-10" + (isProductInWishlist ? " text-red-500" : "")}
        >
            {isProductInWishlist ? <IoHeart size={18} className="text-red-500" /> : <IoHeartOutline size={18} />}
        </button>
    );
}
