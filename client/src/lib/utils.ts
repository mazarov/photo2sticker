import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Builds Telegram bot deep link with UTM params from current URL.
 * Format: {source}_{medium}_{campaign}_{content} (max 64 chars, A-Za-z0-9_- only)
 * Falls back to "web" if no UTM params present.
 */
export function buildTelegramStartLink(): string {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") || "";
  const medium = params.get("utm_medium") || "";
  const campaign = params.get("utm_campaign") || "";
  const content = params.get("utm_content") || "";

  let startPayload = "web";
  if (source) {
    const parts = [source, medium, campaign, content].filter(Boolean);
    startPayload = parts
      .join("_")
      .replace(/[^A-Za-z0-9_\-]/g, "")
      .slice(0, 64);
  }

  return `https://t.me/Photo_2_StickerBot?start=${startPayload}`;
}
