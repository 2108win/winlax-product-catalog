import Footer from "@/components/layouts/Footer";
import Header, { OnTopHeader } from "@/components/layouts/Header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalog",
  description: "Catalog of products by WinLax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-lt-installed="true"
      className="light"
    >
      <body
        className={`${publicSans.variable} flex min-h-svh flex-col antialiased`}
      >
        <OnTopHeader />
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
