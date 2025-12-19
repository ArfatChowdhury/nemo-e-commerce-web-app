'use client'

import Link from "next/link";
import { getCategoryIcon, categoryIcons } from "@/lib/categoryData";

export default function CategoriesPage() {
    // Instead of depending on products (which caused the error), 
    // we use our centralized list for the main categories index.
    const categories = Object.keys(categoryIcons);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Explore Categories
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Find exactly what you're looking for by browsing our curated collections.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
                {categories.map((category) => {
                    const IconComponent = getCategoryIcon(category);
                    const encodedCategory = encodeURIComponent(category);

                    return (
                        <Link
                            key={category}
                            href={`/categories/${encodedCategory}`}
                            className="
                                flex flex-col items-center justify-center p-8
                                bg-white border border-gray-100 rounded-3xl shadow-sm 
                                hover:shadow-2xl hover:border-teal-300 hover:-translate-y-3
                                transition-all duration-300 group
                            "
                        >
                            <div className="
                                text-5xl mb-6 text-gray-300 
                                group-hover:text-teal-600 transition-colors duration-300
                            ">
                                <IconComponent />
                            </div>
                            <span className="
                                text-sm lg:text-base text-center font-bold text-gray-600 
                                group-hover:text-teal-900 transition-colors duration-300 leading-tight
                            ">
                                {category}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}