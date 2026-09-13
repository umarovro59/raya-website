import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";

export const metadata: Metadata = {
  title: "RAYA - Ingredients",
  description: "Discover the flavours, fizz and product character behind RAYA.",
};

export default function IngredientsPage() {
  return <BrandPage page="ingredients" />;
}
