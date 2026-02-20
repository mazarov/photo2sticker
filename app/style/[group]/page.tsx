import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getStyleGroupBySlug,
  getAllStyleGroupSlugs,
  type StyleGroup,
} from "@/lib/seo/style-groups";
import { StyleHero } from "@/components/landing/StyleHero";
import { StyleGallery } from "@/components/landing/StyleGallery";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PainBlock } from "@/components/landing/PainBlock";
import { HopeBlock } from "@/components/landing/HopeBlock";
import { FAQ } from "@/components/landing/FAQ";
import { FaqSchema } from "@/components/landing/FaqSchema";
import { BreadcrumbSchema } from "@/components/landing/BreadcrumbSchema";
import { RelatedLinks } from "@/components/landing/RelatedLinks";
import { Reviews } from "@/components/landing/Reviews";
import { FixedCTA } from "@/components/landing/FixedCTA";

import { withSocialMeta } from "@/lib/seo/metadata";
import { getHeroPresetForPath, packStylePreviewUrl } from "@/lib/landing-hero-preset";

const BASE = "https://photo2sticker.ru";

type Props = { params: Promise<{ group: string }> };

export async function generateStaticParams() {
  return getAllStyleGroupSlugs().map((group) => ({ group }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group: slug } = await params;
  const styleGroup = getStyleGroupBySlug(slug);
  if (!styleGroup) return { title: "Не найдено" };
  return withSocialMeta({
    title: styleGroup.title,
    description: styleGroup.metaDescription,
    url: `${BASE}/style/${slug}`,
  });
}

function StyleGroupPageContent({
  group,
  groupSlug,
  heroPackUrls,
}: {
  group: StyleGroup;
  groupSlug: string;
  heroPackUrls?: string[];
}) {
  const breadcrumbItems = [
    { name: "Главная", url: `${BASE}/` },
    { name: "Стили", url: `${BASE}/style/` },
    { name: group.h1, url: `${BASE}/style/${groupSlug}` },
  ];
  const relatedLinks = [
    ...group.relatedClusterLinks,
    ...group.relatedStyles.map((slug) => {
      const g = getStyleGroupBySlug(slug);
      return { href: `/style/${slug}`, label: g?.h1 ?? slug };
    }),
  ];

  const galleryItems = group.substyles.map((s) => ({
    name: s.nameRu,
    emoji: s.emoji,
    image: packStylePreviewUrl(s.presetId) ?? s.image,
    href: `/style/${group.slug}/${s.slug}`,
  }));

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative" data-style-group={groupSlug}>
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
        <BreadcrumbSchema items={breadcrumbItems} />
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-2 pb-2">
          <Link href="/style" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Все стили
          </Link>
        </div>
        <StyleHero
          h1={group.h1}
          subtitle={group.heroSubtitle}
          stickerItems={group.substyles.map((s) => ({ src: packStylePreviewUrl(s.presetId) ?? s.image, label: s.nameRu }))}
          heroPackUrls={heroPackUrls}
        />

        {/* Тексты Pain/Hope — только из SEO-конфига группы (style-groups.ts) */}
        <PainBlock
          title={group.painTitle}
          text={group.painText}
        />
        <HopeBlock
          title={group.hopeTitle}
          text={group.hopeText}
          points={group.hopePoints}
        />

        <StyleGallery
          sectionTitle="Подстили"
          sectionSubtitle={`Выбери подстиль — каждый ведёт на отдельную страницу с примерами. В этой группе: ${group.substyles.map((s) => s.nameRu).join(", ")}.`}
          footerText="Первый пак стикеров бесплатно."
          items={galleryItems}
        />

        <HowItWorks
          sectionTitle={group.howItWorksTitle}
          steps={group.howItWorksSteps}
        />

        <Reviews reviews={group.reviews} />

        <FaqSchema questions={group.faq} />
        <FAQ questions={group.faq} />
        <RelatedLinks links={relatedLinks} />
      </main>

      <FixedCTA pageSlug={group.ctaSlug} text={group.ctaButtonText} />
    </div>
  );
}

export default async function StyleGroupPage({ params }: Props) {
  const { group: slug } = await params;
  const styleGroup = getStyleGroupBySlug(slug);
  if (!styleGroup) notFound();
  const heroPreset = await getHeroPresetForPath(`/style/${slug}`);
  return (
    <StyleGroupPageContent
      group={styleGroup}
      groupSlug={slug}
      heroPackUrls={heroPreset?.image_urls}
    />
  );
}
