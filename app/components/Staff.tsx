import { cacheTag } from "next/cache";
import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

export default async function Staff() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: staff } = await supabase
    .from("staff_members")
    .select("id, name, role, bio, photo_url")
    .eq("published", true)
    .order("sort_order");

  const list = staff ?? [];

  return (
    <section className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label">Our People</span>
          <h2 className="section-title">Meet the Team</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
            Mubuga SACCO is served by a dedicated team committed to helping members achieve their financial goals.
          </p>
        </div>
        {list.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">
            Staff profiles will be published here once confirmed by management.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map((s) => (
              <div key={s.id} className="bg-surface rounded-2xl border border-line overflow-hidden hover:border-brand-ink/30 hover:shadow-md transition-all">
                {/* Portrait photo — rectangular, full card width */}
                <div className="relative aspect-[4/5] bg-tint-strong flex items-center justify-center">
                  {s.photo_url ? (
                    <Image src={s.photo_url} alt={s.name} fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top" />
                  ) : (
                    <svg className="w-20 h-20 text-brand-ink/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-brand-ink text-base mb-0.5">{s.name}</h3>
                  <p className="text-accent-ink text-xs font-semibold">{s.role}</p>
                  {s.bio && <p className="text-gray-500 text-xs leading-relaxed mt-3">{s.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
