import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MONOCOQUE // Automotive Anatomy Archive",
  description: "Interactive Knolling & Exploded Parts Catalog. Deconstructing motorsport unibodies, powertrains, and aerodynamic assemblies.",
  keywords: [
    "Monocoque",
    "Automotive Anatomy",
    "Exploded Parts Catalog",
    "Knolling Teardown",
    "Motorsport Blueprint",
    "Chassis Engineering",
    "ISO 7200"
  ],
  authors: [{ name: "MONOCOQUE Automotive Archive" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
