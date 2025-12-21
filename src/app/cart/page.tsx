'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiArrowLeft, FiShoppingCart, FiShoppingBag, FiPlus, FiMinus } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { removeFromCart, updateQuantity } from '@/app/store/slices/productFormSlice';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.productForm.cart);
    const { user } = useAuth();
    const router = useRouter();

    const handleCheckUser = () => {
        if (!user) {
            router.push('/login?redirect=/cart');
            return;
        }
        router.push('/payment');
    }

    const subtotal = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        const q = item.quantity || 1;
        return acc + (price * q);
    }, 0);

    const shipping = cartItems.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <FiShoppingBag size={40} className="text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-xs text-center">
                    Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
                </p>
                <Link
                    href="/categories"
                    className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all active:scale-95 shadow-lg"
                >
                    <FiShoppingCart />
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-teal-600">
                        <FiArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900">Your Shopping Cart</h1>
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-bold">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Cart Items List */}
                    <div className="lg:w-2/3 space-y-4">
                        {cartItems.map((item, idx) => {
                            const imageUrl = item.images?.[0] || '/placeholder.png';
                            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
                            const quantity = item.quantity || 1;

                            return (
                                <div key={`${item._id}-${idx}`} className="bg-white rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 shadow-sm border border-gray-100 group">
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                                        <Image
                                            src={imageUrl}
                                            alt={item.productName}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-between flex-grow py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight line-clamp-2">
                                                    {item.productName}
                                                </h3>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                                                    {item.category || "Misc"}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeFromCart({ _id: item._id }))}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Remove Item"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
                                                <button
                                                    onClick={() => dispatch(updateQuantity({ _id: item._id, change: -1 }))}
                                                    disabled={quantity <= 1}
                                                    className={`p-1.5 rounded-md transition-colors ${quantity <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-white hover:text-teal-600'}`}
                                                >
                                                    <FiMinus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-bold text-gray-800 text-sm">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => dispatch(updateQuantity({ _id: item._id, change: 1 }))}
                                                    className="p-1.5 rounded-md text-gray-600 hover:bg-white hover:text-teal-600 transition-colors"
                                                >
                                                    <FiPlus size={14} />
                                                </button>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <div className="text-xl font-black text-zinc-900">
                                                    ${(price * quantity).toFixed(2)}
                                                </div>
                                                {quantity > 1 && (
                                                    <div className="text-[10px] text-gray-400 font-medium">
                                                        ${price.toFixed(2)} each
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping Estimate</span>
                                    <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Tax Estimate</span>
                                    <span className="text-gray-900 font-medium">$0.00</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-teal-700">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button onClick={handleCheckUser} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-teal-600 transition-all duration-300 shadow-xl hover:shadow-teal-100 active:scale-[0.98] mb-4">
                                Checkout Now
                            </button>

                            <p className="text-xs text-gray-400 text-center">
                                Free shipping on orders over $200!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}