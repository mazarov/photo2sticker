import { motion } from "framer-motion";
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
    <section className="py-12 md:py-16 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 rounded-full" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center z-10"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.bgClass} shadow-lg ${step.shadowClass} flex items-center justify-center mb-4 rotate-3 hover:rotate-0 transition-transform duration-300`}>
                {step.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}