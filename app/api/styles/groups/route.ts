import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * GET /api/styles/groups — карточки блока «Стили» (главная и кластерные).
 * Превью = первый стикер из пака стиля: pack/style/{first_preset_id}/1.webp (без stickers.is_example).
 */

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const examplesBucket = process.env.SUPABASE_STORAGE_BUCKET_EXAMPLES || "stickers-examples";

function packStylePreviewUrl(presetId: string): string | null {
  if (!supabaseUrl || !examplesBucket) return null;
  const path = `pack/style/${presetId}/1.webp`;
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${examplesBucket}/${path}`;
}

/** group_id → slug для URL /style/[group]/[substyle]. */
const GROUP_ID_TO_SLUG: Record<string, string> = {
  anime: "anime",
  meme: "memy",
  cute: "milye",
  love: "lyubov",
  cartoon: "multfilm",
  game: "igry",
  drawn: "risunok",
  manhwa: "manhwa",
  tv: "serialy",
  russian: "russkiy",
  photo: "photo",
};

export type StyleGroupItem = {
  id: string;
  name_ru: string;
  emoji: string;
  sort_order: number;
  /** Slug группы для ссылки /style/[slug] (без подстиля). */
  slug: string;
  preview_image: string | null;
};

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json([]);
  }
  try {
    const { data: groups, error: groupsError } = await supabase
      .from("style_groups")
      .select("id, name_ru, emoji, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (groupsError || !groups?.length) {
      if (groupsError) console.warn("[api/styles/groups]", groupsError.message);
      return NextResponse.json([]);
    }

    const { data: presets } = await supabase
      .from("style_presets_v2")
      .select("id, group_id")
      .eq("is_active", true)
      .eq("landing", true)
      .order("group_id", { ascending: true })
      .order("sort_order", { ascending: true });

    const firstPresetByGroup = new Map<string, string>();
    for (const p of presets ?? []) {
      const gid = p.group_id as string;
      if (!firstPresetByGroup.has(gid)) firstPresetByGroup.set(gid, p.id as string);
    }

    const items: StyleGroupItem[] = groups
      .filter((g) => firstPresetByGroup.has(g.id as string))
      .map((g, index) => {
        const groupId = g.id as string;
        const groupSlug = GROUP_ID_TO_SLUG[groupId] ?? groupId;
        const firstPresetId = firstPresetByGroup.get(groupId)!;
        const previewUrl = packStylePreviewUrl(firstPresetId);
        return {
          id: groupId,
          name_ru: (g.name_ru as string) ?? "",
          emoji: (g.emoji as string) ?? "✨",
          sort_order: index,
          slug: groupSlug,
          preview_image: previewUrl ?? null,
        };
      });

    return NextResponse.json(items);
  } catch (e) {
    console.warn("[api/styles/groups]", e);
    return NextResponse.json([]);
  }
}
