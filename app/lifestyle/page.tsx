import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";
import { pageMetadata } from "../site-metadata";

export const metadata: Metadata = pageMetadata("RAYA — Lifestyle", "Discover the world and lifestyle of RAYA.");

export default function LifestylePage() {
  return <BrandPage page="lifestyle" />;
}
