import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavItemWithDropdown from "@/components/NavItemWithDropdown";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DVS Computers",
    description: "Your one-stop shop for high-performance computers and accessories",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
        >
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">DVS Computers</h1>
                <nav>
                    <ul className="flex gap-6">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <NavItemWithDropdown />
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        {children}
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 DVS Computers. All rights reserved.</p>
                <p>Contact us: support@dvscomputers.com | (123) 456-7890</p>
            </div>
        </footer>
        </body>
        </html>
    );
}