import type { Metadata } from "next";
import { getClusterBySlug, getAllClusterSlugs, MAIN_PAGE_CLUSTER_SLUG } from "@/lib/seo/cluster-pages";
import { withSocialMeta } from "@/lib/seo/metadata";
import { RelatedLinks } from "@/components/landing/RelatedLinks";
import { Hero } from "@/components/landing/Hero";
import { PainBlock } from "@/components/landing/PainBlock";
import { HopeBlock } from "@/components/landing/HopeBlock";
import { SocialProof } from "@/components/landing/SocialProof";
import { Reviews } from "@/components/landing/Reviews";
import { StyleGalleryFromApi } from "@/components/landing/StyleGalleryFromApi";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { PriceBlock } from "@/components/landing/PriceBlock";
import { FAQ } from "@/components/landing/FAQ";
import { FaqSchema } from "@/components/landing/FaqSchema";
import { FixedCTA } from "@/components/landing/FixedCTA";

const mainCluster = getClusterBySlug(MAIN_PAGE_CLUSTER_SLUG)!;

const mainClusterLinks = getAllClusterSlugs()
  .filter((slug) => slug !== MAIN_PAGE_CLUSTER_SLUG)
  .map((slug) => {
    const c = getClusterBySlug(slug)!;
    return { href: `/${slug}`, label: c.h1 };
  });

export const metadata: Metadata = withSocialMeta({
  title: mainCluster.title,
  description: mainCluster.metaDescription,
  url: "https://photo2sticker.ru/",
});

export default async function Home() {
  // Главная всегда показывает контент-паки из pack/content/ (humor, everyday и др.) через EmotionPackCarousel, не пак из style_presets_v2.
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Background: gradient (hero image not in public) */}
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
        <Hero
          h1={mainCluster.h1}
          subtitle={mainCluster.heroSubtitle}
        />
        <PainBlock title={mainCluster.painTitle} text={mainCluster.painText} />
        <HopeBlock
          title={mainCluster.hopeTitle}
          text={mainCluster.hopeText}
          points={mainCluster.hopePoints}
        />
        <SocialProof />
        <Reviews reviews={mainCluster.reviews} />
        <HowItWorks
          sectionTitle={mainCluster.howItWorksTitle}
          steps={mainCluster.howItWorksSteps}
        />
        <StyleGalleryFromApi />
        <Features />
        <PriceBlock />
        <FaqSchema questions={mainCluster.faq} />
        <FAQ questions={mainCluster.faq} />
        <RelatedLinks links={mainClusterLinks} />
      </main>

      <FixedCTA pageSlug={mainCluster.ctaSlug} text={mainCluster.ctaButtonText} />
    </div>
  );
}
