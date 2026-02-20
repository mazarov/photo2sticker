import type { Metadata } from "next";
import { getClusterBySlug } from "@/lib/seo/cluster-pages";
import { withSocialMeta } from "@/lib/seo/metadata";
import { ClusterPageContent } from "@/components/landing/ClusterPageContent";
import { getHeroPresetForPath } from "@/lib/landing-hero-preset";

const SLUG = "s-nadpisyu";

export function generateMetadata(): Metadata {
  const cluster = getClusterBySlug(SLUG)!;
  return withSocialMeta({
    title: cluster.title,
    description: cluster.metaDescription,
    url: `https://photo2sticker.ru/${SLUG}`,
  });
}

export default async function Page() {
  const cluster = getClusterBySlug(SLUG)!;
  const heroPreset = await getHeroPresetForPath(`/${SLUG}`);
  return <ClusterPageContent cluster={cluster} heroPackUrls={heroPreset?.image_urls} />;
}
