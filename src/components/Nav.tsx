import { useEffect, useState } from "react";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { AurumLogo } from "./AurumLogo";

const links = ["Bridal", "Festive", "Atelier", "Lookbook", "Bespoke"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-ivory/70 border-b border-gold/30"
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

        <div className="flex items-center gap-6 text-foreground/85">
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-luxe">
            {links.slice(3).map((l) => (
              <a key={l} href="#" className="relative group">
                <span className="transition-colors group-hover:text-gold">{l}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Search className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
            <User className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
            <Heart className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
            <div className="relative">
              <ShoppingBag className="h-4 w-4 cursor-pointer transition-colors hover:text-gold" strokeWidth={1.2} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-gold text-[9px] text-ivory">2</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
