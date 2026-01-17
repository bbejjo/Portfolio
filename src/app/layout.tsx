import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";
import { defaultLocale, type Locale } from "@/i18n/translations";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const displayFont = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: true,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const htmlLocale: Locale =
    cookieLocale === "ka" || cookieLocale === "en"
      ? cookieLocale
      : defaultLocale;

  return (
    <html lang={htmlLocale}>
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
