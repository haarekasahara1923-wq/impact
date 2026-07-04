import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Impact Institute | Premier Coaching in Gwalior",
  description:
    "Impact Institute is Gwalior's leading coaching center for Class 3–10 (All Subjects) and Class 11–12 (Arts Stream). Experienced faculty, regular tests, affordable fees, and personalized attention.",
  keywords: [
    "Impact Institute Gwalior",
    "Impact Institute Morar",
    "Coaching Institute Gwalior",
    "Class 3-10 Coaching Gwalior",
    "Arts Stream Coaching Gwalior",
    "Gwalior Coaching Centre",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Impact Institute",
    startupImage: "/logo.jpg",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#1E3A8A",
    "msapplication-tap-highlight": "no",
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
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white text-slate-900">
        {/* Service Worker registration (client-side) */}
        <ServiceWorkerRegister />

        {/* PWA Install prompt banner */}
        <PWAInstallPrompt />

        <Navbar />
        {/* pb-20 on mobile to leave space for bottom nav */}
        <main className="flex-grow pb-20 md:pb-0">{children}</main>
        <Footer />

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
