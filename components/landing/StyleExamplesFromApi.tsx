"use client";

import { useState, useEffect } from "react";

type ExampleItem = { id: string; public_url: string; style_preset_id: string };

/**
 * Блок «Примеры стикеров» из API GET /api/styles/[groupId]/examples (stickers is_example по группе).
 * На странице подстиля можно отфильтровать по presetId.
 */
export function StyleExamplesFromApi({
  groupSlug,
  presetIdFilter,
  sectionTitle = "Примеры стикеров",
  sectionSubtitle = "Реальные стикеры из бота в этом стиле.",
}: {
  groupSlug: string;
  presetIdFilter?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
}) {
  const [items, setItems] = useState<ExampleItem[]>([]);

  useEffect(() => {
    fetch(`/api/styles/${encodeURIComponent(groupSlug)}/examples?limit=16`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: ExampleItem[]) => {
        if (!Array.isArray(data)) return;
        const list = presetIdFilter
          ? data.filter((r) => r.style_preset_id === presetIdFilter)
          : data;
        setItems(list);
      })
      .catch(() => {});
  }, [groupSlug, presetIdFilter]);

  if (items.length === 0) return null;

  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-2 sm:mb-3">
          {sectionTitle}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-6 sm:mb-10">
          {sectionSubtitle}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.map((ex) => (
            <div
              key={ex.id}
              className="aspect-square w-full rounded-lg flex items-center justify-center overflow-hidden bg-white/5"
            >
              <img
                src={ex.public_url}
                alt="Пример стикера"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
