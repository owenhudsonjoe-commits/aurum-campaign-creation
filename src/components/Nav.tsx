import { useEffect, useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, Phone } from "lucide-react";
import { AurumLogo } from "./AurumLogo";

const links = ["Bridal", "Festive", "Atelier", "Lookbook", "Bespoke"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="fixed inset-x-0 top-0 z-50 bg-emerald-deep text-ivory py-2.5 px-6 text-center text-[10px] uppercase tracking-luxe">
        <span className="text-gold-warm">Complimentary Worldwide Shipping</span>
        <span className="mx-4 text-gold/40 hidden sm:inline">·</span>
        <span className="hidden sm:inline text-ivory/70">Authenticity Certificate with Every Piece</span>
        <span className="mx-4 text-gold/40 hidden md:inline">·</span>
        <span className="hidden md:inline text-ivory/70">Private Atelier Appointments Available</span>
      </div>

      <header
        className={`fixed inset-x-0 top-[41px] z-50 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-xl bg-ivory/85 border-b border-gold/30 shadow-[0_4px_40px_rgba(0,0,0,0.07)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12 py-5">
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-luxe text-foreground/85">
            {links.slice(0, 3).map((l) => (
              <a key={l} href="#" className="relative group">
                <span className="transition-colors group-hover:text-gold">{l}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a href="#" className="absolute left-1/2 -translate-x-1/2">
            <AurumLogo className="text-2xl md:text-3xl" />
          </a>

          <div className="flex items-center gap-5 text-foreground/85">
            <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-luxe">
              {links.slice(3).map((l) => (
                <a key={l} href="#" className="relative group">
                  <span className="transition-colors group-hover:text-gold">{l}</span>
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Search className="hidden md:block h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
              <User className="hidden md:block h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
              <Heart className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
              <div className="relative">
                <ShoppingBag className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-gold text-[9px] text-ivory font-medium">2</span>
              </div>
              <button
                className="md:hidden ml-1 text-foreground/85 hover:text-gold transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[82vw] max-w-sm bg-emerald-deep border-l border-gold/20 flex flex-col transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-8 py-6 border-b border-gold/20">
            <AurumLogo className="text-2xl text-ivory" />
            <button onClick={() => setMobileOpen(false)} className="text-ivory/60 hover:text-gold-warm transition-colors">
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>
          </div>
          <nav className="flex flex-col px-8 py-8">
            {links.map((l, i) => (
              <a
                key={l}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="py-5 border-b border-gold/10 font-display text-2xl italic text-ivory/80 hover:text-gold-warm transition-colors flex items-center justify-between"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {l}
                <span className="text-gold/30 text-sm font-sans not-italic tracking-wider">→</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto px-8 pb-12 space-y-5">
            <p className="text-[10px] uppercase tracking-luxe text-gold-warm">Visit our Ateliers</p>
            <p className="text-sm text-ivory/60 font-light leading-relaxed">Lahore · Karachi · Dubai · London · New York</p>
            <a href="#" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-[10px] uppercase tracking-luxe text-ivory shadow-luxe">
              <Phone className="h-3 w-3" strokeWidth={1.5} />
              Book Private Appointment
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
