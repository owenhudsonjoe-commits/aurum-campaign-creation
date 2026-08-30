import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AurumLogo } from "./AurumLogo";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCatalog } from "@/lib/catalog";

const navLinks = [
  { label: "Bridal",     href: "/shop", search: { collection: "Bridal" as const,       fabric: "Stitched" as const } },
  { label: "Festive",    href: "/shop", search: { collection: "Festive / Pret" as const, fabric: "Stitched" as const } },
  { label: "Daily Wear", href: "/shop", search: { collection: "Daily Wear" as const,    fabric: "Stitched" as const } },
  { label: "Fusion",     href: "/shop", search: { collection: "Cultural Fusion" as const, fabric: "Stitched" as const } },
  { label: "Men's",      href: "/shop", search: { collection: "Men's" as const,         fabric: "Stitched" as const } },
  { label: "Bespoke",    href: "/bespoke", search: undefined },
  { label: "Sale",       href: "/sale",    search: undefined },
];

export function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const cartCount     = useCart((s) => s.count());
  const wishlistCount = useWishlist((s) => s.count());
  const announcement   = useCatalog((s) => s.settings.announcement);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      {/* ── Gold announcement bar ── */}
      <div
        className="fixed inset-x-0 top-0 z-50 py-2.5 px-4 text-center text-[10px] tracking-[0.25em] uppercase font-sans font-medium"
        style={{ background: "var(--gold)", color: "#1a1410" }}
      >
        {announcement}
      </div>

      {/* ── Main header ── */}
      <header
        className={`fixed inset-x-0 top-[41px] z-50 bg-background transition-all duration-300 ${
          scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.06)]" : ""
        } border-b border-border`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 h-[56px]">

          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 4).map((l) => (
              <Link
                key={l.label}
                to={l.href}
                search={l.search}
                className="text-[11px] font-sans font-medium tracking-[0.12em] text-foreground/55 hover:text-foreground transition-colors uppercase"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo — centred */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <AurumLogo className="text-[14px]" />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-6 ml-auto">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(4).map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  search={l.search}
                  className={`text-[11px] font-sans font-medium tracking-[0.12em] uppercase transition-colors ${
                    l.label === "Sale"
                      ? "text-red-500 hover:text-red-600"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/shop" className="hidden md:block text-foreground/50 hover:text-foreground transition-colors">
                <Search className="h-[17px] w-[17px]" strokeWidth={1.5} />
              </Link>
              <Link to="/wishlist" className="relative text-foreground/50 hover:text-foreground transition-colors">
                <Heart
                  className={`h-[17px] w-[17px] ${wishlistCount > 0 ? "fill-foreground text-foreground" : ""}`}
                  strokeWidth={1.5}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[8px] text-background font-bold">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-foreground/50 hover:text-foreground transition-colors">
                <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[8px] text-background font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-foreground/50 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[85vw] max-w-xs bg-background flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between px-6 h-[56px] border-b border-border">
            <AurumLogo className="text-[13px]" />
            <button onClick={() => setMobileOpen(false)} className="text-foreground/40 hover:text-foreground">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-2 flex-1 overflow-y-auto">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                search={l.search}
                onClick={() => setMobileOpen(false)}
                className={`py-4 border-b border-border font-sans text-[13px] tracking-[0.1em] uppercase font-medium flex items-center justify-between ${
                  l.label === "Sale" ? "text-red-500" : "text-foreground"
                }`}
              >
                {l.label}
                <ArrowChevron />
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-8 pt-4 border-t border-border">
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3.5 text-[11px] font-sans font-medium tracking-[0.2em] uppercase"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              Your Bag {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ArrowChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-foreground/25">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
