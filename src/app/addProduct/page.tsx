import { Metadata } from "next";
import AddProductClient from "./AddProductClient";

export const metadata: Metadata = {
    title: "Add Product | Nemo E-commerce",
    description: "Create a new product listing at Nemo E-commerce.",
};

export default function AddProductPage() {
    return <AddProductClient />;
}