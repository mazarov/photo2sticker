import React from "react";

export const BOT_TG_URL = "https://t.me/Photo_2_StickerBot";
export const BOT_USERNAME = "@Photo_2_StickerBot";

/**
 * Рендерит текст, подставляя ссылку на бота вместо @Photo_2_StickerBot.
 */
export function textWithBotLink(text: string): React.ReactNode {
  const parts = text.split(BOT_USERNAME);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <a
              href={BOT_TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              {BOT_USERNAME}
            </a>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}
