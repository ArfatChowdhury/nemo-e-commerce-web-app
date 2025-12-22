'use client'

import Link from "next/link";
import { getCategoryIcon, categoriesList } from "@/lib/categoryData";

export default function Categories({ products }: { products: any }) {

    const uniqeCategories = () => {
        const categories = products.map((product: any) => product.category);
        return categories.filter((category: any, index: number) => categories.indexOf(category) === index);
    }

    return (
        <section className="py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12 px-4 border-l-4 border-teal-500">
                    Shop By Categories
                </h1>
            </div>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {uniqeCategories().map((category: string) => {
                    const IconComponent = getCategoryIcon(category);
                    const encodedCategory = encodeURIComponent(category);

                    return (
                        <Link
                            key={category}
                            href={`/categories/${encodedCategory}`}
                            className="
                                flex flex-col items-center justify-center w-32 h-32 lg:w-36 lg:h-36 p-4
                                bg-white border border-gray-100 rounded-3xl shadow-sm 
                                hover:shadow-2xl hover:border-teal-300 hover:-translate-y-2
                                transition-all duration-500 group
                            "
                        >
                            <div className="
                                text-4xl lg:text-5xl mb-4 text-gray-300 
                                group-hover:text-teal-600 group-hover:scale-110 transition-all duration-500
                            ">
                                <IconComponent />
                            </div>
                            <span className="
                                text-xs lg:text-sm text-center font-black text-gray-700 
                                group-hover:text-teal-900 transition-colors duration-300 leading-tight uppercase tracking-wider
                            ">
                                {category}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}