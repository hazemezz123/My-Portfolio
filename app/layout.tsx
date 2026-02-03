import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import MotionWrapper from "./components/ui/MotionConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(
  /\/$/,
  "",
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hazem Ezz | Full Stack Developer",
    template: "%s | Hazem Ezz",
  },
  description:
    "Full stack developer specializing in Next.js, React, Tailwind CSS, and performance-driven web experiences.",
  applicationName: "Hazem Ezz Portfolio",
  authors: [{ name: "Hazem Ezz" }],
  creator: "Hazem Ezz",
  keywords: [
    "Hazem Ezz",
    "full stack developer",
    "Next.js developer",
    "React developer",
    "web developer portfolio",
    "Tailwind CSS",
    "Framer Motion",
    "TypeScript",
    "frontend developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hazem Ezz | Full Stack Developer",
    description:
      "Full stack developer specializing in Next.js, React, Tailwind CSS, and performance-driven web experiences.",
    url: "/",
    siteName: "Hazem Ezz Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/Hazem.jpg",
        alt: "Hazem Ezz portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazem Ezz | Full Stack Developer",
    description:
      "Full stack developer specializing in Next.js, React, Tailwind CSS, and performance-driven web experiences.",
    images: ["/images/Hazem.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <MotionWrapper>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </MotionWrapper>
      </body>
    </html>
  );
}
