'use client';

import React from 'react';
import { FiShoppingCart, FiCheck, FiPlus } from 'react-icons/fi';
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

    const handleAdd = (e: React.MouseEvent) => {
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
    };

    if (!showLabel) {
        return (
            <button
                disabled={isInCart}
                onClick={handleAdd}
                className={className || `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isInCart
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-zinc-900 text-white shadow-lg active:scale-90"
                    }`}
                title={isInCart ? "In Cart" : "Add to Cart"}
            >
                {isInCart ? <FiCheck size={18} /> : <FiPlus size={20} />}
            </button>
        );
    }

    return (
        <button
            disabled={isInCart}
            onClick={handleAdd}
            className={className || `flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all duration-300 shadow-lg ${isInCart
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200 shadow-none"
                : "bg-teal-600 hover:bg-zinc-900 text-white hover:shadow-teal-900/20 active:scale-95"
                }`}
        >
            {isInCart ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
            <span>{isInCart ? "Added" : "Add to Cart"}</span>
        </button>
    );
}
