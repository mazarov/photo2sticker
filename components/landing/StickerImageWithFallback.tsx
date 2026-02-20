"use client";

import { useState } from "react";

/** Заглушка при ошибке загрузки или отсутствии картинки. Экспортируется для использования без img. */
export function StickerFallbackPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1.5 bg-white/5 rounded-lg border border-white/10 ${className ?? ""}`}
      aria-hidden
    >
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-[10px] sm:text-xs text-muted-foreground/70">Стикер</span>
    </div>
  );
}

/**
 * Картинка стикера с заглушкой при ошибке загрузки (битая ссылка, 404, сеть).
 * fetchPriority="high" + loading="eager" для LCP-элемента (первый стикер в Hero).
 */
export function StickerImageWithFallback({
  src,
  alt,
  className = "",
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  /** "high" для LCP-изображения (первый стикер в Hero) — не использовать lazy */
  fetchPriority?: "high" | "low" | "auto";
}) {
  const [error, setError] = useState(false);

  if (error) {
    return <StickerFallbackPlaceholder className={className} />;
  }

  const isLcp = fetchPriority === "high";
  return (
    <img
      src={src}
      alt={alt}
      loading={isLcp ? "eager" : "lazy"}
      fetchPriority={isLcp ? "high" : undefined}
      className={className}
      onError={() => setError(true)}
    />
  );
}
