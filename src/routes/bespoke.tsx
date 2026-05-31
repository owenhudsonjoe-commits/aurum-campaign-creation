import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { PaisleyDivider } from "@/components/PaisleyDivider";
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, Star } from "lucide-react";
import atelier from "@/assets/pk-atelier.jpg";

export const Route = createFileRoute("/bespoke")({
  head: () => ({ meta: [{ title: "Bespoke Atelier — Maison Aurum" }, { name: "description", content: "Commission a bespoke piece from Maison Aurum. Private consultations in Lahore, Karachi, Dubai and London." }] }),
  component: BespokePage,
});

const process = [
  { n: "01", title: "Private Consultation", desc: "A one-on-one session with your dedicated stylist — in our atelier or by private video call. We discuss your vision, occasion, budget, and timeline." },
  { n: "02", title: "Design & Fabric Selection", desc: "Our designers present hand-sketched illustrations, curated fabric swatches, and embroidery samples. Refinements continue until every detail is exactly right." },
  { n: "03", title: "Master Craftsmanship", desc: "Your piece enters our Gulberg atelier. Karigars with five generations of expertise begin the zardozi, dabka and tilla embroidery — 300+ hours of pure handwork." },
  { n: "04", title: "Fitting & Finishing", desc: "A final fitting — in-person or via measurements — ensures a flawless silhouette. Every stitch is inspected before the piece leaves our atelier." },
  { n: "05", title: "Signature Delivery", desc: "Your commission arrives in our emerald trunk, lined with rose silk, with a hand-signed certificate of authenticity and a handwritten note from your stylist." },
];

const faqs = [
  { q: "What is the minimum budget for a bespoke piece?", a: "Bespoke commissions typically start from PKR 150,000 for festive pieces and PKR 350,000 for full bridal ensembles. Pricing reflects the intricacy of embroidery, fabric choice, and number of pieces in the set." },
  { q: "How long does a bespoke commission take?", a: "Festive and Pret pieces take 6–8 weeks. Bridal ensembles require 12–16 weeks to allow sufficient time for fittings and hand embroidery. Rush commissions may be available depending on our atelier schedule — please enquire." },
  { q: "Can I commission a bespoke piece if I'm based abroad?", a: "Absolutely. We work with clients globally via WhatsApp and Zoom consultations. Measurements can be taken by a local tailor using our guide, or our stylist can visit you during our seasonal trunk shows in Dubai, London and New York." },
  { q: "Do you offer bespoke menswear?", a: "Yes. Our Maison Homme atelier specialises in sherwanis, bandhgalas, and formal kurtas for weddings and events. Groom packages including multiple looks are available." },
  { q: "Can I see fabric and embroidery samples before committing?", a: "Yes — we dispatch a curated swatch kit to your address before the design phase begins. For local clients, samples are available to view in our atelier." },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  timeline: string;
  budget: string;
  city: string;
  notes: string;
};

