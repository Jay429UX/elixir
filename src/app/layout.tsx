import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { TabProvider } from "@/context/TabContext";

/* Hero / display font. Montserrat loaded as a variable font (weights 100-900). */
const heroFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elixir - Online Casino & Sports Betting (Design Concept)",
  description: "A design concept for an online casino and sportsbook, built by Layer84 as a portfolio project.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#140d24" },
    { media: "(prefers-color-scheme: light)", color: "#140d24" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${heroFont.variable} theme-purple`}>
      <body className="antialiased font-sans">
        <TabProvider>
          {children}
        </TabProvider>
        <Analytics />
      </body>
    </html>
  );
}
