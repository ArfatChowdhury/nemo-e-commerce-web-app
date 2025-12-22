import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link href="/addproduct">Add Product</Link>
            <Link href="/editProduct">Edit Product</Link>
        </div>
    );
}