function BespokePage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", occasion: "", timeline: "", budget: "", city: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Hero */}
      <section className="relative pt-[41px] h-[55vh] min-h-[420px] overflow-hidden">
        <img src={atelier} alt="Aurum atelier" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/70 via-emerald-deep/50 to-ivory" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-[11px] uppercase tracking-luxe text-gold-warm mb-4">Private Commissions · بسپوک</p>
          <h1 className="font-display text-6xl md:text-8xl italic text-ivory leading-none">Bespoke Atelier</h1>
          <PaisleyDivider className="mt-8 [&_path]:stroke-gold-warm" />
          <p className="mt-6 text-sm text-ivory/80 max-w-lg font-light leading-relaxed">
            Every Maison Aurum bespoke piece begins with a private conversation. We craft to your exact measurements, vision, and story — with nothing left to chance.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-emerald-deep border-y border-gold/20 py-5 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-[10px] uppercase tracking-luxe text-ivory/70">
          {[
            { icon: Clock, label: "12–16 Weeks Bridal" },
            { icon: Star, label: "2,400+ Brides Dressed" },
            { icon: MapPin, label: "4 Global Ateliers" },
            { icon: CheckCircle, label: "Authenticity Guaranteed" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-gold-warm" strokeWidth={1.2} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-12 py-24 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-luxe text-gold mb-3">The Commission Process</p>
          <h2 className="font-display text-5xl md:text-6xl italic text-ink">How it works</h2>
          <PaisleyDivider className="mt-8" />
        </div>
        <div className="space-y-0">
          {process.map((step, i) => (
            <div key={step.n} className={`grid md:grid-cols-[120px_1fr] gap-6 py-10 border-b border-gold/20 group ${i === 0 ? "border-t" : ""}`}>
              <div className="flex md:flex-col items-center md:items-start gap-4">
                <span className="font-display text-5xl text-gradient-gold leading-none">{step.n}</span>
                {i < process.length - 1 && <div className="hidden md:block w-px flex-1 bg-gold/20 mt-3 ml-3" />}
              </div>
              <div className="md:pt-2">
                <h3 className="font-display text-2xl italic text-ink mb-3 group-hover:text-gold-warm transition-colors duration-300">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Form */}
      <section className="bg-[oklch(0.22_0.07_162)] text-ivory px-6 md:px-12 py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-luxe text-gold-warm mb-3">Begin Your Commission</p>
            <h2 className="font-display text-5xl italic text-ivory">Request a Consultation</h2>
            <p className="mt-4 text-sm text-ivory/60 font-light max-w-md mx-auto">Fill in the form below and your dedicated stylist will be in touch within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="text-center py-16 border border-gold/30">
              <CheckCircle className="h-12 w-12 text-gold mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-display text-3xl italic text-ivory mb-3">Request Received</h3>
              <p className="text-sm text-ivory/60 font-light max-w-sm mx-auto">Your stylist will contact you within 24 hours to schedule your private consultation. We look forward to creating something extraordinary together.</p>
              <p className="mt-4 text-[10px] uppercase tracking-luxe text-gold-warm">{form.email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="w-full bg-transparent border border-gold/30 px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-transparent border border-gold/30 px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">WhatsApp / Phone *</label>
                  <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" className="w-full bg-transparent border border-gold/30 px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Your City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Lahore, Karachi, Dubai…" className="w-full bg-transparent border border-gold/30 px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Occasion *</label>
                  <select name="occasion" required value={form.occasion} onChange={handleChange} className="w-full bg-[oklch(0.22_0.07_162)] border border-gold/30 px-4 py-3.5 text-sm text-ivory focus:outline-none focus:border-gold-warm transition-colors">
                    <option value="" disabled>Select occasion</option>
                    <option>Bridal — Shaadi</option>
                    <option>Bridal — Mehndi</option>
                    <option>Bridal — Walima</option>
                    <option>Festive — Eid</option>
                    <option>Festive — Sangeet</option>
                    <option>Menswear — Sherwani</option>
                    <option>Menswear — Bandhgala</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Estimated Timeline</label>
                  <select name="timeline" value={form.timeline} onChange={handleChange} className="w-full bg-[oklch(0.22_0.07_162)] border border-gold/30 px-4 py-3.5 text-sm text-ivory focus:outline-none focus:border-gold-warm transition-colors">
                    <option value="">Select timeline</option>
                    <option>Less than 6 weeks (Rush)</option>
                    <option>6–10 weeks</option>
                    <option>10–16 weeks</option>
                    <option>More than 16 weeks</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Approximate Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="w-full bg-[oklch(0.22_0.07_162)] border border-gold/30 px-4 py-3.5 text-sm text-ivory focus:outline-none focus:border-gold-warm transition-colors">
                    <option value="">Select budget range</option>
                    <option>PKR 100,000 – 250,000</option>
                    <option>PKR 250,000 – 500,000</option>
                    <option>PKR 500,000 – 1,000,000</option>
                    <option>PKR 1,000,000+</option>
                    <option>Prefer to discuss</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-luxe text-ivory/60 mb-2">Tell us about your vision</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="Describe your dream piece — colours, embroidery style, silhouette, any inspiration images…" className="w-full bg-transparent border border-gold/30 px-4 py-3.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors resize-none" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-gradient-gold text-ivory py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow">
                  Request Consultation <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-gold/40 text-gold-warm px-8 py-4 text-[11px] uppercase tracking-luxe hover:border-gold-warm transition-colors">
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                  WhatsApp Us
                </a>
              </div>
            </form>
          )}

          <div className="mt-10 pt-8 border-t border-gold/20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: "Lahore", sub: "Main Atelier · Gulberg" },
              { icon: MapPin, label: "Karachi", sub: "By Appointment" },
              { icon: MapPin, label: "Dubai", sub: "Seasonal Trunk Show" },
              { icon: MapPin, label: "London", sub: "By Appointment" },
            ].map((loc) => (
              <div key={loc.label} className="flex items-start gap-2">
                <loc.icon className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" strokeWidth={1.2} />
                <div>
                  <p className="text-[11px] uppercase tracking-luxe text-ivory">{loc.label}</p>
                  <p className="text-[10px] text-ivory/50 mt-0.5">{loc.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 md:px-12 py-24 max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-luxe text-gold mb-3">Common Questions</p>
          <h2 className="font-display text-5xl italic text-ink">FAQs</h2>
        </div>
        <div className="space-y-0 border-t border-gold/20">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gold/20">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display italic text-lg text-ink leading-snug">{faq.q}</span>
                <span className={`text-gold mt-1 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="pb-6">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-gold/20 bg-emerald-deep text-ivory py-10 text-center">
        <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">Ready to begin?</p>
        <p className="font-display text-2xl italic mb-2">Your atelier awaits.</p>
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-luxe text-ivory/40 mt-4">
          <Mail className="h-3 w-3 text-gold/50" strokeWidth={1.2} />
          <span>atelier@maisonaurum.com</span>
        </div>
      </div>
    </div>
  );
}
