import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const storageBucket = process.env.SUPABASE_STORAGE_BUCKET || "stickers";

function publicUrlForPath(path: string | null): string | null {
  if (!path || !supabaseUrl) return null;
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${storageBucket}/${path}`;
}

export type StyleExampleItem = {
  id: string;
  public_url: string;
  style_preset_id: string;
};

/** Map API groupId to preset prefix (group_id in style_presets_v2). */
const GROUP_TO_PREFIX: Record<string, string> = {
  anime: "anime",
  meme: "meme",
  memy: "meme",
  cute: "cute",
  milye: "cute",
  kotiki: "cute",
  love: "love",
  lyubov: "love",
  cartoon: "cartoon",
  multfilm: "cartoon",
  "3d": "cartoon",
  game: "game",
  igry: "game",
  drawn: "drawn",
  risunok: "drawn",
  manhwa: "manhwa",
  tv: "tv",
  serialy: "tv",
  russian: "russian",
  russkiy: "russian",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;
  const limit = Math.min(
    Math.max(1, Number(new URL(_request.url).searchParams.get("limit")) || 16),
    32
  );

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json([]);
  }

  const groupIdNorm = groupId.toLowerCase();
  const prefix = GROUP_TO_PREFIX[groupIdNorm] ?? groupIdNorm;

  try {
    const { data: presets } = await supabase
      .from("style_presets_v2")
      .select("id")
      .eq("group_id", prefix)
      .eq("is_active", true);

    const presetIds = (presets ?? []).map((p) => p.id);
    if (presetIds.length === 0) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from("stickers")
      .select("id, public_url, result_storage_path, style_preset_id")
      .eq("is_example", true)
      .in("style_preset_id", presetIds)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.warn("[api/styles/examples]", error.message);
      return NextResponse.json([]);
    }

    const items: StyleExampleItem[] = (data ?? [])
      .map((r) => {
        const url = (r.public_url as string) || publicUrlForPath(r.result_storage_path as string);
        return { ...r, public_url: url };
      })
      .filter((r) => r.public_url)
      .map((r) => ({
        id: r.id,
        public_url: r.public_url as string,
        style_preset_id: r.style_preset_id ?? "",
      }));

    return NextResponse.json(items);
  } catch (e) {
    console.warn("[api/styles/examples]", e);
    return NextResponse.json([]);
  }
}
