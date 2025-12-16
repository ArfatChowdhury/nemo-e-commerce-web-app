import getAllProducts from "../../../lib/getAllProducts"

export default async function HomePage() {
    const products = await getAllProducts()
    // console.log(products, 'data')
    return (
        <div>
            <h1>Home Page</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.productName}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}