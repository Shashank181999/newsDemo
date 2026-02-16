import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BroadcastPro ME - Broadcast & Media Technology News",
  description: "Your trusted source for broadcast and media technology news, insights, and analysis from the Middle East and Africa. Covering AI, streaming, virtual production, and more.",
  keywords: ["broadcast", "media technology", "streaming", "OTT", "AI", "virtual production", "Middle East", "Africa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <Header />
        <NewsTicker />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
