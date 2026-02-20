import { EmotionPackCarousel } from "@/components/landing/EmotionPackCarousel";
import { FixedPackCarousel } from "@/components/landing/FixedPackCarousel";

export function ClusterHero({
  h1,
  subtitle,
  heroPackUrls,
}: {
  h1: string;
  subtitle: string;
  /** Пак стиля для Hero (pack/style/{preset_id}/1..9). Если задан — показываем его вместо контент-паков. */
  heroPackUrls?: string[] | null;
}) {
  const showFixedPack = Array.isArray(heroPackUrls) && heroPackUrls.length > 0;

  return (
    <section className="px-4 md:px-8 pt-16 md:pt-24 pb-8 md:pb-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-2 sm:mb-4 leading-tight">
            {h1}
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground px-2 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {showFixedPack ? <FixedPackCarousel imageUrls={heroPackUrls} /> : <EmotionPackCarousel />}
      </div>
    </section>
  );
}
