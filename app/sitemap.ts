import type { MetadataRoute } from "next";
import { getAllClusterSlugs, MAIN_PAGE_CLUSTER_SLUG } from "@/lib/seo/cluster-pages";
import { getAllStyleGroupSlugs, getAllSubstyleParams } from "@/lib/seo/style-groups";

const BASE = "https://photo2sticker.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().slice(0, 10);
  const clusterSlugs = getAllClusterSlugs().filter((s) => s !== MAIN_PAGE_CLUSTER_SLUG);
  const clusterEntries: MetadataRoute.Sitemap = clusterSlugs.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: now,
    priority: 0.9,
  }));
  const styleCatalogEntry = { url: BASE + "/style/", lastModified: now, priority: 0.85 };
  const styleGroupEntries: MetadataRoute.Sitemap = getAllStyleGroupSlugs().map((slug) => ({
    url: `${BASE}/style/${slug}`,
    lastModified: now,
    priority: 0.8,
  }));
  const substyleEntries: MetadataRoute.Sitemap = getAllSubstyleParams().map(
    ({ group, substyle }) => ({
      url: `${BASE}/style/${group}/${substyle}`,
      lastModified: now,
      priority: 0.7,
    })
  );
  return [
    { url: BASE + "/", lastModified: now, priority: 1 },
    ...clusterEntries,
    styleCatalogEntry,
    ...styleGroupEntries,
    ...substyleEntries,
  ];
}
