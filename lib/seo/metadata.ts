import type { Metadata } from "next";

const BASE = "https://photo2sticker.ru";
const OG_IMAGE = `${BASE}/opengraph.jpg`;

/** Возвращает metadata с canonical, openGraph и twitter (уникальные title/description/url, общая картинка). */
export function withSocialMeta({
  title,
  description,
  url,
  ...rest
}: {
  title: string;
  description: string;
  url: string;
} & Metadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    ...rest,
  };
}

export { BASE, OG_IMAGE };
