import { Transformation } from "@/components/landing/Transformation";
import { Steps } from "@/components/landing/Steps";
import { TelegramButton } from "@/components/landing/TelegramButton";
import heroBg from "@assets/generated_images/dark_navy_seamless_pattern_with_doodle_icons.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
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

      <main className="relative z-10 min-h-screen flex flex-col justify-center pb-28">
        <Transformation />
        <Steps />
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex flex-col items-center gap-2">
          <TelegramButton
            size="lg"
            className="shadow-2xl"
            text="Сделать стикер в Telegram"
          />
          <span className="text-xs text-muted-foreground">
            Бесплатно · Без регистрации · Готово за 1 минуту
          </span>
        </div>
      </div>
    </div>
  );
}