import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";

export const metadata: Metadata = {
  title: "RAYA - Where to Buy",
  description: "Find out where to discover RAYA.",
};

export default function WhereToBuyPage() {
  return <BrandPage page="whereToBuy" />;
}
