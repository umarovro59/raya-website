import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";

export const metadata: Metadata = {
  title: "RAYA - Lifestyle",
  description: "Discover the world and lifestyle of RAYA.",
};

export default function LifestylePage() {
  return <BrandPage page="lifestyle" />;
}
