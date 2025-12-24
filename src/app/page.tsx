
import HomePage from "./components/HomePage";
import HotDealsCarosuel from "./components/HotDealsCarosuel";
import AppDownloadBanner from "./components/AppDownloadBanner";
import ProductSkeleton from "./components/ProductSkeleton";
import { Suspense } from "react";

function HomeSkeleton() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <div className="max-w-7xl px-4 py-8 w-full" suppressHydrationWarning>
        <HotDealsCarosuel />
        <AppDownloadBanner />
        <Suspense fallback={<HomeSkeleton />}>
          <HomePage />
        </Suspense>
      </div>
    </div>
  );


}
