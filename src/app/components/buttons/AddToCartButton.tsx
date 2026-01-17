'use client';

import React from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addToCart, Product } from '@/app/store/slices/productFormSlice';
import { toast } from 'react-hot-toast';

interface AddToCartButtonProps {
    product: Product;
    showLabel?: boolean;
    className?: string;
}

export default function AddToCartButton({ product, showLabel = true, className = "" }: AddToCartButtonProps) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.productForm.cart);

    const isInCart = cartItems.some((item: Product) => item._id === product._id);

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

    return (
        <button
            disabled={isInCart}
            onClick={handleAdd}
            className={className || `flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${isInCart
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200 shadow-none"
                : "bg-teal-600 hover:bg-zinc-900 text-white hover:shadow-teal-900/20 active:scale-95"
                }`}
        >
            {isInCart ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
            {showLabel && <span>{isInCart ? "Added" : "Add to Cart"}</span>}
        </button>
    );
}
