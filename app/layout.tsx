import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StegaSafe — Pesan Rahasia di Dalam Gambar",
  description:
    "Sembunyikan dan ekstrak pesan terenkripsi di dalam gambar PNG, seluruhnya di browser Anda.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
