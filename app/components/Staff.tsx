import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

export default async function Staff() {
  "use cache";
  const supabase = createCachedClient();
  const { data: staff } = await supabase
    .from("staff_members")
    .select("id, name, role, bio, photo_url")
    .eq("published", true)
    .order("sort_order");

  const list = staff ?? [];

  return (
    <section className="section-pad bg-white">
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
              <div key={s.id} className="bg-[#FAFAF5] rounded-2xl border border-[#E2E2EA] p-6 text-center hover:border-[#001E5A]/30 hover:shadow-sm transition-all">
                <div className="w-20 h-20 rounded-full bg-[#001E5A] flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {s.photo_url ? (
                    <Image src={s.photo_url} alt={s.name} width={80} height={80} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-[#001E5A] text-sm mb-0.5">{s.name}</h3>
                <p className="text-[#D2003C] text-xs font-semibold mb-3">{s.role}</p>
                {s.bio && <p className="text-gray-400 text-xs leading-relaxed">{s.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
