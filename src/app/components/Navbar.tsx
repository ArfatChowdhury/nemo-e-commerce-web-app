import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#d6f0a9] text-gray-800 font-sans shadow-sm pb-4">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                {/* Top Row: Logo and Icons */}
                <div className="flex justify-between items-center h-24">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/nemo-logo-black.png"
                                alt="Nemo"
                                width={5000}
                                height={5000}
                                className="h-42 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/wishlist" className="flex items-center space-x-1 hover:text-teal-700 transition-colors group">
                            <FiHeart size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Wishlist</span>
                        </Link>

                        <Link href="/cart" className="flex items-center space-x-1 hover:text-teal-700 transition-colors group">
                            <FiShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Cart</span>
                        </Link>

                        <Link href="/login" className="flex items-center space-x-1 hover:text-teal-700 transition-colors">
                            <FiUser size={22} />
                            <span className="font-medium">Account</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/cart" className="relative text-gray-800">
                            <FiShoppingCart size={24} />
                        </Link>
                        <button className="text-gray-800 hover:text-teal-700 focus:outline-none">
                            <FiMenu size={28} />
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Search Bar (Visible on all sizes now, centered/full width) */}
                <div className="flex justify-center w-full px-0 md:px-8">
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