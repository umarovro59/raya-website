import type { Metadata } from "next";

export const siteDescription = "RAYA is a sparkling fruit drink made in Andijan, Uzbekistan.";
export const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "RAYA — Taste the Fruit. Pomegranate sparkling fruit drink." };

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [socialImage] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}
