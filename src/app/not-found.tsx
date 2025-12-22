'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8">
                <h1 className="text-9xl font-black text-teal-600/10 select-none">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/final.png"
                        alt="Nemo"
                        width={200}
                        height={80}
                        className="opacity-80"
                    />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h2>
            <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
                It seems like you've wandered into uncharted waters. The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-teal-900/20 transition-all hover:scale-105 active:scale-95"
                >
                    <FiHome />
                    Back to Home
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-2xl border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                    <FiArrowLeft />
                    Go Back
                </button>
            </div>
        </div>
    );
}
