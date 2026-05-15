import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Manu Kamath — Design Leader, Musician, Coach",
  description:
    "Design leader with 12+ years across product, fintech, and health-tech. Also a guitarist, cover artist, and eCommerce coach.",
  metadataBase: new URL("https://manukamath.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Manu Kamath",
    description: "Design leader. Musician. Coach.",
    url: "https://manukamath.com",
    siteName: "Manu Kamath",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manu Kamath",
    description: "Design leader. Musician. Coach.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preload" href="/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/satoshi-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/satoshi-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-bg text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-mono"
          style={{ backgroundColor: "var(--accent-green)", color: "#141414" }}
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
