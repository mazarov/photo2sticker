import type { Request, Response } from "express";
import { getSupabase } from "../supabase.js";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const examplesBucket = process.env.SUPABASE_STORAGE_BUCKET_EXAMPLES || "stickers-examples";

function packStylePreviewUrl(presetId: string): string | null {
  if (!supabaseUrl || !examplesBucket) return null;
  const path = `pack/style/${presetId}/1.webp`;
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${examplesBucket}/${path}`;
}

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

export async function getStylesGroups(_req: Request, res: Response): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) {
    res.json([]);
    return;
  }
  try {
    const { data: groups, error: groupsError } = await supabase
      .from("style_groups")
      .select("id, name_ru, emoji, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (groupsError || !groups?.length) {
      if (groupsError) console.warn("[api/styles/groups]", groupsError.message);
      res.json([]);
      return;
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

    const items = groups
      .filter((g: { id: string }) => firstPresetByGroup.has(g.id))
      .map((g: { id: string; name_ru: string | null; emoji: string | null }, index: number) => {
        const groupId = g.id;
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

    res.json(items);
  } catch (e) {
    console.warn("[api/styles/groups]", e);
    res.json([]);
  }
}
