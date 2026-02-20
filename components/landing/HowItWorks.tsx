import { Upload, Palette, Sparkles, PackagePlus } from "lucide-react";
import { textWithBotLink } from "@/lib/bot-link";

const NUMS = ["①", "②", "③", "④"];
const defaultSteps = [
  { num: "①", icon: <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, title: "Пришли фото", description: "С телефона или галереи", bgClass: "bg-blue-500", shadowClass: "shadow-blue-500/20", screen: "/images/screens/step-1.png" },
  { num: "②", icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, title: "Выбери стиль и эмоции", description: "Аниме, фото-реалистичный, мультик и др. ИИ сохраняет твои черты.", bgClass: "bg-purple-500", shadowClass: "shadow-purple-500/20", screen: "/images/screens/step-2.png" },
  { num: "③", icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, title: "Готово!", description: "Получаешь пак стикеров с разными эмоциями и подписями; можно добавить текст и обводку", bgClass: "bg-pink-500", shadowClass: "shadow-pink-500/20", screen: "/images/screens/step-3.png" },
  { num: "④", icon: <PackagePlus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, title: "Пак в Telegram", description: "Пак сразу в твоём стикерпаке в Telegram", bgClass: "bg-emerald-500", shadowClass: "shadow-emerald-500/20", screen: "/images/screens/step-4.png" },
];

type StepInput = { title: string; description: string };

function buildSteps(custom?: StepInput[]) {
  return defaultSteps.map((d, i) => {
    const c = custom?.[i];
    return {
      ...d,
      title: c?.title ?? d.title,
      description: c?.description ?? d.description,
    };
  });
}

const DEFAULT_TITLE = "4 шага — и пак стикеров у тебя";

export function HowItWorks({
  sectionTitle = DEFAULT_TITLE,
  steps: stepsInput,
}: { sectionTitle?: string; steps?: StepInput[] } = {}) {
  const built = buildSteps(stepsInput);
  const steps = stepsInput?.length === 3 ? built.slice(0, 3) : built;
  const gridCols = steps.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4";

  return (
    <section className="py-6 md:py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-4 sm:mb-6">
          {sectionTitle}
        </h2>

        <div className={`grid ${gridCols} gap-4 sm:gap-6 relative`}>
          {/* Connecting line (desktop) */}
          <div className="hidden sm:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 rounded-full" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center relative z-10"
            >
              {/* Screenshot */}
              <div className="w-full max-w-[200px] rounded-xl border border-white/10 overflow-hidden shadow-lg">
                {step.screen ? (
                  <img
                    src={step.screen}
                    alt={`Скриншот: ${step.title}`}
                    width={591}
                    height={1280}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[9/16] flex items-center justify-center bg-card/50 text-muted-foreground/50 text-xs">
                    <div className="text-center p-3">
                      <div className="text-lg mb-1">📱</div>
                      Скриншот
                    </div>
                  </div>
                )}
              </div>

              {/* Icon under screenshot */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${step.bgClass} shadow-lg ${step.shadowClass} flex items-center justify-center -mt-5 sm:-mt-6 mb-2 sm:mb-3 relative z-10`}
              >
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">
                {step.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground max-w-[200px]">
                {textWithBotLink(step.description)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
