import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Regent Hitech | Industrial Valve Manufacturer in India — Knife Gate, Butterfly, Ball, Control Valves",
    template: "%s | Regent Hitech Valves",
  },
  description:
    "Regent Hitech Pvt. Ltd. (Noida, since 1999) manufactures knife gate, butterfly, ball, gate, globe, check, control and IBR valves. ISO 9001:2015 certified, exporting to 20+ countries.",
  keywords: [
    "valve manufacturer India",
    "knife gate valve manufacturer",
    "butterfly valve manufacturer",
    "industrial control valves",
    "IBR valves",
    "Regent Hitech",
    "Noida valves",
  ],
  openGraph: {
    type: "website",
    siteName: "Regent Hitech Valves",
    title: "Regent Hitech — Industrial Valve Manufacturer, India",
    description: "Precision-engineered flow control solutions since 1999. Knife gate, butterfly, ball, gate, globe, check & control valves.",
    images: [{ url: "/img/hero-industrial.jpg", width: 1672, height: 940 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a2447",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  foundingDate: String(SITE.founded),
  email: SITE.email,
  telephone: "+91-9811099567",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-6, Sector 59, Near Metro Station",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  sameAs: [SITE.social.facebook, SITE.social.linkedin, SITE.social.youtube],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body className="min-h-screen bg-white text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
