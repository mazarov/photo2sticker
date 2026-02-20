export type StyleItem = { name: string; emoji: string; image: string; href?: string };

export function StyleGallery({
  sectionTitle = "Выбери свой стиль",
  sectionSubtitle = "ИИ сохраняет твои черты — цвет глаз, родинки, причёску — и добавляет стиль. Узнаваемо ты в любом стиле.",
  footerText = "+ свой стиль: просто опиши текстом в боте",
  items = [],
}: {
  sectionTitle?: string;
  sectionSubtitle?: string;
  footerText?: string;
  items?: StyleItem[];
} = {}) {
  if (items.length === 0) return null;

  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-2 sm:mb-3">
          {sectionTitle}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-1 sm:mb-2">
          {sectionSubtitle}
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/70 text-center mb-6 sm:mb-10">
          Из одного фото — пак в любом стиле. От 45₽ за пак из 9 стикеров
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.map((style, index) => {
            const content = (
              <>
                <div className="aspect-square w-full rounded-lg flex items-center justify-center overflow-visible">
                  {style.image ? (
                    <img
                      src={style.image}
                      alt={`${style.name} стикер из фото`}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-muted-foreground text-xs">Нет примера</span>
                  )}
                </div>
                <div className="mt-2.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/40 text-[9px] sm:text-[11px] md:text-xs font-bold text-white whitespace-nowrap">
                  {style.emoji} {style.name}
                </div>
              </>
            );
            const key = `${style.name}-${index}`;
            if (style.href) {
              return (
                <a
                  key={key}
                  href={style.href}
                  className="group flex flex-col items-center hover:opacity-90 transition-opacity"
                >
                  {content}
                </a>
              );
            }
            return (
              <div key={key} className="group flex flex-col items-center">
                {content}
              </div>
            );
          })}
        </div>

        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6">
          {footerText}
        </p>
      </div>
    </section>
  );
}
