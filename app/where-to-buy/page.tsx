import type { Metadata } from "next";
import { BrandPage } from "../../components/brand-page";
import { pageMetadata } from "../site-metadata";

export const metadata: Metadata = pageMetadata("RAYA — Where to Buy", "Find out where to discover RAYA.");

export default function WhereToBuyPage() {
  return <BrandPage page="whereToBuy" />;
}
