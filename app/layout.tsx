import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { LanguageProvider } from "../components/language-provider";
import { pageMetadata, siteDescription } from "./site-metadata";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  ...pageMetadata("RAYA — Taste the Fruit", siteDescription),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://raya-website-theta.vercel.app",
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
