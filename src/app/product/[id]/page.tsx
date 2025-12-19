import getProductById from "@/lib/getProductById";
import getAllProducts from "@/lib/getAllProducts";
import ProductDetails from "@/app/components/ProductDetails";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product: any) => ({
        id: product._id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <ProductDetails product={product} />
        </main>
    );
}
