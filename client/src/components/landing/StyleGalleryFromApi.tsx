import { useState, useEffect } from "react";
import { StyleGallery, type StyleItem } from "@/components/landing/StyleGallery";

const stripIzFoto = (s: string) => s.replace(/\s+из фото\s*$/i, "").trim();

type StyleGroupFromApi = {
  id: string;
  name_ru: string;
  emoji: string;
  sort_order: number;
  slug: string;
  preview_image: string | null;
};

/** Галерея стилей только из API GET /api/styles/groups. */
export function StyleGalleryFromApi() {
  const [items, setItems] = useState<StyleItem[]>([]);

  useEffect(() => {
    fetch("/api/styles/groups")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: StyleGroupFromApi[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setItems(
          data.map((row) => ({
            name: stripIzFoto(row.name_ru ?? ""),
            emoji: row.emoji ?? "✨",
            image: row.preview_image ?? "",
            href: `/style/${row.slug ?? row.id}`,
          }))
        );
      })
      .catch(() => {});
  }, []);

  return <StyleGallery items={items} />;
}
