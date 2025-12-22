import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
    title: "User Profile | Nemo E-commerce",
    description: "Manage your account settings and shipping information at Nemo E-commerce.",
};

export default function ProfilePage() {
    return <ProfileClient />;
}
