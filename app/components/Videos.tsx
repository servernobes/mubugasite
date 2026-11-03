import { cacheTag } from "next/cache";
import { createCachedClient } from "@/lib/supabase/cached";
import VideoPlayer from "./VideoPlayer";

export default async function Videos() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("id, title, description, video_url, thumbnail_url")
    .eq("published", true)
    .eq("section", "homepage")
    .order("created_at", { ascending: false });   // newest first, as on the Media Centre page

  if (!videos?.length) return null;

  return (
    <section id="videos" className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-label">Watch &amp; Learn</span>
          <h2 className="section-title">Videos from Mubuga SACCO</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
            Watch our latest videos to learn more about our services, products and community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <div key={v.id} className="bg-tint rounded-xl border border-line overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative bg-brand aspect-video w-full overflow-hidden">
                <VideoPlayer url={v.video_url} poster={v.thumbnail_url} title={v.title} />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-ink text-sm leading-snug mb-1">{v.title}</h3>
                {v.description && <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
