import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Первые сегменты путей, для которых есть страницы (app/...) */
const KNOWN_PATH_PREFIXES = [
  "",
  "style",
  "bot",
  "telegram",
  "android",
  "animirovannye",
  "iphone",
  "s-nadpisyu",
  "besplatno",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Статика и служебные пути — не трогаем
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  if (KNOWN_PATH_PREFIXES.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Неизвестный путь (например /стикер-из-фото из Директа) — редирект на главную с сохранением UTM/yclid
  const url = new URL(request.url);
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/).*)",
  ],
};
