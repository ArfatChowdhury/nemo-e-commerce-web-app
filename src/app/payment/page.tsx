'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiCreditCard, FiLock, FiCheckCircle, FiArrowLeft, FiShoppingBag, FiTruck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { checkoutSuccess } from '@/app/store/slices/productFormSlice';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.productForm.cart);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const subtotal = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        const q = item.quantity || 1;
        return acc + (price * q);
    }, 0);

    const shipping = cartItems.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    const handlePayment = (e: React.FormEvent) => {

        e.preventDefault();
        setIsProcessing(true);


        setTimeout(() => {
            dispatch(checkoutSuccess());
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-teal-50 shadow-teal-100 flex flex-col items-center max-w-lg w-full text-center">
                    <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
                        <FiCheckCircle size={48} className="text-teal-500" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Thank you for your order! Your payment has been processed successfully. We've sent a confirmation email to your inbox.
                    </p>
                    <div className="w-full space-y-4">
                        <Link
                            href="/"
                            className="block w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all active:scale-95 shadow-lg"
                        >
                            Back to Home
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0 && !isSuccess) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <FiShoppingBag size={64} className="text-gray-200 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No items to pay for</h2>
                <Link href="/" className="text-teal-600 font-bold hover:underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/cart" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-600">
                        <FiArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900">Secure Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                            <FiCreditCard className="text-teal-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                        </div>

                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Cardholder Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Card Number</label>
                                <div className="relative">
                                    <input
                                        required
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono"
                                    />
                                    <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Expiry Date</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">CVV</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="123"
                                        maxLength={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${isProcessing
                                    ? "bg-gray-100 text-gray-400 cursor-wait"
                                    : "bg-zinc-900 text-white hover:bg-teal-600 hover:shadow-teal-100 active:scale-[0.98]"
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay ${total.toFixed(2)}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Summary */}
                    <div className="bg-zinc-900 rounded-3xl p-8 text-white shadow-2xl h-fit">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <FiShoppingBag /> Summary
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-white/10 rounded-lg flex-shrink-0 relative overflow-hidden">
                                                <img src={item.images?.[0] || '/placeholder.png'} alt="" className="object-cover w-full h-full p-1" />
                                            </div>
                                            <span className="text-zinc-400 line-clamp-1">{item.productName} × {item.quantity}</span>
                                        </div>
                                        <span className="font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10 space-y-3">
                                <div className="flex justify-between text-zinc-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-zinc-400 text-sm">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                                    <span className="text-xl font-bold">Total Amount</span>
                                    <span className="text-2xl font-black text-teal-400">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <FiTruck size={14} />
                            <span>Estimated delivery in 3-5 business days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
