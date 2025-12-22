import { Metadata } from "next";
import CategoriesClient from "./CategoriesClient";

export const metadata: Metadata = {
    title: "Categories | Nemo E-commerce",
    description: "Browse our curated collections of premium footwear and accessories at Nemo E-commerce.",
};

export default function CategoriesPage() {
    return <CategoriesClient />;
}