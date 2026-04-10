import type { Metadata } from "next";
import { Cinzel, Noto_Serif_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import React from 'react';
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  weight: ['400', '700'], 
  variable: '--font-cinzel' 
});

const notoSerif = Noto_Serif_JP({ 
  subsets: ["latin"], 
  weight: ['300', '400', '700'], 
  variable: '--font-noto-serif' 
});

const shippori = Shippori_Mincho({ 
  weight: ['400', '700'], 
  subsets: ["latin"],
  variable: '--font-shippori' 
});

export const metadata: Metadata = {
  title: "Bar Sally | 大和郡山",
  description: "奈良県大和郡山市にあるBar Sally（バー サリー）。1978年創業、落ち着いた空間で極上のひとときを。2代目マスター新田豊。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${cinzel.variable} ${notoSerif.variable} ${shippori.variable} font-shippori bg-black text-white antialiased`}>
        <SmoothScroll>
          <Header />
            <main className="min-h-screen">
              {children}
            </main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
