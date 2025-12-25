import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Care.xyz - Trusted Care Services for Your Loved Ones",
  description: "Find reliable and trusted care services for children, elderly, and other family members. Book easily and securely through our platform.",
  keywords: "care services, babysitting, elderly care, sick care, caregiving",
  openGraph: {
    title: "Care.xyz - Trusted Care Services",
    description: "Professional care services for your loved ones. Book now!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <div className="pt-16 grow">
            {children}
          </div>
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
