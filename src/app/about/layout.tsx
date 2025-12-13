import Link from "next/link";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Link href="/">Home</Link> |
            <Link href="/about">About</Link> |
            <Link href="/contact">Contact</Link>
            <hr />
            {children}
        </div>)
}