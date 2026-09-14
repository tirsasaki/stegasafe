import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";
import Script from "next/script";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "StegaSafe — Hide Secret Messages in Images",
  description:
    "Hide and extract encrypted messages inside PNG images, entirely in your browser.",
  icons: { icon: `${basePath}/favicon.svg` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        
          <Script
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon='{"token":"cfdd88f13a4447ae8dc8738db2c44a58"}'
    strategy="afterInteractive"
          />
      </body>
    </html>
  );
}
