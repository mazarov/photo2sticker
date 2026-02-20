import { NextRequest, NextResponse } from "next/server";
import { getHeroPresetForPath } from "@/lib/landing-hero-preset";

export const dynamic = "force-dynamic";

/**
 * GET /api/landing/hero-preset?path=/style/anime
 * Возвращает пресет и 9 URL пака для Hero по пути страницы (landing_hero_paths).
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const result = await getHeroPresetForPath(path);
  if (!result) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(result);
}
