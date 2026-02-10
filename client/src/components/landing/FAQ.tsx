import { useState } from "react";
import { ChevronDown, Shield, Zap, Palette, MessageCircle } from "lucide-react";

const questions = [
  {
    q: "Это правда бесплатно?",
    a: "Первый стикер полностью бесплатно. Дальше — от 15₽ за стикер.",
  },
  {
    q: "Сколько времени занимает?",
    a: "~30 секунд от отправки фото до готового стикера.",
  },
  {
    q: "Мои фото сохраняются?",
    a: "Нет. Фото используется только для генерации и не хранится на серверах.",
  },
  {
    q: "Нужна ли регистрация?",
    a: "Нет. Просто откройте бота в Telegram и отправьте фото.",
  },
  {
    q: "Можно ли сделать стикер с котом/собакой?",
    a: "Да! ИИ работает с любыми фото: люди, животные, персонажи.",
  },
  {
    q: "Как добавить стикер в Telegram?",
    a: "Бот автоматически добавляет стикер в ваш персональный стикерпак. Один клик.",
  },
  {
    q: "Стикер получится похожим на меня?",
    a: "Да, ИИ сохраняет черты лица, причёску и характерные особенности.",
  },
];

const trustItems = [
  { icon: <Shield className="w-4 h-4" />, text: "Фото не хранятся на серверах" },
  { icon: <Zap className="w-4 h-4" />, text: "Генерация за 30 секунд" },
  { icon: <Palette className="w-4 h-4" />, text: "10+ стилей на выбор" },
  { icon: <MessageCircle className="w-4 h-4" />, text: "Поддержка в Telegram 24/7" },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl bg-card/40 border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 sm:px-5 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold text-white hover:text-primary transition-colors"
      >
        {q}
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3 sm:px-5 sm:pb-4 text-[11px] sm:text-xs md:text-sm text-muted-foreground">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-6 sm:mb-10">
          Частые вопросы
        </h2>

        <div className="space-y-2 sm:space-y-3">
          {questions.map((item, i) => (
            <AccordionItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Trust block */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground"
            >
              <span className="text-primary shrink-0">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
