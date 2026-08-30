import { Link } from "@tanstack/react-router";
import { AurumLogo } from "./AurumLogo";
import { Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { useCatalog } from "@/lib/catalog";

const help = [
  { label: "Bespoke Atelier",   href: "/bespoke" },
  { label: "Track My Order",    href: "/track" },
  { label: "Size Guides",       href: "/shop" },
  { label: "Shipping & Returns",href: "/shop" },
  { label: "Your Bag",          href: "/cart" },
];

export function Footer() {
  const { collections, settings } = useCatalog();

  return (
    <footer style={{ background: "#17130f", color: "#f5f0e8" }}>

      {/* ── Help strip with gold line ── */}
      <div style={{ borderBottom: "1px solid rgba(201,168,76,0.18)" }} className="py-8 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="font-display text-xl font-light" style={{ color: "#d4c8b0" }}>
            Need help? Our stylists are here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-colors hover:opacity-80"
              style={{ border: "1px solid rgba(201,168,76,0.35)", color: "#c9a84c" }}
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${settings.supportEmail}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-colors hover:opacity-80"
              style={{ border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.6)" }}
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-5">
            <AurumLogo className="text-[13px]" />
          </div>
          <p className="text-xs leading-relaxed mb-6 max-w-[190px] font-sans font-light" style={{ color: "rgba(245,240,232,0.4)" }}>
            Pakistani heritage couture — bridal, festive prêt and bespoke tailoring from our Lahore atelier.
          </p>
          <div className="flex items-center gap-4">
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:opacity-60" style={{ color: "rgba(245,240,232,0.35)" }}>
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:opacity-60" style={{ color: "rgba(245,240,232,0.35)" }}>
              <Facebook className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <p className="text-[9px] tracking-[0.3em] uppercase font-sans font-medium mb-5" style={{ color: "#c9a84c" }}>Collections</p>
          <ul className="space-y-3">
            {collections.map((collection) => (
              <li key={collection}>
                <Link to="/shop" search={{ collection, fabric: "Stitched" }}
                  className="text-xs font-sans transition-colors hover:opacity-80"
                  style={{ color: "rgba(245,240,232,0.5)" }}>
                  {collection}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <p className="text-[9px] tracking-[0.3em] uppercase font-sans font-medium mb-5" style={{ color: "#c9a84c" }}>Help</p>
          <ul className="space-y-3">
            {help.map((l) => (
              <li key={l.label}>
                <Link to={l.href}
                  className="text-xs font-sans transition-colors hover:opacity-80"
                  style={{ color: "rgba(245,240,232,0.5)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ateliers */}
        <div>
          <p className="text-[9px] tracking-[0.3em] uppercase font-sans font-medium mb-5" style={{ color: "#c9a84c" }}>Ateliers</p>
          <ul className="space-y-3">
            {["Lahore", "Karachi", "Dubai", "London"].map((city) => (
              <li key={city} className="text-xs font-sans" style={{ color: "rgba(245,240,232,0.5)" }}>{city}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-5 md:px-10 py-5" style={{ borderTop: "1px solid rgba(245,240,232,0.07)" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] tracking-[0.2em] uppercase font-sans" style={{ color: "rgba(245,240,232,0.2)" }}>
          <p>© {new Date().getFullYear()} Maison Aurum. All rights reserved.</p>
          <p>Handcrafted in Lahore</p>
        </div>
      </div>
    </footer>
  );
}
