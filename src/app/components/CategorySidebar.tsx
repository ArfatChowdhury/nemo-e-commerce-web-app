'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryIcons, getCategoryIcon } from "@/lib/categoryData";

export default function CategorySidebar() {
    const pathname = usePathname();
    const categories = Object.keys(categoryIcons);

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 px-2">Categories</h2>
                <nav className="space-y-1">
                    {categories.map((category) => {
                        const Icon = getCategoryIcon(category);
                        const encodedCategory = encodeURIComponent(category);
                        const isActive = pathname === `/categories/${encodedCategory}`;

                        return (
                            <Link
                                key={category}
                                href={`/categories/${encodedCategory}`}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-teal-50 text-teal-700 font-semibold shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
                                    }
                                `}
                            >
                                <div className={`
                                    text-xl transition-colors duration-200
                                    ${isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-teal-500'}
                                `}>
                                    <Icon />
                                </div>
                                <span className="text-sm">{category}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
