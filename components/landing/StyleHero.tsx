import { TelegramButton } from "@/components/landing/TelegramButton";
import { EmotionPackCarousel } from "@/components/landing/EmotionPackCarousel";
import { FixedPackCarousel } from "@/components/landing/FixedPackCarousel";

export type StyleHeroSticker = { src: string; label: string };

type StyleHeroProps = {
  h1: string;
  subtitle: string;
  /** Карусель стилей для галереи ниже (в hero показываем карусель эмоций, как на главной). */
  stickerItems: StyleHeroSticker[];
  /** Если задан — показываем пак этого стиля (pack/style/{preset}/1..9), без пилюль. Резолв по landing_hero_paths. */
  heroPackUrls?: string[];
  ctaSlug?: string;
  ctaText?: string;
};

export function StyleHero({ h1, subtitle, stickerItems, heroPackUrls, ctaSlug, ctaText }: StyleHeroProps) {
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
          {ctaSlug != null && ctaText != null && (
            <div className="flex justify-center mt-4 sm:mt-6">
              <TelegramButton pageSlug={ctaSlug} size="lg" text={ctaText} />
            </div>
          )}
        </div>

        {showFixedPack ? <FixedPackCarousel imageUrls={heroPackUrls} /> : <EmotionPackCarousel />}
      </div>
    </section>
  );
}
