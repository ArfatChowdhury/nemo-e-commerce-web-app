import CategorySidebar from "@/app/components/CategorySidebar";

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Persistent Sidebar */}
                <CategorySidebar />

                {/* Dynamic Content (Products) */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
