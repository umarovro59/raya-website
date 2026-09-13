import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";

export const metadata: Metadata = {
  title: "RAYA - Our Story",
  description: "Discover the story of RAYA, made in Andijan, Uzbekistan.",
};

export default function OurStoryPage() {
  return <BrandPage page="story" />;
}
