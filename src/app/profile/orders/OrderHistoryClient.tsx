'use client';

import React from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { FiPackage, FiCalendar, FiDollarSign, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderHistoryClient() {
    const orderHistory = useAppSelector((state) => state.productForm.orderHistory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/profile" className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all">
                        <FiArrowLeft className="text-xl text-teal-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-teal-900">Order History</h1>
                        <p className="text-teal-700/70 font-medium">View your past purchases</p>
                    </div>
                </div>

                {/* Order List */}
                {orderHistory.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] p-12 text-center shadow-xl">
                        <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                            <FiShoppingBag />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                        <p className="text-gray-500 font-medium mb-6">Start shopping to see your order history here!</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all">
                            <FiShoppingBag /> Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orderHistory.slice().reverse().map((order: any) => (
                            <div key={order.id} className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-xl">
                                {/* Order Header */}
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 text-xl">
                                            <FiPackage />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Order ID</p>
                                            <p className="text-lg font-bold text-gray-900">#{order.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FiCalendar className="text-teal-500" />
                                            <span className="font-medium">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-900 font-bold">
                                            <FiDollarSign className="text-teal-500" />
                                            <span>${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4">
                                    {order.items.map((item: any, index: number) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                {item.images?.[0] ? (
                                                    <Image
                                                        src={item.images[0]}
                                                        alt={item.productName}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <FiPackage size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 truncate">{item.productName}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                                            </div>
                                            <p className="font-bold text-teal-600">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
