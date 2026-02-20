"use client";

import { useState, useEffect, useCallback } from "react";

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

/** Карусель: фото + один пак из 9 стикеров (без пилюль). Для страниц стилей по landing_hero_paths. */
export function FixedPackCarousel({ imageUrls }: { imageUrls: string[] }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((next: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(next);
      setFade(true);
    }, 200);
  }, []);

  useEffect(() => {
    if (imageUrls.length <= 1) return;
    const interval = setInterval(() => goTo((current + 1) % imageUrls.length), 3000);
    return () => clearInterval(interval);
  }, [current, goTo, imageUrls.length]);

  const prev = () => goTo((current - 1 + imageUrls.length) % imageUrls.length);
  const next = () => goTo((current + 1) % imageUrls.length);

  if (imageUrls.length === 0) return null;

  const src = imageUrls[current];
  return (
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
            {src ? (
              <img
                src={src}
                alt="Стикер"
                className={`w-full h-full object-contain drop-shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-opacity duration-200 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <span className="text-muted-foreground text-sm">Стикер</span>
            )}
          </div>
        </div>
      </div>
      {imageUrls.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={prev}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Предыдущий"
          >
            ‹
          </button>
          <div className="flex gap-1.5">
            {imageUrls.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-4" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Стикер ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Следующий"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
