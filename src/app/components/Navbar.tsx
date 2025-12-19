'use client';

import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiGrid } from "react-icons/fi";
import { useAppSelector } from "@/app/store/hooks";

export default function Navbar() {
    const cartItems = useAppSelector((state) => state.productForm.cart);
    const wishlistItems = useAppSelector((state) => state.productForm.wishlist);

    return (
        <nav className="w-full bg-[#d6f0a9] text-gray-800 font-sans shadow-sm pb-4">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                {/* Top Row: Logo and Icons */}
                <div className="flex justify-between items-center h-24 relative">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/final.png"
                                alt="Nemo"
                                width={180}
                                height={60}
                                className="h-42 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Slogan Section */}
                    <div className="hidden md:flex absolute left-110 transform -translate-x-1/2 items-center justify-center w-full max-w-[300px] pointer-events-none">
                        <span className="text-white font-normal text-xl tracking-[0.3em] uppercase [text-shadow:1px_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">
                            R u n - L i k e - N e m o
                        </span>
                    </div>

                    {/* Right Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/categories" className="flex items-center space-x-1 hover:text-teal-700 transition-colors group">
                            <FiGrid size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Categories</span>
                        </Link>

                        <Link href="/wishlist" className="relative flex items-center space-x-1 hover:text-teal-700 transition-colors group">
                            <FiHeart size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Wishlist</span>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-md">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" className="relative flex items-center space-x-1 hover:text-teal-700 transition-colors group">
                            <FiShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Cart</span>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-md">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <Link href="/login" className="flex items-center space-x-1 hover:text-teal-700 transition-colors">
                            <FiUser size={22} />
                            <span className="font-medium">Account</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button with counts */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/cart" className="relative text-gray-800">
                            <FiShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        <button className="text-gray-800 hover:text-teal-700 focus:outline-none">
                            <FiMenu size={28} />
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Search Bar */}
                <div className="flex justify-center w-full px-0 md:px-8 mt-2">
                    <div className="relative w-full max-w-3xl">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-6 pr-12 py-3 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white/90 shadow-sm transition-all text-gray-700"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600">
                            <FiSearch size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
