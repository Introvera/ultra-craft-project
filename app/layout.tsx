import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import LayoutShell from "./layoutshell";

const SITE_URL = "https://www.ultracraft.lk";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ultracraft | Furniture Shop in Bambalapitiya & Colombo",
    template: "%s | Ultracraft",
  },
  description:
    "Ultracraft is a premium furniture shop serving Bambalapitiya, Wellawaththa, and Colombo, with delivery and consultations across nearby areas.",
  keywords: [
    "furniture shop Bambalapitiya",
    "furniture shops in Bambalapitiya",
    "furniture shop Colombo",
    "furniture shop near me Colombo",
    "furniture shop Wellawatta",
    "custom furniture Sri Lanka",
    "interior solutions Colombo",
    "furniture shop within 40km of Bambalapitiya",
    "beds",
    "wardrobe",
    "sofa",
    "dining table",
    "pantry",
    "furniture shops near me",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Ultracraft | Furniture Shop in Bambalapitiya & Colombo",
    description:
      "Premium furniture and interior solutions serving Bambalapitiya, Colombo, and nearby areas within 40km.",
    siteName: "Ultracraft",
    locale: "en_LK",
    images: [
      {
        url: "/footer/UltracraftBrandLogo.webp",
        width: 1200,
        height: 630,
        alt: "Ultracraft furniture showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultracraft | Furniture Shop in Bambalapitiya & Colombo",
    description:
      "Find premium furniture in Bambalapitiya, Colombo, and nearby locations within 40km.",
    images: ["/footer/UltracraftBrandLogo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[var(--page-bg)]">
      <body suppressHydrationWarning
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-[var(--page-bg)]`}
      >
        <Providers>
          <LayoutShell>{children}</LayoutShell>
          </Providers>
      </body>
    </html>
  );
}
