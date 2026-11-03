// Contact form (app/components/Contact.tsx) posts here.
// 1. Saves the enquiry in Supabase, where staff see it in Admin → Enquiries.
// 2. Emails it to the SACCO inbox through Gmail.
// Email settings (Vercel → Settings → Environment Variables):
//   GMAIL_USER          the Gmail address that sends, e.g. mubugasacco@gmail.com
//   GMAIL_APP_PASSWORD  a Google "app password" for that account (not the normal password)
//   CONTACT_TO          optional, where enquiries go (default mubugasacco@gmail.com)
// Without them the enquiry is still saved; only the email is skipped.
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const CATEGORIES: Record<string, string> = {
  membership: "Membership",
  loans: "Loans",
  savings: "Savings",
  services: "Other Services",
  general: "General Enquiry",
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  // Hidden "website" field: people never fill it, spam bots do
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name    = clean(body.name, 120);
  const phone   = clean(body.phone, 40);
  const email   = clean(body.email, 160);
  const message = clean(body.message, 5000);
  const category = CATEGORIES[clean(body.enquiry, 40)] ?? "General Enquiry";

  if (!name || !phone || !message) return Response.json({ error: "Name, phone and message are required" }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Invalid email" }, { status: 400 });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { error } = await supabase.from("enquiries").insert({ name, phone, email: email || null, category, message });
  if (error) {
    console.error("enquiry insert failed:", error.message);
    return Response.json({ error: "Could not save your message" }, { status: 500 });
  }

  // The enquiry is saved; a failed email must not show the visitor an error
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (user && pass) {
    try {
      const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
      const rows: [string, string][] = [["Name", name], ["Phone", phone], ["Email", email || "—"], ["Enquiry type", category]];
      await transport.sendMail({
        from: `"Mubuga SACCO Website" <${user}>`,
        to: process.env.CONTACT_TO || "mubugasacco@gmail.com",
        ...(email ? { replyTo: `"${name.replace(/["\r\n]/g, "")}" <${email}>` } : {}),
        subject: `Website enquiry: ${category} – ${name}`.replace(/[\r\n]/g, " "),
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${message}\n\nAlso saved in Admin → Enquiries.`,
        html: `<table cellpadding="4">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
<p><b>Message</b></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<p style="color:#888;font-size:12px">Also saved in Admin → Enquiries.${email ? " Reply to this email to answer the sender." : ""}</p>`,
      });
    } catch (e) {
      console.error("enquiry email failed:", e instanceof Error ? e.message : e);
    }
  }

  return Response.json({ ok: true });
}
