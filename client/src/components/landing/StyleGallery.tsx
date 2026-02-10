const styles = [
  { name: "Классический", emoji: "🎨", image: "/images/examples/sticker-klassicheskiy.webp" },
  { name: "Тёмный", emoji: "🌑", image: "/images/examples/sticker-tyomnyy.webp" },
  { name: "Романтик", emoji: "💕", image: "/images/examples/sticker-romantik.webp" },
  { name: "Чиби", emoji: "🧸", image: "/images/examples/sticker-chibi.webp" },
  { name: "Телеграм", emoji: "✈️", image: "/images/examples/sticker-telegram.webp" },
  { name: "Каваий", emoji: "🌸", image: "/images/examples/sticker-kavaii.webp" },
  { name: "Котик", emoji: "🐱", image: "/images/examples/sticker-kotik.webp" },
  { name: "Нежный", emoji: "🌺", image: "/images/examples/sticker-nezhnyy.webp" },
  { name: "Парочки", emoji: "👫", image: "/images/examples/sticker-parochki.webp" },
  { name: "С сердечками", emoji: "💖", image: "/images/examples/sticker-s-serdechkami.webp" },
  { name: "Американский", emoji: "🇺🇸", image: "/images/examples/sticker-amerikanskiy.webp" },
  { name: "Современный", emoji: "💎", image: "/images/examples/sticker-sovremennyy.webp" },
  { name: "Классика", emoji: "🏛", image: "/images/examples/sticker-klassika.webp" },
  { name: "Романтик", emoji: "💕", image: "/images/examples/sticker-romantik2.webp" },
  { name: "90-е", emoji: "📼", image: "/images/examples/sticker-90e.webp" },
  { name: "Любовь это...", emoji: "👫", image: "/images/examples/sticker-lyubov-eto.webp" },
];

export function StyleGallery() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-2 sm:mb-3">
          Выбери свой стиль
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-1 sm:mb-2">
          ИИ сделает остальное — сохранит черты лица и добавит стиль
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/70 text-center mb-6 sm:mb-10">
          1 кредит = 1 стикер ≈ 15₽ · Первый бесплатно
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
          + свой стиль: просто опиши текстом
        </p>
      </div>
    </section>
  );
}
