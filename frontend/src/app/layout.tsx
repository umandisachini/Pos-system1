import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const inter = fontSans;

export const metadata: Metadata = {
  title: "TechTrend",
  description: "POS system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body
        className={`${inter.className} flex items-start justify-between`}
      >
       <main className="w-full h-full">
        {children}
        <Toaster />
       </main>
      </body>
    </html>
  );
}
