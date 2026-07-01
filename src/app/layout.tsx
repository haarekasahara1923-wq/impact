import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "Impact Institute | Premier Coaching in Gwalior",
  description: "Impact Institute is Gwalior's leading coaching center for Class 3–10 (All Subjects) and Class 11–12 (Arts Stream). Experienced faculty, regular tests, affordable fees, and personalized attention.",
  keywords: ["Impact Institute Gwalior", "Impact Institute Morar", "Coaching Institute Gwalior", "Class 3-10 Coaching Gwalior", "Arts Stream Coaching Gwalior", "Gwalior Coaching Centre"],
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
      <body className="font-sans min-h-screen flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
