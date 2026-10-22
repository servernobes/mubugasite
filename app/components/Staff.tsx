import { cacheTag } from "next/cache";
import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";

// "Meet the Team" on the About page. Staff are grouped by the role typed in the admin:
// Board Leadership (only members who agreed to be shown) first, then Manager, Branch Managers,
// Supervisors and everyone else (display order within each group).
// Photos uploaded in the admin are shown as rectangular portraits; anyone without a photo gets a profile icon.
type Member = { id: string; name: string; role: string; bio: string; photo: string | null; board?: boolean };

const GROUPS = [
  { id: "board",    title: "Board Leadership" },
  { id: "manager",  title: "Manager" },
  { id: "branch",   title: "Branch Managers" },
  { id: "super",    title: "Supervisors" },
  { id: "staff",    title: "Our Staff" },
] as const;

function groupOf(m: Member): (typeof GROUPS)[number]["id"] {
  if (m.board) return "board";
  const r = m.role.toLowerCase();
  if (r.includes("branch") && r.includes("manager")) return "branch";
  if (r.includes("manager")) return "manager";
  if (r.includes("supervisor")) return "super";
  return "staff";
}

function MemberCard({ m, large }: { m: Member; large: boolean }) {
  return (
    <div className="bg-surface rounded-2xl border border-line overflow-hidden hover:shadow-md transition-shadow">
      {/* Same portrait area for everyone: the photo, or a profile icon */}
      <div className="relative aspect-[4/5] bg-tint-strong flex items-center justify-center">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill
            sizes={large ? "320px" : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
            className="object-cover object-top" />
        ) : (
          <svg className={`${large ? "w-24 h-24" : "w-16 h-16"} text-brand-ink/25`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        )}
      </div>
      <div className={`text-center ${large ? "p-5" : "p-4"}`}>
        <h4 className={`font-bold text-brand-ink ${large ? "text-lg" : "text-sm sm:text-base"}`}>{m.name}</h4>
        <p className="text-accent-ink text-xs font-semibold mt-0.5">{m.role}</p>
        {m.bio && <p className="text-gray-500 text-xs leading-relaxed mt-2.5">{m.bio}</p>}
      </div>
    </div>
  );
}

export default async function Staff() {
  "use cache";
  cacheTag("cms"); // cleared by /api/revalidate when the admin saves
  const supabase = createCachedClient();
  const [{ data: staff }, { data: management }] = await Promise.all([
    supabase.from("staff_members").select("id, name, role, bio, photo_url").eq("published", true).order("sort_order"),
    // From Admin → Board & Management: management entries, plus only those board members ticked
    // "Show on website (this person has agreed)". Unticked board members stay private.
    supabase.from("board_members").select("id, name, role, group_type, photo_url, sort_order")
      .eq("confirmed", true).order("sort_order"),
  ]);

  // Board: chairperson first, then vice chair, then the rest in display order
  const chairRank = (role: string) => (/vice/i.test(role) ? 1 : /chair/i.test(role) ? 0 : 2);
  const board = (management ?? []).filter((m) => m.group_type === "board")
    .sort((a, b) => chairRank(a.role) - chairRank(b.role) || a.sort_order - b.sort_order);
  const mgmt = (management ?? []).filter((m) => m.group_type === "management");

  const list: Member[] = [
    ...board.map((m) => ({ id: `board-${m.id}`, name: m.name, role: m.role, bio: "", photo: m.photo_url, board: true })),
    ...mgmt.map((m) => ({ id: `mgmt-${m.id}`, name: m.name, role: m.role, bio: "", photo: m.photo_url })),
    ...(staff ?? []).map((m) => ({ id: m.id, name: m.name, role: m.role, bio: m.bio, photo: m.photo_url })),
  ];
  const groups = GROUPS
    .map((g) => ({ ...g, members: list.filter((m) => groupOf(m) === g.id) }))
    .filter((g) => g.members.length > 0);

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

        {groups.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">
            Staff profiles will be published here once confirmed by management.
          </p>
        ) : (
          <div className="space-y-12">
            {groups.map((g) => {
              const lead = g.id === "manager" || g.id === "board";
              return (
                <div key={g.id}>
                  <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">{g.title}</h3>
                  {/* Centred rows, so a group of one or two people doesn't sit off to the left */}
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                    {g.members.map((m) => (
                      <div key={m.id} className={lead ? "w-full max-w-xs" : "w-[calc(50%-0.5rem)] sm:w-56 lg:w-60"}>
                        <MemberCard m={m} large={lead} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
