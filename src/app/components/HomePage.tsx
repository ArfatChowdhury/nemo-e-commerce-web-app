import getAllProducts from "@/lib/getAllProducts"
import Categories from "./Categories"
import FlashSale from "./FlashSale"
import NewArrivels from "./NewArrivels"
import ProductCard from "./ProductCard"
import ServiceHighlights from "./ServiceHighlights"
import TopProducts from "./TopProducts"
import Newsletter from "./Newsletter"

export default async function HomePage() {
    const products = await getAllProducts()
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12 px-4 border-l-4 border-teal-500">
                    Service Highlights
                </h1>
                <ServiceHighlights />
            </div>
            <div>
                <FlashSale products={products} />
            </div>
            <div>

                <Categories products={products} />
            </div>
            <div>
                <TopProducts products={products} />
            </div>
            <div>
                <NewArrivels products={products} />
            </div>
            <div>
                <Newsletter />
            </div>


        </div>
    )
}