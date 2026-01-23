import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { TabProvider } from "@/context/TabContext";

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased font-sans">
        <TabProvider>
          {children}
        </TabProvider>
      </body>
    </html>
  );
}
