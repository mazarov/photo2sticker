import { useMemo, useState, useEffect, useCallback } from "react";

const UTM_VARIANTS: {
  match: string[];
  h1: string;
  sub: string;
}[] = [
  {
    match: ["free", "online"],
    h1: "Бесплатный стикер из фото — за 30 секунд",
    sub: "Без регистрации, без оплаты. Просто отправь фото боту",
  },
  {
    match: ["bot"],
    h1: "Telegram бот: фото → стикер за 30 секунд",
    sub: "Выбери стиль, добавь эмоции. Первый стикер бесплатно",
  },
  {
    match: ["ai", "neural"],
    h1: "ИИ превращает фото в стикеры",
    sub: "Нейросеть сохраняет черты лица. 10+ стилей на выбор",
  },
  {
    match: ["telegram", "tg"],
    h1: "Стикеры для Telegram из твоих фото",
    sub: "Отправь фото боту — стикер с твоим лицом за 30 сек",
  },
];

const DEFAULT_H1 = "Превращаем фото в стикеры для Telegram";
const DEFAULT_SUB =
  "ИИ сохраняет черты лица и добавляет стиль. 30 секунд — и стикер готов";

const PHOTO = "/images/examples/photo-1.webp";

const stickers = [
  { src: "/images/examples/sticker-klassicheskiy.webp", style: "Классический" },
  { src: "/images/examples/sticker-tyomnyy.webp", style: "Тёмный" },
  { src: "/images/examples/sticker-romantik.webp", style: "Романтик" },
  { src: "/images/examples/sticker-chibi.webp", style: "Чиби" },
  { src: "/images/examples/sticker-telegram.webp", style: "Телеграм" },
  { src: "/images/examples/sticker-kavaii.webp", style: "Каваий" },
  { src: "/images/examples/sticker-kotik.webp", style: "Котик" },
  { src: "/images/examples/sticker-nezhnyy.webp", style: "Нежный" },
  { src: "/images/examples/sticker-parochki.webp", style: "Парочки" },
  { src: "/images/examples/sticker-s-serdechkami.webp", style: "С сердечками" },
  { src: "/images/examples/sticker-amerikanskiy.webp", style: "Американский" },
  { src: "/images/examples/sticker-sovremennyy.webp", style: "Современный" },
  { src: "/images/examples/sticker-klassika.webp", style: "Классика" },
  { src: "/images/examples/sticker-romantik2.webp", style: "Романтик" },
  { src: "/images/examples/sticker-90e.webp", style: "90-е" },
  { src: "/images/examples/sticker-lyubov-eto.webp", style: "Любовь это..." },
];

function getHeadlines(): { h1: string; sub: string } {
  const params = new URLSearchParams(window.location.search);
  const campaign = (params.get("utm_campaign") || "").toLowerCase();

  if (campaign) {
    for (const v of UTM_VARIANTS) {
      if (v.match.some((k) => campaign.includes(k))) {
        return { h1: v.h1, sub: v.sub };
      }
    }
  }

  return { h1: DEFAULT_H1, sub: DEFAULT_SUB };
}

export function Hero() {
  const { h1, sub } = useMemo(() => getHeadlines(), []);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback(
    (next: number) => {
      setFade(false);
      setTimeout(() => {
        setCurrent(next);
        setFade(true);
      }, 200);
    },
    []
  );

  // Auto-rotate stickers
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % stickers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [current, goTo]);

  const prev = () => goTo((current - 1 + stickers.length) % stickers.length);
  const next = () => goTo((current + 1) % stickers.length);

  return (
    <section className="px-4 md:px-8 pt-16 md:pt-24 pb-8 md:pb-14">
      <div className="max-w-5xl mx-auto">
        {/* Headlines */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-2 sm:mb-4 leading-tight">
            {h1}
          </h1>
          <h2 className="text-xs sm:text-base md:text-lg text-muted-foreground px-2 max-w-2xl mx-auto">
            {sub}
          </h2>
        </div>

        {/* Before/After — photo fixed, sticker rotates */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 px-4">
            {/* Photo (fixed) */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg">
                <img
                  src={PHOTO}
                  alt="Исходное фото"
                  loading="eager"
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Фото</span>
            </div>

            {/* Arrow */}
            <div className="text-2xl sm:text-3xl text-primary shrink-0">→</div>

            {/* Sticker (rotating) */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
              <div className="relative aspect-square w-full flex items-center justify-center">
                <img
                  src={stickers[current].src}
                  alt={`Стикер — ${stickers[current].style}`}
                  className={`w-full h-full object-contain drop-shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground h-4 transition-opacity duration-200">
                {stickers[current].style}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Предыдущий стиль"
            >
              ‹
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {stickers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-4"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Стиль ${stickers[i].style}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Следующий стиль"
            >
              ›
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
