import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { StyleGallery } from "@/components/landing/StyleGallery";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { Reviews } from "@/components/landing/Reviews";
import { TelegramButton } from "@/components/landing/TelegramButton";
import heroBg from "@assets/generated_images/dark_navy_seamless_pattern_with_doodle_icons.webp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Content */}
      <main className="relative z-10 pb-28">
        <Hero />
        <SocialProof />
        <Reviews />
        <StyleGallery />
        <HowItWorks />
        <Features />
        <FAQ />
      </main>

      {/* Sticky CTA (mobile) */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-md">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <TelegramButton
            size="lg"
            className="shadow-2xl w-full sm:w-auto"
            text="Сделать стикер в Telegram"
          />
          <span className="text-[10px] sm:text-xs text-muted-foreground text-center">
            Без дизайнера · Без регистрации · Готово за 1 минуту
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground/60 text-center">
            🔒 Не храним ваши фото
          </span>
        </div>
      </div>
    </div>
  );
}
