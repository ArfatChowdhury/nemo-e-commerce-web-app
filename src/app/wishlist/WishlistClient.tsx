'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft, FiStar } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { removeFromWishlist, addToCart } from '@/app/store/slices/productFormSlice';
import { toast } from 'react-hot-toast';

export default function WishlistClient() {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector((state) => state.productForm.wishlist);
    const cartItems = useAppSelector((state) => state.productForm.cart);

    const isProductInCart = (productId: string) => {
        return cartItems.some((item: any) => item._id === productId);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center animate-pulse">
                        <FiHeart size={56} className="text-red-200" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 border border-red-50">
                        <FiStar size={24} className="fill-red-500" />
                    </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-10 max-w-sm leading-relaxed">
                    Saved items will appear here so you can easily find them later and add them to your cart!
                </p>
                <Link
                    href="/categories"
                    className="flex items-center gap-3 bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all active:scale-95 shadow-2xl shadow-teal-900/20 group"
                >
                    <span>Explore Products</span>
                    <FiArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-teal-600">
                            <FiArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">Favorites Wishlist</h1>
                            <p className="text-gray-500 text-sm mt-1">Keep track of the products you love most.</p>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 w-fit">
                        <FiStar className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-700">{wishlistItems.length}</span>
                        <span className="text-gray-400 text-sm">{wishlistItems.length === 1 ? 'Item' : 'Items'} Saved</span>
                    </div>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item, idx) => {
                        const imageUrl = item.images?.[0] || '/placeholder.png';
                        const inCart = isProductInCart(item._id);

                        return (
                            <div key={`${item._id}-${idx}`} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                                {/* Image Container */}
                                <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={item.productName}
                                        fill
                                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Quick Remove Button */}
                                    <button
                                        onClick={() => {
                                            dispatch(removeFromWishlist({ _id: item._id }));
                                            toast.success(`Removed from wishlist`, {
                                                icon: '💔',
                                                style: { borderRadius: '1rem', background: '#333', color: '#fff' },
                                            });
                                        }}
                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white rounded-full shadow-sm transition-all z-10"
                                        title="Remove from wishlist"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>

                                    {/* Category Badge */}
                                    {item.category && (
                                        <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold bg-zinc-900/80 backdrop-blur-sm text-white rounded-md uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    )}
                                </div>

                                {/* Content Container */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <Link href={`/product/${item._id}`}>
                                        <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight line-clamp-2 hover:text-teal-600 transition-colors">
                                            {item.productName}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Price</span>
                                            <span className="text-xl font-black text-teal-700">
                                                ${parseFloat(item.price as string).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase">
                                            In Stock
                                        </div>
                                    </div>

                                    {/* Action Button: Add to Cart */}
                                    <button
                                        disabled={inCart}
                                        onClick={() => {
                                            dispatch(addToCart(item));
                                            toast.success(`${item.productName} moved to cart!`, {
                                                icon: '🛒',
                                                style: { borderRadius: '1rem', background: '#333', color: '#fff' },
                                            });
                                        }}
                                        className={`w-full mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 ${inCart
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-zinc-900 text-white hover:bg-teal-600 shadow-lg hover:shadow-teal-100"
                                            }`}
                                    >
                                        <FiShoppingCart size={18} />
                                        {inCart ? "In Cart" : "Move to Cart"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
