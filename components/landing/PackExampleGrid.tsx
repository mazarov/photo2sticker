import {
  StickerImageWithFallback,
  StickerFallbackPlaceholder,
} from "@/components/landing/StickerImageWithFallback";

/**
 * Блок «Примеры» на странице подстиля (третий уровень): 9 стикеров в данном стиле из примера пака (pack/style/{preset_id}/1..9).
 */
export function PackExampleGrid({
  sectionTitle,
  sectionSubtitle,
  footerText,
  imageUrls,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  footerText: string;
  imageUrls: string[];
}) {
  const urls = imageUrls.slice(0, 9);

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
          {urls.map((src, index) => (
            <div
              key={index}
              className="aspect-square w-full rounded-lg flex items-center justify-center overflow-hidden bg-white/5"
            >
              {src ? (
                <StickerImageWithFallback
                  src={src}
                  alt={`Стикер ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <StickerFallbackPlaceholder className="w-full h-full min-h-0" />
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6">
          {footerText}
        </p>
      </div>
    </section>
  );
}
