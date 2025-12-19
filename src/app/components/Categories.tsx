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
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                {uniqeCategories().map((category: string) => {
                    const IconComponent = getCategoryIcon(category);
                    const encodedCategory = encodeURIComponent(category);

                    return (
                        <Link
                            key={category}
                            href={`/categories/${encodedCategory}`}
                            className="
                                flex flex-col items-center justify-center w-28 h-28 lg:w-32 lg:h-32 p-3
                                bg-white border border-gray-100 rounded-2xl shadow-sm 
                                hover:shadow-xl hover:border-teal-300 hover:-translate-y-2
                                transition-all duration-300 group
                            "
                        >
                            <div className="
                                text-3xl lg:text-4xl mb-3 text-gray-400 
                                group-hover:text-teal-600 transition-colors duration-300
                            ">
                                <IconComponent />
                            </div>
                            <span className="
                                text-xs lg:text-sm text-center font-semibold text-gray-600 
                                group-hover:text-teal-800 transition-colors duration-300 leading-tight
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