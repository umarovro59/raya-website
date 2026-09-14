import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { LanguageProvider } from "../components/language-provider";
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
  title: "RAYA - Taste the Fruit",
  description: "RAYA is a sparkling fruit drink made in Andijan, Uzbekistan.",
  openGraph: {
    title: "RAYA - Taste the Fruit",
    description: "RAYA is a sparkling fruit drink made in Andijan, Uzbekistan.",
    type: "website",
  },
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
