// Called by the admin panel (mubug-admin) right after it saves site settings,
// so theme colours, contact details etc. show on the site immediately.
// Only signed-in admins can trigger it: the request must carry their Supabase access token.
import { revalidateTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

// site-settings: theme, contact details (TopBar, Footer, ThemeStyle)
// cms: everything else the admin manages (news, products, staff, board, branches, videos …)
const TAGS = ["site-settings", "cms"];

const cors = (request: NextRequest) => ({
  "Access-Control-Allow-Origin": request.headers.get("origin") ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  Vary: "Origin",
});

export function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204, headers: cors(request) });
}

export async function POST(request: NextRequest) {
  const headers = cors(request);
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Missing token" }, { status: 401, headers });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return Response.json({ error: "Not signed in" }, { status: 401, headers });

  const body = await request.json().catch(() => ({}));
  // A known tag refreshes just that group; anything else refreshes all of them
  const tags = typeof body.tag === "string" && TAGS.includes(body.tag) ? [body.tag] : TAGS;

  // expire: 0 → next page load fetches fresh data instead of serving the old copy once more
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: tags }, { headers });
}
