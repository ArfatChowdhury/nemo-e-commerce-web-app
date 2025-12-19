'use client'

import { useState } from "react";
import ProductCard from "./ProductCard";


export default function Categories({ products }: { products: any }) {

    const [selectedCategory, setSelectedCategory] = useState('Trending');

    const uniqeCategories = () => {
        const categories = products.map((product: any) => product.category);
        return categories.filter((category: any, index: number) => categories.indexOf(category) === index);
    }

    const filteredProducts = products.filter((product: any) => product.category === selectedCategory);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    }


    return (
        <div>
            <h1>Categories</h1>
            <div>
                {uniqeCategories().map((category: any) => (
                    <button className="px-4 py-2.5 bg-[#d6f0a9] text-gray-800 font-medium rounded-full hover:bg-teal-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95" key={category} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </button>
                ))}
            </div>

            <div>
                {filteredProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

        </div>
    );
}