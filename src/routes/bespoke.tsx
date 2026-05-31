import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/bespoke")({
  head: () => ({ meta: [{ title: "Bespoke — Maison Aurum" }] }),
  component: BespokePage,
});

function BespokePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[120px] max-w-[900px] mx-auto px-6 md:px-12 pb-24">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-3">Private Commissions</p>
          <h1 className="font-display text-6xl italic text-ink mb-4">Bespoke Atelier</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Every Maison Aurum bespoke piece begins with a private consultation. We craft to your exact measurements, colour preferences, and vision — with nothing left to chance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { step: "01", title: "Consultation", desc: "A private appointment — in our atelier or via video — to discuss your vision, occasion, and timeline." },
            { step: "02", title: "Design & Fabric", desc: "Our designers present mood boards, fabric swatches, and embroidery samples tailored to your brief." },
            { step: "03", title: "Craft & Deliver", desc: "Your piece is hand-embroidered in Lahore, fitted to your measurements, and delivered in our signature trunk." },
          ].map((s) => (
            <div key={s.step} className="border border-gold/20 p-8 text-center">
              <p className="font-display text-5xl text-gold/30 mb-3">{s.step}</p>
              <h3 className="text-[11px] uppercase tracking-luxe text-ink mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="border border-gold/20 p-10 text-center">
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-3">Book Your Consultation</p>
          <h2 className="font-display text-3xl italic text-ink mb-6">Let's Begin</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-ivory px-8 py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              WhatsApp Us
            </a>
            <a href="mailto:atelier@maisonaurum.com"
              className="inline-flex items-center justify-center gap-2 border border-gold/40 text-ink px-8 py-4 text-[11px] uppercase tracking-luxe hover:border-gold transition-colors">
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              Email Atelier
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gold/20 flex flex-wrap justify-center gap-8 text-[11px] text-muted-foreground">
            {["Lahore · Main Atelier", "Karachi · By Appointment", "Dubai · Seasonal Trunk Show", "London · By Appointment"].map((loc) => (
              <div key={loc} className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                {loc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
