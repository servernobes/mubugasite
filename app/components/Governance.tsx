import { cacheTag } from "next/cache";
import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

// Fallback when there is no photo: initials filling the portrait area
const Avatar = ({ name }: { name: string }) => {
  const initials = name.startsWith("[") ? "?" : name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-tint-strong font-extrabold text-4xl text-brand-ink/40">
      {initials}
    </div>
  );
};

export default async function Governance() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const { data: members } = await supabase
    .from("board_members")
    .select("id, name, role, group_type, confirmed, photo_url")
    .order("sort_order");

  const board      = (members ?? []).filter((m) => m.group_type === "board");
  const management = (members ?? []).filter((m) => m.group_type === "management");

  type Member = NonNullable<typeof members>[0];
  const Card = ({ m }: { m: Member }) => (
    <div className={`bg-surface rounded-2xl border overflow-hidden ${m.confirmed ? "border-line" : "border-dashed border-line"}`}>
      {/* Portrait photo — rectangular, full card width */}
      <div className="relative aspect-[4/5]">
        {m.photo_url ? (
          <Image src={m.photo_url} alt={m.name} fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover object-top" />
        ) : (
          <Avatar name={m.name} />
        )}
      </div>
      <div className="p-4 text-center">
        <p className={`font-bold text-sm mb-0.5 ${m.confirmed ? "text-brand-ink" : "text-gray-400 italic"}`}>{m.name}</p>
        <p className="text-accent-ink text-xs font-semibold">{m.role}</p>
        {!m.confirmed && (
          <span className="inline-block mt-2 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Pending</span>
        )}
      </div>
    </div>
  );

  return (
    <section className="section-pad bg-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <div className="mb-8">
            <span className="section-label">Governance</span>
            <h2 className="section-title">Board of Directors</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">Mubuga SACCO is governed by a Board of Directors elected by members.</p>
          </div>
          {board.length === 0 ? (
            <p className="text-gray-400 text-sm">Board details will be published once confirmed by management.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {board.map((b) => <Card key={b.id} m={b} />)}
            </div>
          )}
        </div>
        <div className="border-t border-line mb-14" />
        <div>
          <div className="mb-8">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Top Management</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">The management team handles the day-to-day operations of Mubuga SACCO.</p>
          </div>
          {management.length === 0 ? (
            <p className="text-gray-400 text-sm">Management profiles will be published once confirmed.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {management.map((m) => <Card key={m.id} m={m} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
