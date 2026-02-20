"use client";

import { TelegramButton } from "@/components/landing/TelegramButton";

const SUBTITLE = "Без дизайнера · Без регистрации · Пак за 30 секунд";
const PRIVACY = "🔒 Не храним ваши фото";

type FixedCTAProps = {
  pageSlug?: string;
  text: string;
  className?: string;
};

/** Единый фиксированный блок CTA внизу экрана на всех страницах лендинга. */
export function FixedCTA({ pageSlug, text, className }: FixedCTAProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-md">
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <TelegramButton
          pageSlug={pageSlug}
          size="lg"
          className={className ?? "shadow-2xl w-full sm:w-auto"}
          text={text}
        />
        <span className="text-[10px] sm:text-xs text-muted-foreground text-center">
          {SUBTITLE}
        </span>
        <span className="text-[9px] sm:text-[10px] text-muted-foreground/60 text-center">
          {PRIVACY}
        </span>
      </div>
    </div>
  );
}
