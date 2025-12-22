'use client';

import React from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addToCart } from '@/app/store/slices/productFormSlice';
import { toast } from 'react-hot-toast';

interface AddToCartButtonProps {
    product: any;
    showLabel?: boolean;
    className?: string;
}

export default function AddToCartButton({ product, showLabel = true, className = "" }: AddToCartButtonProps) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.productForm.cart);

    const isInCart = cartItems.some((item: any) => item._id === product._id);

    return (
        <button
            disabled={isInCart}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isInCart) {
                    dispatch(addToCart(product));
                    toast.success(`${product.productName} added to cart!`, {
                        icon: '🛒',
                        style: {
                            borderRadius: '1rem',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }
            }}
            className={className || `flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-md ${isInCart
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200 shadow-none"
                : "bg-zinc-900 hover:bg-teal-600 text-white hover:shadow-lg active:scale-95"
                }`}
        >
            {isInCart ? <FiCheck size={16} className="text-teal-600" /> : <FiShoppingCart size={16} />}
            {showLabel && <span>{isInCart ? "Added" : "Add"}</span>}
        </button>
    );
}
