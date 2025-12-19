import getAllProducts from "../../../../lib/getAllProducts";
import ProductCard from "@/app/components/ProductCard";
import CategorySidebar from "@/app/components/CategorySidebar";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: encodedCategory } = await params;
    const category = decodeURIComponent(encodedCategory);

    const products = await getAllProducts();
    const filteredProducts = products.filter((product: any) => product.category === category);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 ">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <CategorySidebar />

                {/* Main Content */}
                <main className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {category}
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Showing {filteredProducts.length} products
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
                            <p className="text-gray-500 mt-2">We couldn't find any products in the "{category}" category.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
