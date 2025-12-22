import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
    title: "Sign In | Nemo E-commerce",
    description: "Sign in to your Nemo E-commerce account to manage your orders and profile.",
};

export default function LoginPage() {
    return <LoginClient />;
}
