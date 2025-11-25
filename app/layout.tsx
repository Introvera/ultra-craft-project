import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer-component/footer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultra Craft",
  description: "Legacy of infinite living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning="true" data-qb-installed="true">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-[var(--page-bg)]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
