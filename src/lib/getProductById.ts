import getAllProducts from "./getAllProducts";

export default async function getProductById(id: string) {
    const products = await getAllProducts();
    return products.find((product: any) => product._id === id);
}
