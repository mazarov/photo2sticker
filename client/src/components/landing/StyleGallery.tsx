// Только стили из БД (style_presets_v2, is_active). Порядок по sort_order.
const styles = [
  { name: "Фото реализм", emoji: "📷", image: "/images/examples/sticker-klassicheskiy.webp" },
  { name: "Телеграм", emoji: "✈️", image: "/images/examples/sticker-telegram.webp" },
  { name: "Аниме", emoji: "🎌", image: "/images/examples/sticker-romantik.webp" },
  { name: "Аниме-романс", emoji: "💗", image: "/images/examples/sticker-romantik2.webp" },
  { name: "Чиби", emoji: "🍡", image: "/images/examples/sticker-chibi.webp" },
  { name: "Каваий", emoji: "✨", image: "/images/examples/sticker-kavaii.webp" },
  { name: "Котик", emoji: "🐱", image: "/images/examples/sticker-kotik.webp" },
  { name: "Манхва", emoji: "📖", image: "/images/examples/sticker-sovremennyy.webp" },
];

export function StyleGallery() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-2 sm:mb-3">
          Выбери свой стиль
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-1 sm:mb-2">
          ИИ сохраняет твои черты — цвет глаз, родинки, причёску — и добавляет стиль. Узнаваемо ты в любом стиле.
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/70 text-center mb-6 sm:mb-10">
          Из одного фото — пак в любом стиле. Первый пак бесплатно · Дальше от 45₽ за пак из 9 стикеров
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {styles.map((style, index) => (
            <div
              key={`${style.name}-${index}`}
              className="group flex flex-col items-center"
            >
              {/* Sticker image */}
              <div className="aspect-square w-full">
                <img
                  src={style.image}
                  alt={`Стикер в стиле ${style.name}`}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Style label */}
              <div className="mt-2.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/40 text-[9px] sm:text-[11px] md:text-xs font-bold text-white whitespace-nowrap">
                {style.emoji} {style.name}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6">
          + свой стиль: просто опиши текстом в боте
        </p>
      </div>
    </section>
  );
}
