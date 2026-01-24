import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { TabProvider } from "@/context/TabContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Dicey - Online Casino & Sports Betting",
  description: "Experience the thrill of online casino games and sports betting at Dicey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} theme-purple`}>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <TabProvider>
            {children}
          </TabProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
