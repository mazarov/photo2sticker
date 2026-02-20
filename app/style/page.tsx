import type { Metadata } from "next";
import Link from "next/link";
import { withSocialMeta } from "@/lib/seo/metadata";
import { StyleHero } from "@/components/landing/StyleHero";
import { getHeroPresetForPath } from "@/lib/landing-hero-preset";
import { getStyleGroupsForCatalog } from "@/lib/landing-style-catalog-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = withSocialMeta({
  title: "Стили стикеров из фото | Photo2Sticker",
  description: "Каталог стилей стикеров: аниме, мемы, милые, 3D, любовь, котики, мультфильм, игры, манхва, рисунок, сериалы, русский стиль. Создай стикеры за 30 секунд.",
  url: "https://photo2sticker.ru/style/",
});

export default async function StyleCatalogPage() {
  const groups = await getStyleGroupsForCatalog();
  const stickerItems = groups.map((g) => ({
    src: g.preview_image ?? "",
    label: g.name_ru,
  }));
  const heroPreset = await getHeroPresetForPath("/style");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)`,
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      <main className="relative z-10 pb-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-2 pb-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← На главную
          </Link>
        </div>
        <StyleHero
          h1="Стили стикеров"
          subtitle="Выбери стиль — ИИ превратит фото в стикеры для Telegram. Первый пак бесплатно."
          stickerItems={stickerItems}
          heroPackUrls={heroPreset?.image_urls}
        />
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {groups.map((group) => {
              const n = group.substyles_count;
              const suffix = n === 1 ? "ь" : "ей";
              return (
                <li key={group.slug}>
                  <Link
                    href={`/style/${group.slug}`}
                    className="block rounded-xl md:rounded-2xl bg-card/40 border border-primary/30 p-5 sm:p-6 hover:bg-card/60 hover:border-primary/50 transition-colors"
                  >
                    <h2 className="text-base sm:text-lg font-display font-bold text-white mb-1">
                      {group.name_ru}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {n} подстил{suffix}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
