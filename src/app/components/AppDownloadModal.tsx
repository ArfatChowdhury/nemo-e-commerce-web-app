'use client';

import { FiX, FiDownload, FiSmartphone } from 'react-icons/fi';
import Image from 'next/image';

interface AppDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
    if (!isOpen) return null;

    const handleDownload = () => {
        // Direct download link to APK file
        window.location.href = '/apps/nemo-app.apk';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 rounded-t-3xl p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <FiX size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <FiSmartphone size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Download Nemo App</h2>
                            <p className="text-teal-100 text-sm">Get the best shopping experience on mobile</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-24 h-24 bg-teal-50 rounded-3xl flex items-center justify-center">
                            <Image
                                src="/nemo-logo for metadata.png"
                                alt="Nemo App"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Nemo E-commerce App</h3>
                            <p className="text-gray-600 text-sm">
                                Shop on the go with our mobile app. Get exclusive deals, faster checkout, and more!
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 text-sm">Exclusive mobile-only deals and discounts</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 text-sm">Faster and smoother shopping experience</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 text-sm">Push notifications for order updates</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 text-sm">Easy access to wishlist and cart</p>
                        </div>
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <FiDownload size={24} />
                        <span>Download APK</span>
                    </button>

                    {/* Note */}
                    <p className="text-xs text-gray-500 text-center">
                        ⚠️ Make sure to enable "Install from Unknown Sources" in your Android settings
                    </p>
                </div>
            </div>
        </div>
    );
}

