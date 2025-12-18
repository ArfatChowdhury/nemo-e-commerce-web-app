'use client';

import React, { useState } from 'react'
import ProductCard from './ProductCard';

export default function NewArrivels({ products }: { products: any }) {
    const [limit, setLimit] = useState(4);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 4);
    }

    const displayedProducts = [...products].reverse().slice(0, limit);

    return (
        <div className="div">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">

                {displayedProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {limit < products.length && (
                <button className=" postion-absolute bottom-0  left-1000  bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300" onClick={handleLoadMore}>Load More</button>
            )}



        </div>
    )
}
