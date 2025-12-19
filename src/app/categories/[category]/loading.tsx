export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="mb-8">
                <div className="h-10 bg-gray-200 w-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-100 w-32 rounded-lg"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-50 h-80 rounded-2xl"></div>
                ))}
            </div>
        </div>
    );
}
