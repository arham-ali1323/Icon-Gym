import type { Metadata } from "next";
import { Orbitron, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/session-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ActiveThemeProvider } from "@/components/dashboard/active-theme";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";


export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Icon Gym - Complete Gym Management System",
  description: "Professional gym management system with member tracking, class scheduling, and payment processing",
  themeColor: "#FF6B35",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-256x256.png",
    apple: [
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${orbitron.variable} antialiased`}
        suppressHydrationWarning
      >
        <ActiveThemeProvider>
          <AuthProvider>
            <Providers>
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
            </Providers>
          </AuthProvider>
        </ActiveThemeProvider>
      </body>
    </html>
  );
}
