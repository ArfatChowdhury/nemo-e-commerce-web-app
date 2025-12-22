'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import getAllProducts from '@/lib/getAllProducts';
import ProductCard from '@/app/components/ProductCard';
import { FiSearch, FiPackage, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import ProductSkeleton from '@/app/components/ProductSkeleton';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const allProducts = await getAllProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (query) {
            const filtered = products.filter(p =>
                p.productName.toLowerCase().includes(query.toLowerCase()) ||
                p.brandName?.toLowerCase().includes(query.toLowerCase()) ||
                p.category?.toLowerCase().includes(query.toLowerCase()) ||
                p.description?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [query, products]);


    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-12 animate-pulse">
                    <div className="w-48 h-6 bg-gray-100 rounded mb-6"></div>
                    <div className="w-64 h-10 bg-gray-100 rounded mb-2"></div>
                    <div className="w-32 h-5 bg-gray-50 rounded"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 font-bold mb-6 group">
                    <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-4">
                    <FiSearch className="text-teal-600" />
                    Search Results
                </h1>
                <p className="text-gray-500">
                    Showing results for <span className="text-teal-600 font-bold">"{query}"</span>
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm">
                    <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                        <FiPackage />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        We couldn't find any products matching your search. Try using different keywords or browse our categories.
                    </p>
                    <Link
                        href="/categories"
                        className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-teal-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        Browse Categories
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
