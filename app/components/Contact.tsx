"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", enquiry: "general", message: "", consent: false });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.message.trim()) e.message = "Please enter your message";
    if (!form.consent) e.consent = "Please confirm your consent";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("submitting");

    const supabase = createClient();
    const categoryMap: Record<string, string> = {
      membership: "Membership",
      loans: "Loans",
      savings: "Savings",
      services: "Other Services",
      general: "General Enquiry",
    };

    const { error } = await supabase.from("enquiries").insert({
      name:     form.name.trim(),
      phone:    form.phone.trim(),
      email:    form.email.trim() || null,
      category: categoryMap[form.enquiry] ?? "General Enquiry",
      message:  form.message.trim(),
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-label">Reach Us</span>
          <h2 className="section-title">Talk to Mubuga SACCO</h2>
          <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto px-2">
            Have questions or ready to enquire? Fill in the form or contact us directly. We aim to respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="bg-tint rounded-xl border border-line p-5 sm:p-6">
              <h3 className="font-bold text-brand-ink mb-5">Contact Details</h3>
              {[
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Address", val: "Nyakinama Sub-county, Kisoro District\nP.O. Box 99, Kisoro, Uganda" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Telephone", val: "0394 841 360\n0394 845 526" },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", val: "mubugasacco@gmail.com" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Hours", val: "Mon – Fri: 8:00 AM – 5:00 PM" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3 pb-4 border-b border-line last:border-0 last:pb-0">
                  <div className="bg-brand/10 rounded-lg p-1.5 shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon}/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">{c.label}</p>
                    <p className="text-gray-700 text-sm font-medium whitespace-pre-line">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-tint rounded-xl border border-line p-5 sm:p-7">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="font-bold text-brand-ink text-lg mb-2">Enquiry Received</h3>
                <p className="text-gray-500 text-sm">Thank you for reaching out. A member of staff will be in touch with you.</p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", email: "", enquiry: "general", message: "", consent: false }); }}
                  className="mt-5 text-brand-ink text-sm font-semibold hover:underline">
                  Send another enquiry
                </button>
                <p className="text-xs text-amber-700 mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  Note: Form submission is not yet connected to a live backend. Please also call 0394 841 360 to ensure your enquiry is received.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                    <input type="text" placeholder="Your full name" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-ink ${errors.name ? "border-red-400" : "border-line"} bg-surface`}/>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                    <input type="tel" placeholder="07XX XXX XXX" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-ink ${errors.phone ? "border-red-400" : "border-line"} bg-surface`}/>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address (optional)</label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-line rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-ink bg-surface"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Enquiry Category</label>
                  <select value={form.enquiry} onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                    className="w-full border border-line rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-ink bg-surface">
                    <option value="membership">Membership</option>
                    <option value="loans">Loans</option>
                    <option value="savings">Savings</option>
                    <option value="services">Other Services</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Message *</label>
                  <textarea rows={4} placeholder="How can we help you?" value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-ink resize-none ${errors.message ? "border-red-400" : "border-line"} bg-surface`}/>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 accent-brand"/>
                    <span className="text-xs text-gray-600 leading-relaxed">
                      I consent to Mubuga SACCO using my contact details to respond to this enquiry. I have not submitted sensitive personal or financial information through this form.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
                </div>
                <button type="submit" disabled={status === "submitting"}
                  className="w-full bg-brand hover:bg-accent disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  {status === "submitting" && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                  {status === "submitting" ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
