import { Metadata } from "next";
import EditProductClient from "./EditProductClient";

export const metadata: Metadata = {
    title: "Edit Product | Nemo E-commerce",
    description: "Manage and update your product listings at Nemo E-commerce.",
};

export default function EditProductPage() {
    return <EditProductClient />;
}