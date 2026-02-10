import { TelegramButton } from "./TelegramButton";

export function FinalCTA() {
  return (
    <section className="py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white mb-4 sm:mb-6">
          Готов сделать свой первый стикер?
        </h2>

        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <TelegramButton
            size="lg"
            className="w-full sm:w-auto max-w-md"
            text="Открыть бота в Telegram"
          />
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            Первый стикер бесплатно · Готово за 30 секунд
          </span>
        </div>
      </div>
    </section>
  );
}
