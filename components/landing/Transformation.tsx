import { Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// First slide uses public URL for preload (LCP optimization).
const examples = [
  { src: "/images/test0.webp", alt: "Пример 1" },
  { src: "/images/test1.webp", alt: "Пример 2" },
];

export function Transformation() {
  return (
    <section className="px-4 md:px-8 pt-16 md:pt-20 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-10 md:mb-12">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-2 sm:mb-4">
            Сделать стикер в ТГ из фото онлайн
          </h1>
          <h2 className="text-xs sm:text-base md:text-lg text-muted-foreground px-2">
            ИИ поможет превратить фото в стильный стикер для Telegram, сохраняя эмоции и черты лица
          </h2>
        </div>

        <Carousel className="w-full max-w-3xl mx-auto" opts={{ loop: true }}>
          <div className="flex items-center gap-2 md:gap-4">
            <CarouselPrevious className="!static !translate-x-0 !translate-y-0 shrink-0" />
            <CarouselContent className="flex-1">
              {examples.map((example, index) => {
                const isFirstSlide = index === 0;
                return (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-full max-w-3xl overflow-hidden rounded-xl md:rounded-2xl">
                        <img
                          src={example.src}
                          alt={example.alt}
                          loading={isFirstSlide ? "eager" : "lazy"}
                          decoding={isFirstSlide ? "sync" : "async"}
                          fetchPriority={isFirstSlide ? "high" : "low"}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNext className="!static !translate-x-0 !translate-y-0 shrink-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}