import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";
import { pageMetadata } from "../site-metadata";

export const metadata: Metadata = pageMetadata("RAYA — Our Story", "Discover the story of RAYA, made in Andijan, Uzbekistan.");

export default function OurStoryPage() {
  return <BrandPage page="story" />;
}
