import Link from "next/link";
import type { ClusterPage } from "@/lib/seo/cluster-pages";
import { ClusterHero } from "@/components/landing/ClusterHero";
import { PainBlock } from "@/components/landing/PainBlock";
import { HopeBlock } from "@/components/landing/HopeBlock";
import { SocialProof } from "@/components/landing/SocialProof";
import { Reviews } from "@/components/landing/Reviews";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { PriceBlock } from "@/components/landing/PriceBlock";
import { FAQ } from "@/components/landing/FAQ";
import { FaqSchema } from "@/components/landing/FaqSchema";
import { RelatedLinks } from "@/components/landing/RelatedLinks";
import { TelegramButton } from "@/components/landing/TelegramButton";

export function ClusterPageContent({
  cluster,
  heroPackUrls,
}: {
  cluster: ClusterPage;
  /** Пак стиля для Hero (pack/style/photo_realistic/1..9 для кластерных путей). */
  heroPackUrls?: string[] | null;
}) {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <main className="relative z-10 pb-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-2 pb-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← На главную
          </Link>
        </div>
        <ClusterHero h1={cluster.h1} subtitle={cluster.heroSubtitle} heroPackUrls={heroPackUrls} />
        <PainBlock title={cluster.painTitle} text={cluster.painText} />
        <HopeBlock
          title={cluster.hopeTitle}
          text={cluster.hopeText}
          points={cluster.hopePoints}
        />
        <SocialProof />
        <Reviews reviews={cluster.reviews} />
        <HowItWorks
          sectionTitle={cluster.howItWorksTitle}
          steps={cluster.howItWorksSteps}
        />
        <Features />
        <PriceBlock />
        <FaqSchema questions={cluster.faq} />
        <FAQ questions={cluster.faq} />
        <RelatedLinks links={cluster.relatedLinks} />
      </main>

      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-md">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <TelegramButton
            pageSlug={cluster.ctaSlug}
            size="lg"
            className="shadow-2xl w-full sm:w-auto"
            text={cluster.ctaButtonText}
          />
          <span className="text-[10px] sm:text-xs text-muted-foreground text-center">
            Без дизайнера · Без регистрации · Пак за 30 секунд
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground/60 text-center">
            🔒 Не храним ваши фото
          </span>
        </div>
      </div>
    </div>
  );
}
