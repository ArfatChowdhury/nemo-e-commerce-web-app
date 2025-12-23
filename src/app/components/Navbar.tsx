'use client';

import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiGrid, FiLogOut, FiChevronDown, FiUsers } from "react-icons/fi";
import { useAppSelector } from "@/app/store/hooks";
import { useAuth } from "@/app/context/authContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const cartItems = useAppSelector((state) => state.productForm.cart);
    const wishlistItems = useAppSelector((state) => state.productForm.wishlist);
    const { user, userData, logOut } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = async () => {
        try {
            await logOut();
            router.push("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <nav className="w-full bg-teal-600 text-white font-sans shadow-lg pb-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                {/* Top Row: Logo and Icons */}
                <div className="flex justify-between items-center h-24 relative">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/nemo-logo-white.png"
                                alt="Nemo"
                                width={180}
                                height={60}
                                className="h-42 w-auto object-contain brightness-0 invert"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Slogan Section */}
                    <div className="hidden md:flex absolute left-110 transform -translate-x-1/2 items-center justify-center w-full max-w-[300px] pointer-events-none">
                        <span className="text-white/90 font-normal text-xl tracking-[0.3em] uppercase [text-shadow:1px_2px_4px_rgba(0,0,0,0.3)] whitespace-nowrap">
                            R u n - L i k e - N e m o
                        </span>
                    </div>

                    {/* Right Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/categories" className="flex items-center space-x-1 hover:text-teal-100 transition-colors group">
                            <FiGrid size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Categories</span>
                        </Link>

                        <Link href="/wishlist" className="relative flex items-center space-x-1 hover:text-teal-100 transition-colors group">
                            <FiHeart size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Wishlist</span>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-md">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" className="relative flex items-center space-x-1 hover:text-teal-100 transition-colors group">
                            <FiShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Cart</span>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-teal-600 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-md">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        {/* User Account / Login with DaisyUI Dropdown */}
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="flex items-center space-x-2 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm group shadow-sm cursor-pointer">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-teal-600 text-xs font-bold border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <span className="font-bold text-sm max-w-[100px] truncate text-white">
                                        {userData?.displayName || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Account')}
                                    </span>
                                    <FiChevronDown className="transition-transform duration-300 text-white/70 group-focus-within:rotate-180" />
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[60] menu p-2 mt-3 w-64 bg-white text-gray-800 border border-gray-100 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
                                    <li className="p-4 border-b border-gray-100 bg-teal-50/40 pointer-events-none">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                                                <p className="text-sm font-bold text-gray-900 truncate">{userData?.displayName || user?.displayName || user?.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-2xl transition-all group mt-2">
                                            <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-teal-100 flex items-center justify-center transition-colors">
                                                <FiUser className="text-lg group-hover:scale-110 transition-transform" />
                                            </div>
                                            Profile Settings
                                        </Link>
                                    </li>
                                    <li>
                                        {userData?.role === 'admin' && (
                                            <Link href="/admindashboard" className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-2xl transition-all group mt-2">
                                                <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-teal-100 flex items-center justify-center transition-colors">
                                                    <FiUsers className="text-lg group-hover:scale-110 transition-transform" />
                                                </div>
                                                Admin Dashboard
                                            </Link>
                                        )}
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-all group">
                                            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                <FiLogOut className="text-lg group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center space-x-2 hover:text-teal-600 hover:bg-white transition-all bg-white/20 px-5 py-2.5 rounded-full border border-white/30 font-bold shadow-sm group text-white">
                                <FiUser size={20} className="group-hover:scale-110 transition-transform" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button with counts */}
                <div className="md:hidden flex items-center gap-4">
                    <Link href="/cart" className="relative text-white hover:text-teal-100 transition-colors">
                        <FiShoppingCart size={24} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-white text-teal-600 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle text-white hover:bg-white/20">
                            <FiMenu size={28} />
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content mt-3 z-[100] p-2 shadow-2xl bg-white rounded-2xl w-64 text-gray-800 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                            <li className="menu-title px-4 py-2 text-teal-600 font-bold uppercase tracking-wider text-xs border-b border-gray-100 mb-2">Navigation</li>
                            <li>
                                <Link href="/categories" className="py-3 font-bold hover:bg-teal-50 hover:text-teal-700 rounded-xl">
                                    <FiGrid className="text-lg" /> Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="py-3 font-bold hover:bg-teal-50 hover:text-teal-700 rounded-xl flex justify-between">
                                    <span className="flex items-center gap-2"><FiHeart className="text-lg" /> Wishlist</span>
                                    {wishlistItems.length > 0 && <span className="badge badge-sm badge-error text-white">{wishlistItems.length}</span>}
                                </Link>
                            </li>

                            <li className="menu-title px-4 py-2 text-teal-600 font-bold uppercase tracking-wider text-xs border-b border-gray-100 mt-2 mb-2">Account</li>

                            {user ? (
                                <>
                                    <li>
                                        <div className="flex items-center gap-3 py-3 bg-teal-50/50 rounded-xl mb-2 pointer-events-none">
                                            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                            <div className="flex-col items-start gap-0">
                                                <span className="text-xs font-normal text-gray-500">Signed in as</span>
                                                <span className="text-sm font-bold truncate max-w-[140px]">{userData?.displayName || user.email?.split('@')[0]}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/profile" className="py-3 font-bold hover:bg-teal-50 hover:text-teal-700 rounded-xl">
                                            <FiUser className="text-lg" /> Profile
                                        </Link>
                                    </li>
                                    {userData?.role === 'admin' && (
                                        <li>
                                            <Link href="/admindashboard" className="py-3 font-bold hover:bg-teal-50 hover:text-teal-700 rounded-xl">
                                                <FiUsers className="text-lg" /> Admin Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button onClick={handleLogout} className="py-3 font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl">
                                            <FiLogOut className="text-lg" /> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link href="/login" className="py-3 font-bold bg-teal-600 text-white hover:bg-teal-700 rounded-xl justify-center shadow-lg shadow-teal-900/20 mt-2">
                                        <FiUser className="text-lg" /> Login / Sign Up
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom Row: Search Bar */}
                <div className="flex justify-center w-full px-0 md:px-8 mt-2">
                    <form onSubmit={handleSearch} className="relative w-full max-w-3xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products, brands, or categories..."
                            className="w-full pl-6 pr-12 py-3 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-300 bg-white shadow-xl hover:shadow-2xl transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors">
                            <FiSearch size={22} />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
