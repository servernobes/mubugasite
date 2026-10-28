"use cache";
import { cacheTag } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { createCachedClient } from "@/lib/supabase/cached";
import { getHomePhotos } from "../components/HomePhotos";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/membership", "Membership", "How to join Mubuga SACCO Ltd in Kisoro: requirements (passport photos, national ID, fees), benefits of membership and the accounts you can open.");

const BENEFITS = [
  { title: "Safe savings", desc: "Keep your money secure in a member-owned cooperative and watch it grow.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { title: "Affordable loans", desc: "Access business, agricultural, school fees, emergency and other loans at member rates.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { title: "Part ownership", desc: "Your share capital makes you a co-owner of the SACCO with a voice at the general meeting.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "Mobile banking", desc: "Deposit, withdraw and repay loans from your phone with MSACCO on MTN and Airtel.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { title: "Savings for every need", desc: "Ordinary, voluntary, junior, VSLA and school fees collection accounts.",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" },
  { title: "Close to you", desc: "Served from our Head Office in Mubuga, Nyakinama and our Kisoro Town Branch.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
];

const STEPS = [
  { title: "Check eligibility", desc: "Membership is open to eligible individuals, groups and institutions in our community. Ask our staff if you are unsure." },
  { title: "Choose account type", desc: "Pick the account that fits you: Individual, Group / VSLA, Institution, or Junior for a child." },
  { title: "Submit requirements", desc: "Visit any Mubuga SACCO office with two passport-size photos and your national ID, fill in the membership application form and pay UGX 40,000 (share capital, membership fee and initial deposit)." },
  { title: "Get confirmation", desc: "Once approved, you can start saving, apply for loans and register for MSACCO mobile services." },
];

// What every new member brings and pays (confirmed by Mubuga SACCO)
const REQUIRED_DOCS = ["Two (2) recent passport-size photographs", "Valid national ID"];
const FEES: [string, number][] = [
  ["Share capital", 10000],
  ["Membership fee", 20000],
  ["Initial savings deposit", 10000],
];
const FEES_TOTAL = FEES.reduce((sum, [, amount]) => sum + amount, 0);
const ugx = (n: number) => `UGX ${n.toLocaleString("en-US")}`;

const ACCOUNTS = [
  { title: "Individual", who: "Adults who want to save and borrow in their own name.",
    needs: ["Two (2) passport-size photographs", "Valid national ID", "Completed membership application form", "UGX 40,000: share capital 10,000 + membership fee 20,000 + initial deposit 10,000"] },
  { title: "Group / VSLA", who: "Village savings groups, associations and other registered groups.",
    needs: ["Group registration or recognition documents", "Minutes authorising the account and its signatories", "Two (2) passport-size photographs and a valid national ID for each signatory", "Completed group application form", "UGX 40,000: share capital 10,000 + membership fee 20,000 + initial deposit 10,000"] },
  { title: "Institution", who: "Schools, churches, cooperatives and other organisations, including school fees collection.",
    needs: ["Registration certificate of the institution", "Resolution naming the authorised signatories", "Two (2) passport-size photographs and a valid national ID for each signatory", "Completed institution application form", "UGX 40,000: share capital 10,000 + membership fee 20,000 + initial deposit 10,000"] },
  { title: "Junior", who: "Children's savings accounts opened and run by a parent or guardian.",
    needs: ["Child's birth certificate or other proof of age", "Two (2) passport-size photographs of the child", "Parent or guardian's valid national ID", "Parent or guardian's details on the application form", "UGX 40,000: share capital 10,000 + membership fee 20,000 + initial deposit 10,000"] },
];

export default async function MembershipPage() {
  "use cache";
  cacheTag("site-settings", "cms"); // cleared by /api/revalidate when the admin saves
  // Admin → Homepage Photos → Membership Page Photo; until set, the community banner or a slider photo
  const pics = await getHomePhotos(["membership", "community", "hero"]);
  const photo = pics.membership ?? pics.community ?? pics.hero ?? null;
  const supabase = createCachedClient();
  const { data: rows } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["phone_primary", "phone_secondary", "email"]);

  const s: Record<string, string> = {};
  (rows ?? []).forEach((r) => { s[r.key] = r.value; });
  const phone  = s.phone_primary   ?? "0394 841 360";
  const phone2 = s.phone_secondary ?? "0394 845 526";
  const email  = s.email           ?? "mubugasacco@gmail.com";

  return (
    <>
      {/* Page hero */}
      <div className="bg-gradient-to-b from-tint-strong to-surface border-b border-line py-10 sm:py-14">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${photo ? "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" : ""}`}>
          <div>
          <span className="section-label">Membership</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink mt-1">Membership &amp; Account Opening</h1>
          <p className="text-gray-600 mt-3 max-w-2xl text-sm sm:text-base">
            Discover how to join Mubuga SACCO, the benefits of being a member and the accounts you can open.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[["Membership Benefits", "#benefits"], ["How to Become a Member", "#join"], ["Requirements", "#requirements"], ["Account Opening", "#accounts"]].map(([label, href]) => (
              <a key={href} href={href}
                className="text-xs font-semibold text-gray-600 hover:text-brand-ink border border-line hover:border-brand-ink/30 bg-surface px-3 py-1.5 rounded-full transition-colors">
                {label}
              </a>
            ))}
          </div>
          </div>
          {/* Photo beside the heading (below it on phones) */}
          {photo && (
            <div className="relative rounded-2xl overflow-hidden border border-line shadow-sm aspect-[16/10] bg-tint-strong">
              <Image src={photo.storage_url} alt={photo.alt_text || "Mubuga SACCO members"} fill priority
                sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Benefits */}
      <section id="benefits" className="section-pad bg-surface scroll-mt-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="section-label">Why join</span>
          <h2 className="section-title mb-8">Membership Benefits</h2>
          {/* One benefit per row */}
          <ul className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex items-start gap-4 rounded-2xl border border-line bg-tint p-5">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={b.icon}/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-brand-ink mb-1">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section id="join" className="section-pad bg-tint scroll-mt-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="section-label">Getting started</span>
          <h2 className="section-title mb-8">How to Become a Member</h2>
          {/* Vertical timeline: numbered steps joined by a line */}
          <ol className="flex flex-col">
            {STEPS.map((st, i) => (
              <li key={st.title} className="relative flex gap-4 pb-6 last:pb-0">
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-line" />
                )}
                <span className="relative z-10 w-9 h-9 shrink-0 rounded-full bg-accent text-white font-extrabold flex items-center justify-center shadow-sm">
                  {i + 1}
                </span>
                <div className="flex-1 bg-surface rounded-2xl border border-line p-5">
                  <h3 className="font-bold text-brand-ink mb-1">{st.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{st.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="section-pad bg-surface scroll-mt-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="section-label">What you need</span>
          <h2 className="section-title mb-4">Membership Requirements</h2>
          <p className="text-gray-600 text-sm mb-8">
            These apply to every account type: individual, group, institution and junior. Groups and institutions bring photos and IDs for each signatory. Bring them to any Mubuga SACCO office; our staff will help you fill in the application form.
          </p>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-line bg-tint p-6">
              <h3 className="font-bold text-brand-ink mb-3">Bring with you</h3>
              <ul className="space-y-2.5">
                {REQUIRED_DOCS.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-accent-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-tint p-6">
              <h3 className="font-bold text-brand-ink mb-3">Pay when joining</h3>
              <dl className="divide-y divide-line">
                {FEES.map(([label, amount]) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-gray-700">{label}</dt>
                    <dd className="font-semibold text-brand-ink tabular-nums">{ugx(amount)}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 pt-3 mt-1 border-t-2 border-brand-ink/20">
                  <dt className="font-bold text-brand-ink">Total</dt>
                  <dd className="font-extrabold text-brand-ink text-lg tabular-nums">{ugx(FEES_TOTAL)}</dd>
                </div>
              </dl>
              <p className="text-gray-500 text-xs mt-3 leading-relaxed">
                Your share capital makes you a part-owner of the SACCO, and the initial deposit opens your savings balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account types */}
      <section id="accounts" className="section-pad bg-tint scroll-mt-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="section-label">Account opening</span>
          <h2 className="section-title mb-4">Choose Your Account Type</h2>
          <p className="text-gray-600 text-sm mb-8">
            Bring the following when you visit our office. Requirements and fees can change, so please confirm the current list with our staff before you come.
          </p>
          <div className="flex flex-col gap-4">
            {ACCOUNTS.map((a) => (
              <div key={a.title} className="rounded-2xl border border-line border-l-4 border-l-brand bg-surface p-6">
                <h3 className="font-bold text-brand-ink text-lg">{a.title}</h3>
                <p className="text-gray-500 text-sm mt-1 mb-4">{a.who}</p>
                <ul className="space-y-2">
                  {a.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-accent-ink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                      </svg>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="pb-16 sm:pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-brand p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-white font-extrabold text-xl sm:text-2xl">Need assistance?</h2>
              <p className="text-white/75 text-sm mt-2 max-w-xl">
                Call us on <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-white font-semibold underline-offset-2 hover:underline">{phone}</a>
                {phone2 && <> or <a href={`tel:${phone2.replace(/\s/g, "")}`} className="text-white font-semibold underline-offset-2 hover:underline">{phone2}</a></>}
                , email <a href={`mailto:${email}`} className="text-white font-semibold underline-offset-2 hover:underline">{email}</a>,
                or visit any of our offices during working hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/branches" className="text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                Find an Office
              </Link>
              <Link href="/contact?enquiry=membership" className="text-center bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                Enquire About Membership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
