import { useMemo, useState, useEffect, useCallback } from "react";

const UTM_VARIANTS: {
  match: string[];
  h1: string;
  sub: string;
}[] = [
  {
    match: ["free", "online"],
    h1: "Бесплатный пак стикеров из фото — за 30 секунд",
    sub: "Без регистрации, без оплаты. Узнаваемое сходство — черты сохраняются. Просто пришли фото боту.",
  },
  {
    match: ["bot"],
    h1: "Telegram бот: фото → пак стикеров за 30 секунд",
    sub: "Выбери стиль и эмоции. ИИ сохранит твои черты. От 45₽ за пак из 9 стикеров.",
  },
  {
    match: ["ai", "neural"],
    h1: "ИИ превращает фото в пак стикеров",
    sub: "Сохраняем твои черты — цвет глаз, родинки. Выбери стиль и эмоции. Готовый пак за 30 сек.",
  },
  {
    match: ["telegram", "tg"],
    h1: "Пак стикеров для Telegram из твоих фото",
    sub: "Пришли фото — получи пак с разными эмоциями. Узнаваемо ты. За 30 сек. От 45₽ за пак из 9 стикеров.",
  },
];

const DEFAULT_H1 = "Превращаем фото в пак стикеров для Telegram";
const DEFAULT_SUB =
  "Сохраняем цвет глаз, родинки, причёску — в паке узнаваемо ты. Выбери стиль и эмоции: пак за 30 секунд, отправляй друзьям прикольные стикеры. От 45₽ за пак из 9 стикеров.";

const PHOTO = "/images/examples/photo-1.webp";

// Путь к картинкам: /images/carousel/{номер_пресета}/{номер_стикера}.png
// Пресет = sort_order пака (1–8). Если у пресета нет папки — fallback на пресет 1.
const PRESETS_WITH_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8]; // пресеты с примерами (1–8: все паки эмоций)

function getCarouselImagesForPack(sortOrder: number): string[] {
  const preset = PRESETS_WITH_IMAGES.includes(sortOrder) ? sortOrder : 1;
  return Array.from({ length: 9 }, (_, i) => `/images/carousel/${preset}/${i + 1}.png`);
}

// Паки эмоций из БД (pack_content_sets), сортировка по sort_order ascending.
const PACKS: { id: string; name_ru: string; labels: string[]; sort_order: number }[] = [
  { id: "humor", name_ru: "С юмором", sort_order: 1, labels: ["Опять ты", "Ну привет", "Ну ты даёшь", "Выручай", "Кранты", "Серьёзно?", "Ну давай", "Ок ок", "Ладно"] },
  { id: "everyday", name_ru: "Быт и уют", sort_order: 2, labels: ["Спим?", "Где еда?", "Вырубайся", "Устал", "Диван", "Мимими", "Обнимашки", "Кофе?", "Тихий час"] },
  { id: "reactions", name_ru: "На каждый день", sort_order: 3, labels: ["Доброе утро", "Скучаю", "Устал", "Голоден", "На работе", "Спокойной ночи", "Поехали", "Ок", "Привет"] },
  { id: "support", name_ru: "Поддержка", sort_order: 4, labels: ["Мой герой", "Вместе справимся", "Горжусь", "Ты сможешь", "Рядом", "Верим в тебя", "Держись", "Красавчик", "Сила"] },
  { id: "holiday", name_ru: "Праздник", sort_order: 5, labels: ["С днём рождения", "С 14 февраля", "С годовщиной", "Поздравляю", "За нас", "Любимой", "Любимому", "Праздник", "Ура"] },
  { id: "sass", name_ru: "Сарказм", sort_order: 6, labels: ["Ага конечно", "Ну да", "Всё ясно", "Очень верю", "Да-да", "Конечно", "Как же", "Непременно", "Ага"] },
  { id: "sweet", name_ru: "Ласка и комплименты", sort_order: 7, labels: ["Красотка", "Милый", "Таю", "Обожаю", "Котик", "Солнышко", "Сладкий", "Любимый", "Прелесть"] },
  { id: "romance", name_ru: "Романтика", sort_order: 8, labels: ["Моя", "Люблю", "Спим?", "Чмок", "Вместе", "Красотка", "Мой герой", "Подарок", "Навсегда"] },
].sort((a, b) => a.sort_order - b.sort_order);

const DEFAULT_PACK_ID = "humor"; // С юмором

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
  const [currentPackId, setCurrentPackId] = useState(DEFAULT_PACK_ID);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const currentPack = PACKS.find((p) => p.id === currentPackId) ?? PACKS.find((p) => p.id === DEFAULT_PACK_ID) ?? PACKS[0];
  const carouselImages = getCarouselImagesForPack(currentPack.sort_order);
  const stickers = carouselImages.map((src, i) => ({ src, label: currentPack.labels[i] ?? "" }));

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

  const selectPack = useCallback((packId: string) => {
    setCurrentPackId(packId);
    setCurrent(0);
  }, []);

  // Auto-rotate stickers
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % stickers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [current, goTo, stickers.length]);

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

        {/* Переключатель паков эмоций */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
          {PACKS.map((pack) => (
            <button
              key={pack.id}
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
            </div>

            {/* Arrow */}
            <div className="text-2xl sm:text-3xl text-primary shrink-0">→</div>

            {/* Sticker (rotating) */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
              <div className="relative aspect-square w-full flex items-center justify-center">
                <img
                  src={stickers[current].src}
                  alt={`Стикер — ${stickers[current].label}`}
                  className={`w-full h-full object-contain drop-shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
                />
              </div>
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
                  aria-label={`Стикер ${stickers[i].label}`}
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
