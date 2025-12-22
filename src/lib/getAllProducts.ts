

export default async function getAllProducts() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend-of-nemo.vercel.app';
    const result = await fetch(`${apiUrl}/products`)
    return result.json()
}

