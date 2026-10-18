import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bodyFont = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "VELOURA — Quiet Luxury Clothing | Cashmere, Silk & Italian Wool",
  description:
    "Considered silhouettes in cashmere, silk and Italian wool. Ethically made in small batches since 2016. Free shipping over $150.",
  keywords: ["VELOURA", "quiet luxury", "cashmere", "silk dress", "wool coat", "minimalist fashion", "sustainable clothing"],
  authors: [{ name: "VELOURA Atelier" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "VELOURA — Quiet Luxury Clothing",
    description: "Considered silhouettes in cashmere, silk and Italian wool. AW'25 has arrived.",
    siteName: "VELOURA",
    type: "website",
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
        className={`${displayFont.variable} ${bodyFont.variable} font-body antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
