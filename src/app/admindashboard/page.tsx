import { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
    title: "Admin Dashboard | Nemo E-commerce",
    description: "Manage your store's inventory, users, and analytics from the Nemo E-commerce Admin Dashboard.",
};

export default function AdminDashboard() {
    return <AdminDashboardClient />;
}