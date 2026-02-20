import { Gift } from "lucide-react";

export function PriceBlock() {
  return (
    <section className="py-6 md:py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 p-5 sm:p-6 text-center">
          <div className="flex justify-center mb-2">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">
            От 45₽ за пак из 9 стикеров
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Без подписок. Пак готов за 30 секунд.
          </p>
        </div>
      </div>
    </section>
  );
}
