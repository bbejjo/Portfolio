import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumen Trio - Portfolio Studio",
    template: "%s | Lumen Trio",
  },
  description:
    "A modern portfolio landing page for a three-person studio specializing in premium web experiences.",
  openGraph: {
    title: "Lumen Trio - Portfolio Studio",
    description:
      "A modern portfolio landing page for a three-person studio specializing in premium web experiences.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lumen Trio - Portfolio Studio",
    description:
      "A modern portfolio landing page for a three-person studio specializing in premium web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${displayFont.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ScrollToTopOnLoad />
        {children}
      </body>
    </html>
  );
}
