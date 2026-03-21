import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";


const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400","700"],
});

export const metadata: Metadata = {
  title: "BlazikenCoffee",
  description: "Frontend with Next.js + Sanity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={urbanist.className}
    >
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}