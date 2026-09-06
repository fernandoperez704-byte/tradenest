import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tradenestxacademy.com"),

  applicationName: "TradeNestX",

  title: {
    default: "TradeNestX | Learn Trading Through Practice",
    template: "%s | TradeNestX",
  },

description:
  "Learn trading with TradeNestX through structured education, risk-free crypto spot and futures practice, market education, trade reviews, and Gaby AI coaching.",

  keywords: [
    "TradeNestX",
    "trading education",
    "trading simulator",
    "crypto trading simulator",
    "paper trading",
    "learn trading",
    "crypto futures simulator",
    "trading practice",
    "trading risk management",
    "Gaby AI",
  ],


openGraph: {
  type: "website",
  url: "https://www.tradenestxacademy.com",
  siteName: "TradeNestX",
  title: "TradeNestX | Learn Trading Through Practice",
  description:
    "Learn trading with TradeNestX through structured education, risk-free crypto spot and futures practice, market education, trade reviews, and Gaby AI coaching.",
},

twitter: {
  card: "summary_large_image",
  title: "TradeNestX | Learn Trading Through Practice",
  description:
    "Learn trading with TradeNestX through structured education, risk-free crypto spot and futures practice, market education, trade reviews, and Gaby AI coaching.",
},

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}