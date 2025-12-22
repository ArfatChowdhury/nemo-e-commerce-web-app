'use client';

import React from 'react';

export default function ProductSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-[4/3] w-full bg-gray-100"></div>

            {/* Content Skeleton */}
            <div className="p-5 flex flex-col flex-grow space-y-4">
                {/* Badge Skeleton */}
                <div className="w-16 h-4 bg-gray-100 rounded"></div>

                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="w-full h-5 bg-gray-100 rounded"></div>
                    <div className="w-2/3 h-5 bg-gray-100 rounded"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 flex-grow">
                    <div className="w-full h-3 bg-gray-50 rounded"></div>
                    <div className="w-full h-3 bg-gray-50 rounded"></div>
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="space-y-2">
                        <div className="w-8 h-3 bg-gray-50 rounded"></div>
                        <div className="w-16 h-6 bg-gray-100 rounded"></div>
                    </div>
                    <div className="w-24 h-10 bg-gray-100 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
