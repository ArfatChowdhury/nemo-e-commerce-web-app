'use client';

import Link from "next/link";
import { FiPlusCircle, FiEdit, FiArrowLeft, FiBarChart2, FiUsers } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AdminDashboardClient() {
    const router = useRouter();

    const adminActions = [
        {
            title: "Add Product",
            description: "Create a new product listing with images, colors, and categories.",
            icon: <FiPlusCircle size={32} />,
            href: "/addProduct",
            color: "bg-teal-500",
        },
        {
            title: "Manage Products",
            description: "Edit existing products, update stock levels, or remove items.",
            icon: <FiEdit size={32} />,
            href: "/editProduct",
            color: "bg-blue-500",
        },
        {
            title: "User Management",
            description: "View and manage registered users and their roles.",
            icon: <FiUsers size={32} />,
            href: "/admin/users",
            color: "bg-purple-500",
            disabled: true,
        },
        {
            title: "Sales Analytics",
            description: "Track your store's performance and sales trends.",
            icon: <FiBarChart2 size={32} />,
            href: "/admin/analytics",
            color: "bg-orange-500",
            disabled: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    >
                        <FiArrowLeft size={20} className="mr-2" />
                        <span className="font-medium">Storefront</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Admin Control Center</h1>
                    <div className="w-20"></div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900">Welcome back, Admin</h2>
                    <p className="text-gray-500 mt-2">Manage your store's inventory and operations from here.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {adminActions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.disabled ? "#" : action.href}
                            className={`group relative overflow-hidden bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${action.disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className={`p-4 rounded-2xl text-white ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {action.icon}
                                </div>
                                {action.disabled && (
                                    <span className="bg-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">Coming Soon</span>
                                )}
                            </div>
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{action.title}</h3>
                                <p className="text-gray-500 mt-2 leading-relaxed">{action.description}</p>
                            </div>
                            <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                {action.icon}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats Placeholder */}
                <div className="mt-16 bg-teal-900 rounded-[3rem] p-10 text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-8">Quick Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <p className="text-teal-300 text-sm font-bold uppercase tracking-widest">Total Products</p>
                                <p className="text-4xl font-black mt-1">--</p>
                            </div>
                            <div>
                                <p className="text-teal-300 text-sm font-bold uppercase tracking-widest">Total Sales</p>
                                <p className="text-4xl font-black mt-1">$0.00</p>
                            </div>
                            <div>
                                <p className="text-teal-300 text-sm font-bold uppercase tracking-widest">Active Users</p>
                                <p className="text-4xl font-black mt-1">--</p>
                            </div>
                            <div>
                                <p className="text-teal-300 text-sm font-bold uppercase tracking-widest">Pending Orders</p>
                                <p className="text-4xl font-black mt-1">0</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-800 rounded-full opacity-50 blur-3xl"></div>
                </div>
            </div>
        </div>
    );
}
