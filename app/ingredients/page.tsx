import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";
import { pageMetadata } from "../site-metadata";

export const metadata: Metadata = pageMetadata("RAYA — Ingredients", "Discover the flavours, fizz and product character behind RAYA.");

export default function IngredientsPage() {
  return <BrandPage page="ingredients" />;
}
