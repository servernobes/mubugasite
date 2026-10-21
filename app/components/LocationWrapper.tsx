import { cacheTag } from "next/cache";
import { createCachedClient } from "@/lib/supabase/cached";
import Location from "./Location";

export default async function LocationWrapper() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: branches } = await supabase
    .from("branches")
    .select("id, name, type, address, postal, phone1, phone2, email, hours, map_embed_src")
    .eq("confirmed", true)
    .order("name");

  return <Location branches={branches ?? []} />;
}
