

export default async function getAllProducts() {

    const result = await fetch('https://backend-of-nemo.vercel.app/products')

    return result.json()
}

