import Link from "next/link";
import { getAllClusterSlugs, getClusterBySlug, MAIN_PAGE_CLUSTER_SLUG } from "@/lib/seo/cluster-pages";
import { getAllStyleGroupSlugs, getStyleGroupBySlug } from "@/lib/seo/style-groups";

/**
 * Футер: группы стилей (ТЗ §6.6) + перелинковка главная и кластеры.
 */
export function Footer() {
  const styleSlugs = getAllStyleGroupSlugs();
  const clusterSlugs = getAllClusterSlugs().filter((s) => s !== MAIN_PAGE_CLUSTER_SLUG);

  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <p className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
          Стили стикеров
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
          <Link
            href="/style"
            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Все стили
          </Link>
          {styleSlugs.map((slug) => {
            const group = getStyleGroupBySlug(slug);
            return (
              <Link
                key={slug}
                href={`/style/${slug}`}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {group?.h1 ?? slug}
              </Link>
            );
          })}
        </nav>
        <p className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
          По темам
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
            Главная
          </Link>
          {clusterSlugs.map((slug) => {
            const cluster = getClusterBySlug(slug);
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {cluster?.h1 ?? slug}
              </Link>
            );
          })}
        </nav>
        <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-4">
          © Photo2Sticker · Стикеры из фото для Telegram
        </p>
      </div>
    </footer>
  );
}
