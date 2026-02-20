import { Upload, Wand2, Sticker } from "lucide-react";

export function Steps() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-white" />,
      title: "Шаг 1",
      description: "Загрузи фото\nВведи стиль стикера",
      bgClass: "bg-blue-500",
      shadowClass: "shadow-blue-500/20"
    },
    {
      icon: <Wand2 className="w-8 h-8 text-white" />,
      title: "Шаг 2",
      description: "ИИ создаст стикер\nСохраняет стиль и эмоции",
      bgClass: "bg-purple-500",
      shadowClass: "shadow-purple-500/20"
    },
    {
      icon: <Sticker className="w-8 h-8 text-white" />,
      title: "Шаг 3",
      description: "Получи стикер в Telegram\nГотов к использованию сразу",
      bgClass: "bg-pink-500",
      shadowClass: "shadow-pink-500/20"
    }
  ];

  return (
    <section
      className="py-6 md:py-12 relative overflow-hidden px-4 md:px-8"
      style={{ marginTop: "-80px" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 relative">
          {/* Connecting Line */}
          <div className="absolute top-6 sm:top-8 md:top-12 left-[16%] right-[16%] h-0.5 md:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 rounded-full" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center z-10 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${step.bgClass} shadow-lg ${step.shadowClass} flex items-center justify-center mb-2 sm:mb-4 rotate-3 hover:rotate-0 transition-transform duration-300 will-change-transform`}>
                <div className="scale-50 sm:scale-75 md:scale-100">
                  {step.icon}
                </div>
              </div>
              <h4 className="text-xs sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2">{step.title}</h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground whitespace-pre-line leading-tight">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}