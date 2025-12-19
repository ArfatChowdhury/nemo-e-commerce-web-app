'use client';

import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useAppDispatch } from '@/app/store/hooks';
import { addToCart } from '@/app/store/slices/productFormSlice';

interface AddToCartButtonProps {
    product: any;
    showLabel?: boolean;
    className?: string;
}

export default function AddToCartButton({ product, showLabel = true, className = "" }: AddToCartButtonProps) {
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(addToCart(product));
            }}
            className={className || "flex items-center gap-2 bg-zinc-900 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-300 shadow-md hover:shadow-lg active:scale-95"}
        >
            <FiShoppingCart size={16} />
            {showLabel && <span>Add</span>}
        </button>
    );
}
