import { Link } from "@tanstack/react-router";
import { AurumLogo } from "./AurumLogo";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { PaisleyDivider } from "./PaisleyDivider";

const collections = [
  { label: "Bridal Couture", href: "/shop", search: { collection: "Bridal" as const, fabric: "Stitched" as const } },
  { label: "Festive Prêt", href: "/shop", search: { collection: "Festive / Pret" as const, fabric: "Stitched" as const } },
  { label: "Daily Wear", href: "/shop", search: { collection: "Daily Wear" as const, fabric: "Stitched" as const } },
  { label: "Men's", href: "/shop", search: { collection: "Men's" as const, fabric: "Stitched" as const } },
  { label: "Unstitched", href: "/shop", search: { collection: "All" as const, fabric: "Unstitched" as const } },
];

const info = [
  { label: "Bespoke Atelier", href: "/bespoke" },
  { label: "Size Guides", href: "/shop" },
  { label: "Shipping & Returns", href: "/shop" },
  { label: "Your Bag", href: "/cart" },
];

export function Footer() {
  return (
    <footer className="bg-[oklch(0.17_0.06_162)] text-ivory">
      {/* Top strip */}
      <div className="border-b border-gold/15 py-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-1">Need help choosing?</p>
            <p className="font-display text-2xl italic">Our stylists are one message away.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/923318541663?text=Hi%2C%20I%27d%20love%20some%20help%20choosing%20a%20piece%20from%20Maison%20Aurum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-[10px] uppercase tracking-luxe text-ivory hover:shadow-luxe transition-shadow"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              WhatsApp · +92 331 854 1663
            </a>
            <a
              href="mailto:aurumshop12@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 text-[10px] uppercase tracking-luxe text-ivory/80 hover:border-gold-warm hover:text-gold-warm transition-colors"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              aurumshop12@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <AurumLogo className="text-2xl text-ivory mb-4" />
          <p className="text-xs text-ivory/50 font-light leading-relaxed mb-5 max-w-[220px]">
            A private house of Pakistani heritage couture — bridal, festive prêt and bespoke tailoring, hand-crafted in our Lahore atelier.
          </p>
          <PaisleyDivider className="mb-5 [&_path]:stroke-gold/25" />
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ivory/40 hover:text-gold-warm transition-colors">
              <Instagram className="h-4 w-4" strokeWidth={1.2} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ivory/40 hover:text-gold-warm transition-colors">
              <Facebook className="h-4 w-4" strokeWidth={1.2} />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-5">Collections</p>
          <ul className="space-y-3">
            {collections.map((c) => (
              <li key={c.label}>
                <Link to={c.href} search={c.search} className="text-xs text-ivory/55 hover:text-ivory transition-colors font-light">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-5">Help</p>
          <ul className="space-y-3">
            {info.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="text-xs text-ivory/55 hover:text-ivory transition-colors font-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ateliers */}
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-5">Ateliers</p>
          <ul className="space-y-4">
            {[
              { city: "Lahore", detail: "Main Atelier · Gulberg" },
              { city: "Karachi", detail: "By Appointment" },
              { city: "Dubai", detail: "Seasonal Trunk Show" },
              { city: "London", detail: "By Appointment" },
            ].map((a) => (
              <li key={a.city} className="flex items-start gap-2">
                <MapPin className="h-3 w-3 text-gold/50 mt-0.5 shrink-0" strokeWidth={1.2} />
                <div>
                  <p className="text-xs text-ivory/80 leading-none">{a.city}</p>
                  <p className="text-[10px] text-ivory/35 mt-0.5">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10 px-6 md:px-12 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-luxe text-ivory/25">
          <p>© {new Date().getFullYear()} Maison Aurum. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Made to order in Lahore</span>
            <span className="text-gold/20">·</span>
            <span>EST. MMXXV</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
