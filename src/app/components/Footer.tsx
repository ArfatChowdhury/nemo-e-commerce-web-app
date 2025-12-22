'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-900 text-zinc-400 pt-20 pb-10 px-4 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/nemo-logo-white.png"
                                alt="Nemo"
                                width={150}
                                height={50}
                                className="brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Premium grooming and lifestyle products for the modern individual. Run Like Nemo, stay ahead of the curve.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300">
                                <FiFacebook />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300">
                                <FiTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300">
                                <FiInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300">
                                <FiYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/categories" className="hover:text-teal-400 transition-colors">Browse Categories</Link></li>
                            <li><Link href="/wishlist" className="hover:text-teal-400 transition-colors">My Wishlist</Link></li>
                            <li><Link href="/cart" className="hover:text-teal-400 transition-colors">Shopping Cart</Link></li>
                            <li><Link href="/profile" className="hover:text-teal-400 transition-colors">My Account</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Customer Service</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <FiMapPin className="text-teal-500 mt-1 flex-shrink-0" />
                                <span>123 Grooming St, Style City,<br />SC 12345, United States</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiPhone className="text-teal-500 flex-shrink-0" />
                                <span>+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiMail className="text-teal-500 flex-shrink-0" />
                                <span>support@nemo.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {currentYear} Nemo E-commerce. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
