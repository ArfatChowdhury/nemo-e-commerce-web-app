import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./store/StoreProvider";
import { AuthProvider } from "./context/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Nemo E-commerce | Premium Shopping",
  description: "Discover the latest in premium shopping at Nemo E-commerce. Run Like Nemo.",
  icons: {
    icon: "/nemo-logo for metadat.png",
    apple: "/nemo-logo for metadat.png",
  },
  openGraph: {
    title: "Nemo E-commerce | Premium Shopping",
    description: "Discover the latest in premium shopping at Nemo E-commerce. Run Like Nemo.",
    images: [
      {
        url: "/nemo-logo for metadat.png",
        width: 800,
        height: 600,
        alt: "Nemo E-commerce Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
