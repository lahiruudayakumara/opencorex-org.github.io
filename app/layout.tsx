import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "OpenCorex",
    template: "%s | OpenCorex",
  },
  description:
    "OpenCorex is a trusted front door for open resilience software, contributor pathways, and clear public documentation.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "google-adsense-account": "ca-pub-2564085662773799",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2564085662773799" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2564085662773799"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
