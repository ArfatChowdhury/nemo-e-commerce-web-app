import { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
    title: "Wishlist | Nemo E-commerce",
    description: "View and manage your favorite products in your wishlist.",
};

export default function WishlistPage() {
    return <WishlistClient />;
}