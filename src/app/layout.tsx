import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manu Kamath — Design Leader, Musician, Coach",
  description:
    "Design leader with 12+ years across product, fintech, and health-tech. Also a guitarist, cover artist, and eCommerce coach.",
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
        {/* Satoshi via Fontshare CDN — self-host in Chat 4 */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-full bg-bg text-text-primary">{children}</body>
    </html>
  );
}
