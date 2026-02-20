"use client";

import { useState, useEffect, useCallback } from "react";
import type { EmotionPack } from "@/lib/emotion-packs";

/** Фото «до» — как на проде (photo-1.webp), при ошибке загрузки — текст «Фото». */
const HERO_PHOTO_SRC = "/images/examples/photo-1.webp";

function HeroPhotoPlaceholder() {
  const [error, setError] = useState(false);
  if (error) {
    return <span className="text-muted-foreground text-sm">Фото</span>;
  }
  return (
    <img
      src={HERO_PHOTO_SRC}
      alt="Фото"
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  );
}

type PackFromApi = EmotionPack & { image_urls?: string[] };

/** Пилюли + карусель только по пакам с cluster=true (из API). Без дефолтного списка — показываем только то, что выложено на лендинг. */
export function EmotionPackCarousel() {
  const [packs, setPacks] = useState<PackFromApi[]>([]);
  const [currentPackId, setCurrentPackId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch("/api/packs/content-sets")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: { id: string; name_ru: string; labels: string[]; sort_order: number; image_urls?: string[] }[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map((row) => ({
            id: row.id,
            name_ru: row.name_ru ?? "",
            labels: Array.isArray(row.labels) ? row.labels : [],
            sort_order: Number(row.sort_order) ?? 0,
            image_urls: row.image_urls,
          }));
          setPacks(list);
          setCurrentPackId((prev) => (prev && list.some((p) => p.id === prev)) ? prev : list[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const currentPack =
    packs.find((p) => p.id === currentPackId) ?? packs[0];
  const carouselImages = currentPack?.image_urls ?? [];
  const stickers = carouselImages.map((src, i) => ({
    src,
    label: currentPack?.labels[i] ?? "",
  }));

  const goTo = useCallback((next: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(next);
      setFade(true);
    }, 200);
  }, []);

  const selectPack = useCallback((packId: string) => {
    setCurrentPackId(packId);
    setCurrent(0);
  }, []);

  useEffect(() => {
    if (stickers.length <= 1) return;
    const interval = setInterval(() => goTo((current + 1) % stickers.length), 3000);
    return () => clearInterval(interval);
  }, [current, goTo, stickers.length]);

  const prev = () => goTo((current - 1 + stickers.length) % stickers.length);
  const next = () => goTo((current + 1) % stickers.length);

  if (packs.length === 0) return null;

  return (
    <>
      {/* Пилюли — кнопки переключения пака, не ссылки */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
        {packs.map((pack) => (
          <button
            key={pack.id}
            type="button"
            onClick={() => selectPack(pack.id)}
            className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors ${
              currentPackId === pack.id
                ? "bg-primary text-primary-foreground"
                : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white"
            }`}
          >
            {pack.name_ru}
          </button>
        ))}
      </div>

      {/* Фото + карусель стикеров выбранного пака */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 px-4">
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
            <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg bg-white/5 aspect-square flex items-center justify-center">
              <HeroPhotoPlaceholder />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-primary shrink-0">→</div>
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
            <div className="relative aspect-square w-full flex items-center justify-center overflow-visible">
              {stickers[current]?.src ? (
                <img
                  src={stickers[current].src}
                  alt={`Стикер — ${stickers[current].label}`}
                  className={`w-full h-full object-contain drop-shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-opacity duration-200 ${
                    fade ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <span className="text-muted-foreground text-sm">
                  {stickers.length === 0 ? "Нет примеров" : "Стикер"}
                </span>
              )}
            </div>
          </div>
        </div>

        {stickers.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={prev}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Предыдущий стиль"
          >
            ‹
          </button>
          <div className="flex gap-1.5">
            {stickers.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-4" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={stickers[i].label}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Следующий стиль"
          >
            ›
          </button>
          </div>
        )}
      </div>
    </>
  );
}
