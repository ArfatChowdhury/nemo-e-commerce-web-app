'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const displayImages = images.length > 0 ? images : ['/placeholder.png'];

    return (
        <div className="w-full lg:w-1/2 space-y-4">
            <div className="relative aspect-square w-full bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                <Image
                    src={displayImages[selectedImage]}
                    alt={productName}
                    fill
                    className="object-contain p-8"
                    priority
                />
            </div>

            {displayImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {displayImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-teal-500 ring-2 ring-teal-100' : 'border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${productName} ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
