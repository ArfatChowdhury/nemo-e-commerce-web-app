import { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
    title: "Create Account | Nemo E-commerce",
    description: "Join the Nemo E-commerce community and start shopping for premium footwear and accessories.",
};

export default function SignupPage() {
    return <SignupClient />;
}
