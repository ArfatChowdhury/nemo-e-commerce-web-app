import React from 'react';
import { FiShield, FiTruck, FiRefreshCw, FiCheck, FiHeart } from 'react-icons/fi';
import AddToCartButton from './buttons/AddToCartButton';
import WishlistButton from './buttons/WishlistButton';
import ProductGallery from './ProductGallery';

interface Product {
    _id: string;
    productName: string;
    price: string | number;
    description: string;
    images?: string[];
    category?: string;
    stock?: string | number;
}

export default function ProductDetails({ product }: { product: Product }) {
    const images = product.images || ['/placeholder.png'];

    const priceDisplay = typeof product.price === 'number'
        ? `$${product.price.toFixed(2)}`
        : `$${product.price}`;

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left: Image Gallery (Client Component) */}
                    <ProductGallery images={images} productName={product.productName} />

                    {/* Right: Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-6">
                            {product.category && (
                                <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
                                    {product.category}
                                </span>
                            )}
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                                {product.productName}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-bold text-teal-700">{priceDisplay}</span>
                                {product.stock && (
                                    <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        <FiCheck /> In Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
                            <p className="text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions (Client Components) */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <AddToCartButton
                                product={product}
                                showLabel={true}
                                className="flex-1 flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all duration-300 shadow-xl hover:shadow-teal-200 active:scale-[0.98]"
                            />

                            {/* Special styling for Wishlist button in details page */}
                            <WishlistButton
                                product={product}
                                className="px-8 py-4 rounded-2xl border-2 border-gray-100 text-gray-600 hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all duration-300 active:scale-[0.98] flex items-center justify-center relative translate-y-0"
                            />
                        </div>

                        {/* Features/Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="p-2 bg-gray-50 rounded-lg text-teal-600">
                                    <FiTruck size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Free Delivery</p>
                                    <p className="text-xs text-gray-400">On orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="p-2 bg-gray-50 rounded-lg text-teal-600">
                                    <FiShield size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Secured Payment</p>
                                    <p className="text-xs text-gray-400">100% safe checkout</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="p-2 bg-gray-50 rounded-lg text-teal-600">
                                    <FiRefreshCw size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Easy Returns</p>
                                    <p className="text-xs text-gray-400">90 days return policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}