"use client";

import { useState, useEffect } from "react";
import { StyleGallery } from "@/components/landing/StyleGallery";

const stripIzFoto = (s: string) => s.replace(/\s+из фото\s*$/i, "").trim();

type StyleItem = { name: string; emoji: string; image: string; href?: string };

type StyleGroupFromApi = {
  id: string;
  name_ru: string;
  emoji: string;
  sort_order: number;
  slug: string;
  preview_image: string | null;
};

/**
 * Картинки в галерее стилей — только из API GET /api/styles/groups (preview_image из БД).
 * Без fallback на тестовые/загруженные картинки: если preview_image нет — пустая строка (карточка без превью).
 */

export function StyleGalleryFromApi({ fallbackItems = [] }: { fallbackItems?: StyleItem[] }) {
  const [items, setItems] = useState<StyleItem[]>(fallbackItems);

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
