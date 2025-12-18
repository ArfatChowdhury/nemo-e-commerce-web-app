'use client'

import React, { useState } from 'react'
import ProductCard from './ProductCard'

export default function FlashSale({ products }: { products: any }) {


    const [limit, setLimit] = useState(4);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 4);
    }


    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">

                {products.slice(0, limit).map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className="flex justify-end mt-8 px-4">
                {limit < products.length && (
                    <button
                        className="px-8 py-2.5 bg-[#d6f0a9] text-gray-800 font-medium rounded-full hover:bg-teal-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    )
}