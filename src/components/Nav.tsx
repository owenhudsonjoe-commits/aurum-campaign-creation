import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AurumLogo } from "./AurumLogo";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

const navLinks = [
  { label: "Bridal", href: "/shop", search: { collection: "Bridal" as const, fabric: "Stitched" as const } },
  { label: "Festive", href: "/shop", search: { collection: "Festive / Pret" as const, fabric: "Stitched" as const } },
  { label: "Daily Wear", href: "/shop", search: { collection: "Daily Wear" as const, fabric: "Stitched" as const } },
  { label: "Men's", href: "/shop", search: { collection: "Men's" as const, fabric: "Stitched" as const } },
  { label: "Bespoke", href: "/bespoke", search: undefined },
  { label: "Sale", href: "/sale", search: undefined },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const wishlistCount = useWishlist((s) => s.count());

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
      {/* Announcement bar */}
      <div className="fixed inset-x-0 top-0 z-50 bg-foreground text-background py-2.5 px-4 text-center text-[11px] tracking-widest uppercase">
        Free shipping on orders over RS 5,000
      </div>

      <header
        className={`fixed inset-x-0 top-[41px] z-50 bg-background transition-shadow duration-300 ${
          scrolled ? "border-b border-border shadow-sm" : "border-b border-border"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 h-14">

          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.slice(0, 4).map((l) => (
              <Link
                key={l.label}
                to={l.href}
                search={l.search}
                className="text-[12px] font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo — centered */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <AurumLogo className="text-lg" />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-5 ml-auto">
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.slice(4).map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  search={l.search}
                  className={`text-[12px] font-medium tracking-wide transition-colors ${
                    l.label === "Sale"
                      ? "text-red-600 hover:text-red-700"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/shop" className="hidden md:block text-foreground/60 hover:text-foreground transition-colors">
                <Search className="h-4 w-4" strokeWidth={1.8} />
              </Link>
              <Link to="/wishlist" className="relative text-foreground/60 hover:text-foreground transition-colors">
                <Heart
                  className={`h-4 w-4 ${wishlistCount > 0 ? "fill-foreground text-foreground" : ""}`}
                  strokeWidth={1.8}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[8px] text-background font-bold">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-foreground/60 hover:text-foreground transition-colors">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[8px] text-background font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[85vw] max-w-xs bg-background flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between px-6 h-14 border-b border-border">
            <AurumLogo className="text-base" />
            <button onClick={() => setMobileOpen(false)} className="text-foreground/50 hover:text-foreground">
              <X className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4 flex-1 overflow-y-auto">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                search={l.search}
                onClick={() => setMobileOpen(false)}
                className={`py-4 border-b border-border text-[15px] font-medium flex items-center justify-between ${
                  l.label === "Sale" ? "text-red-600" : "text-foreground"
                }`}
              >
                {l.label}
                <span className="text-foreground/30">›</span>
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-8 pt-4 border-t border-border">
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 text-[12px] font-medium tracking-widest uppercase"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
              Your Bag {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
