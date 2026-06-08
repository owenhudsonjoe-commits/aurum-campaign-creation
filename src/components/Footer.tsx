import { Link } from "@tanstack/react-router";
import { AurumLogo } from "./AurumLogo";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

const collections = [
  { label: "Bridal Couture", href: "/shop", search: { collection: "Bridal" as const, fabric: "Stitched" as const } },
  { label: "Festive Prêt", href: "/shop", search: { collection: "Festive / Pret" as const, fabric: "Stitched" as const } },
  { label: "Daily Wear", href: "/shop", search: { collection: "Daily Wear" as const, fabric: "Stitched" as const } },
  { label: "Men's", href: "/shop", search: { collection: "Men's" as const, fabric: "Stitched" as const } },
  { label: "Unstitched", href: "/shop", search: { collection: "All" as const, fabric: "Unstitched" as const } },
];

const help = [
  { label: "Bespoke Atelier", href: "/bespoke" },
  { label: "Size Guides", href: "/shop" },
  { label: "Shipping & Returns", href: "/shop" },
  { label: "Your Bag", href: "/cart" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Help strip */}
      <div className="border-b border-background/10 py-8 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-sm font-medium">Need help? Our stylists are here for you.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/923318541663"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-background/20 px-5 py-2.5 text-[11px] tracking-widest uppercase hover:bg-background/10 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
              +92 331 854 1663
            </a>
            <a
              href="mailto:aurumshop12@gmail.com"
              className="inline-flex items-center justify-center gap-2 border border-background/20 px-5 py-2.5 text-[11px] tracking-widest uppercase hover:bg-background/10 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
              aurumshop12@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <AurumLogo className="text-lg text-background mb-4" />
          <p className="text-xs text-background/50 leading-relaxed mb-6 max-w-[200px]">
            Pakistani heritage couture — bridal, festive prêt and bespoke tailoring from our Lahore atelier.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
              <Instagram className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
              <Facebook className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-widest uppercase text-background/40 mb-5 font-medium">Collections</p>
          <ul className="space-y-3">
            {collections.map((c) => (
              <li key={c.label}>
                <Link to={c.href} search={c.search} className="text-xs text-background/60 hover:text-background transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-widest uppercase text-background/40 mb-5 font-medium">Help</p>
          <ul className="space-y-3">
            {help.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="text-xs text-background/60 hover:text-background transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-widest uppercase text-background/40 mb-5 font-medium">Ateliers</p>
          <ul className="space-y-3">
            {["Lahore", "Karachi", "Dubai", "London"].map((city) => (
              <li key={city} className="text-xs text-background/60">{city}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 px-5 md:px-10 py-5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] uppercase tracking-widest text-background/30">
          <p>© {new Date().getFullYear()} Maison Aurum. All rights reserved.</p>
          <p>Made in Lahore</p>
        </div>
      </div>
    </footer>
  );
}
