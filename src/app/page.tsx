
import HomePage from "./components/HomePage";
import HotDealsCarosuel from "./components/HotDealsCarosuel";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <div className="max-w-7xl px-4 py-8 w-full" suppressHydrationWarning>
        <HotDealsCarosuel />
        <HomePage />
      </div>
    </div>
  );


}
