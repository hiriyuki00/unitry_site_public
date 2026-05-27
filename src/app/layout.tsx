import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LiquidCursor from "@/components/LiquidCursor";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Unitry | 映像制作で交流を紡ぐ",
    template: "%s | Unitry",
  },
  description:
    "Unitryは千葉県我孫子市を拠点に、映像制作を通じて大学生と子どもの交流を促し、地域社会の絆を深める任意団体です。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Unitry",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <GoogleAnalytics />
        <LiquidCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
