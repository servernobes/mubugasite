import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

const Avatar = ({ name, size = "lg" }: { name: string; size?: "lg" | "sm" }) => {
  const initials = name.startsWith("[") ? "?" : name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const dim = size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-sm";
  return (
    <div className={`${dim} rounded-full bg-[#001E5A] flex items-center justify-center mx-auto font-extrabold text-white`}>
      {initials}
    </div>
  );
};

export default async function Governance() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("board_members")
    .select("id, name, role, group_type, confirmed, photo_url")
    .order("sort_order");

  const board      = (members ?? []).filter((m) => m.group_type === "board");
  const management = (members ?? []).filter((m) => m.group_type === "management");

  const Card = ({ m, size }: { m: typeof board[0]; size?: "lg" | "sm" }) => (
    <div className={`bg-white rounded-2xl border p-5 text-center ${m.confirmed ? "border-[#E2E2EA]" : "border-dashed border-[#E2E2EA]"}`}>
      {m.photo_url ? (
        <Image src={m.photo_url} alt={m.name} width={64} height={64}
          className={`${size === "sm" ? "w-12 h-12" : "w-16 h-16"} rounded-full object-cover mx-auto`} />
      ) : (
        <Avatar name={m.name} size={size ?? "lg"} />
      )}
      <p className={`font-bold text-sm mt-3 mb-0.5 ${m.confirmed ? "text-[#001E5A]" : "text-gray-400 italic"}`}>{m.name}</p>
      <p className="text-[#D2003C] text-xs font-semibold">{m.role}</p>
      {!m.confirmed && (
        <span className="inline-block mt-2 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Pending
        </span>
      )}
    </div>
  );

  return (
    <section className="section-pad bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Board */}
        <div className="mb-14">
          <div className="mb-8">
            <span className="section-label">Governance</span>
            <h2 className="section-title">Board of Directors</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Mubuga SACCO is governed by a Board of Directors elected by members.
            </p>
          </div>
          {board.length === 0 ? (
            <p className="text-gray-400 text-sm">Board details will be published once confirmed by management.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {board.map((b) => <Card key={b.id} m={b} size="lg" />)}
            </div>
          )}
        </div>

        <div className="border-t border-[#E2E2EA] mb-14" />

        {/* Management */}
        <div>
          <div className="mb-8">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Top Management</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              The management team handles the day-to-day operations of Mubuga SACCO.
            </p>
          </div>
          {management.length === 0 ? (
            <p className="text-gray-400 text-sm">Management profiles will be published once confirmed.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {management.map((m) => <Card key={m.id} m={m} size="sm" />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
