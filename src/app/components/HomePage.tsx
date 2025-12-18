import getAllProducts from "../../../lib/getAllProducts"
import NewArrivels from "./NewArrivels"
import ProductCard from "./ProductCard"
import TopProducts from "./TopProducts"

export default async function HomePage() {
    const products = await getAllProducts()
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12 px-4 border-l-4 border-teal-500">
                    Top Products
                </h1>
                <TopProducts products={products} />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12 px-4 border-l-4 border-teal-500">
                    New Arrivels 🔥
                </h1>
                <NewArrivels products={products} />
            </div>

        </div>
    )
}