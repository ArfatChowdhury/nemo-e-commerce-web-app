import getAllProducts from "@/lib/getAllProducts"
import Categories from "./Categories"
import FlashSale from "./FlashSale"
import NewArrivals from "./NewArrivals"
import ServiceHighlights from "./ServiceHighlights"
import TopProducts from "./TopProducts"
import Newsletter from "./Newsletter"

export default async function HomePage() {
    const products = await getAllProducts()
    return (
        <div className="space-y-24 pb-24">
            <section>
                <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12 px-4 border-l-4 border-teal-500">
                    Service Highlights
                </h1>
                <ServiceHighlights />
            </section>

            <section>
                <FlashSale products={products} />
            </section>

            <section>
                <Categories products={products} />
            </section>

            <section>
                <TopProducts products={products} />
            </section>

            <section>
                <NewArrivals products={products} />
            </section>

            <section>
                <Newsletter />
            </section>
        </div>
    )
}