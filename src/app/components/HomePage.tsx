import getAllProducts from "../../../lib/getAllProducts"
import ProductCard from "./ProductCard"

export default async function HomePage() {
    const products = await getAllProducts()
    // console.log(products, 'data')
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12 px-4 border-l-4 border-teal-500">
                Latest Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}