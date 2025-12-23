import { Metadata } from "next";
import OrderHistoryClient from "./OrderHistoryClient";

export const metadata: Metadata = {
    title: "Order History | Nemo E-commerce",
    description: "View your past orders and purchase history at Nemo E-commerce.",
};

export default function OrderHistoryPage() {
    return <OrderHistoryClient />;
}
