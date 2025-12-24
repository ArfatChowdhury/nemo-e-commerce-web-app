'use client';

import { useState } from 'react';
import { FiX, FiDownload, FiSmartphone } from 'react-icons/fi';
import Image from 'next/image';
import AppDownloadModal from './AppDownloadModal';

export default function AppDownloadBanner() {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check if user has dismissed the banner (stored in localStorage)
    const [shouldShow, setShouldShow] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('app-banner-dismissed') !== 'true';
        }
        return true;
    });

    const handleDismiss = () => {
        setIsDismissed(true);
        setShouldShow(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem('app-banner-dismissed', 'true');
        }
    };

    if (!shouldShow || isDismissed) return null;

    return (
        <>
            <div className="relative bg-gradient-to-r mt-8 from-teal-600 to-teal-500 rounded-2xl shadow-lg overflow-hidden mx-4 mb-8 animate-in slide-in-from-top-4 duration-500">
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 z-10 p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Dismiss banner"
                >
                    <FiX size={20} />
                </button>

                <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-4">
                    {/* Left Side - Content */}
                    <div className="flex items-center gap-4 flex-1">
                        <div className="hidden md:flex w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center flex-shrink-0">
                            <FiSmartphone size={32} className="text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                Get the Nemo App
                            </h3>
                            <p className="text-teal-100 text-sm md:text-base">
                                Download our mobile app for exclusive deals and a better shopping experience
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Download Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-white text-teal-600 hover:bg-teal-50 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                        <FiDownload size={20} />
                        <span>Download Now</span>
                    </button>
                </div>
            </div>

            {/* App Download Modal */}
            <AppDownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

