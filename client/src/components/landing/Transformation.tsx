import { ArrowRight, Sparkles } from "lucide-react";
import catBefore from "@assets/generated_images/cat_photo.jpg";
import catAfter from "@assets/generated_images/cat_sticker.webp";
import womanBefore from "@assets/generated_images/portrait_of_a_smiling_woman_with_pink_hair.png";
import womanAfter from "@assets/generated_images/telegram_sticker_style_illustration_of_the_same_woman.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const examples = [
  { before: catBefore, after: catAfter },
  { before: womanBefore, after: womanAfter },
];

export function Transformation() {
  return (
    <section className="px-4 md:px-8 pt-16 md:pt-20 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-10 md:mb-12">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-2 sm:mb-4">
            Создавай стикеры из фото для Telegram
          </h1>
          <h2 className="text-xs sm:text-base md:text-lg text-muted-foreground px-2">
            ИИ поможет превратить фото в стильный стикер для Telegram, сохраняя эмоции и черты лица
          </h2>
        </div>

        <Carousel className="w-full max-w-3xl mx-auto" opts={{ loop: true }}>
          <div className="flex items-center gap-2 md:gap-4">
            <CarouselPrevious className="!static !translate-x-0 !translate-y-0 shrink-0" />
            <CarouselContent className="flex-1">
              {examples.map((example, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-12">
                    {/* Before */}
                    <div className="flex flex-col items-center">
                      <div className="aspect-[3/4] w-28 sm:w-40 md:w-56 overflow-hidden rounded-xl md:rounded-2xl">
                        <img
                          src={example.before}
                          alt="Обычное фото"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center justify-center text-primary">
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 mb-1 animate-bounce" />
                      <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 stroke-[3px]" />
                    </div>

                    {/* After */}
                    <div className="flex flex-col items-center">
                      <div className="aspect-[3/4] w-28 sm:w-40 md:w-56 overflow-hidden rounded-xl md:rounded-2xl flex items-center justify-center">
                        <img
                          src={example.after}
                          alt="Стикер"
                          className="w-[90%] h-[90%] object-contain drop-shadow-[0_0_12px_rgba(0,0,0,0.25)]"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="!static !translate-x-0 !translate-y-0 shrink-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}