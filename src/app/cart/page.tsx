import { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
    title: "Shopping Cart | Nemo E-commerce",
    description: "Review your items and proceed to checkout at Nemo E-commerce.",
};

export default function CartPage() {
    return <CartClient />;
}