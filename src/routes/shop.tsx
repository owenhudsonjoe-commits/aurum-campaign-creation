import { useState, useMemo, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArchFrame } from "@/components/ArchFrame";
import { PRODUCTS, formatPrice } from "@/lib/products";
import type { FabricType, Collection } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ShoppingBag, ArrowRight, Heart, Search, X } from "lucide-react";

const FABRIC_TABS: FabricType[] = ["Stitched", "Unstitched"];
const COLLECTIONS: Collection[] = ["Bridal", "Festive / Pret", "Men's"];

const shopSearchSchema = z.object({
  collection: z.enum(["All", "Bridal", "Festive / Pret", "Men's"]).optional().default("All"),
  fabric: z.enum(["Stitched", "Unstitched"]).optional().default("Stitched"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: shopSearchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Maison Aurum" },
      { name: "description", content: "Browse Stitched & Unstitched collections — Bridal, Festive Prêt and Men's." },
    ],
  }),
  component: ShopPage,
});

const collectionMeta: Record<string, { label: string; sub: string }> = {
  All: { label: "All Collections", sub: "Every piece, every house" },
  Bridal: { label: "Bridal Couture", sub: "Shaadi · Mehndi · Walima" },
  "Festive / Pret": { label: "Festive Prêt", sub: "Eid · Mehndi · Sangeet" },
  "Men's": { label: "Maison Homme", sub: "Sherwani · Bandhgala" },
};

function ShopPage() {
  const { collection: initialCollection, fabric: initialFabric } = Route.useSearch();
  const [fabric, setFabric] = useState<FabricType>(initialFabric);
  const [activeCollection, setActiveCollection] = useState<Collection | "All">(initialCollection);
  const { addItem } = useCart();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const fabricMatch = p.fabricType === fabric;
      const colMatch = activeCollection === "All" || p.category === activeCollection;
      const searchMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.fabricType.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.details.some((d) => d.toLowerCase().includes(q));
      return fabricMatch && colMatch && searchMatch;
    });
  }, [fabric, activeCollection, query]);

  function handleAdd(productId: string, e: React.MouseEvent) {
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.id === productId)!;
    addItem(product, product.sizes[0]);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1800);
  }

  function openSearch() {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function clearSearch() {
    setQuery("");
    inputRef.current?.focus();
  }

  const meta = collectionMeta[activeCollection];

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Page header */}
      <div className="pt-[120px] pb-10 text-center bg-gradient-to-b from-[oklch(0.22_0.07_162)/6] to-transparent px-6">
        <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-3">Maison Aurum</p>
        <h1 className="font-display text-5xl md:text-7xl italic text-ink mb-2">{meta.label}</h1>
        <p className="text-sm text-muted-foreground font-light">{meta.sub}</p>
        <p className="mt-3 text-[10px] uppercase tracking-luxe text-muted-foreground/60">
          Each piece is made to order in our Lahore atelier — crafted to your measurements, finished by hand.
        </p>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[41px] z-40 bg-ivory/97 backdrop-blur border-b border-gold/20">
        {/* Fabric tabs + search toggle */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between border-b border-gold/10">
          <div className="flex">
            {FABRIC_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setFabric(tab); setActiveCollection("All"); }}
                className={`relative px-6 py-4 text-[11px] uppercase tracking-luxe transition-colors ${
                  fabric === tab ? "text-ink" : "text-muted-foreground hover:text-ink"
                }`}
              >
                {tab}
                {fabric === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Expandable search */}
            <div className={`flex items-center transition-all duration-300 ${searchOpen ? "gap-2" : "gap-0"}`}>
              {searchOpen && (
                <div className="relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products…"
                    className="w-48 md:w-64 pl-3 pr-7 py-1.5 text-[11px] border border-gold/30 bg-transparent focus:outline-none focus:border-gold text-ink placeholder:text-muted-foreground/50 transition-all"
                    onKeyDown={(e) => { if (e.key === "Escape") { setSearchOpen(false); setQuery(""); } }}
                  />
                  {query && (
                    <button onClick={clearSearch} className="absolute right-2 text-muted-foreground hover:text-ink transition-colors">
                      <X className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={() => { if (searchOpen) { setSearchOpen(false); setQuery(""); } else { openSearch(); } }}
                className="text-muted-foreground hover:text-gold transition-colors p-1"
                aria-label="Toggle search"
              >
                {searchOpen ? <X className="h-4 w-4" strokeWidth={1.2} /> : <Search className="h-4 w-4" strokeWidth={1.2} />}
              </button>
            </div>

            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground hidden sm:block">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </div>

        {/* Collection pills */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3 flex items-center gap-2 flex-wrap">
          {(["All", ...COLLECTIONS] as const).map((col) => (
            <button
              key={col}
              onClick={() => setActiveCollection(col)}
              className={`px-4 py-1.5 text-[10px] uppercase tracking-luxe border transition-all rounded-full ${
                activeCollection === col
                  ? "bg-ink text-ivory border-ink"
                  : "border-gold/30 text-muted-foreground hover:border-gold hover:text-ink"
              }`}
            >
              {col === "Festive / Pret" ? "Festive" : col}
            </button>
          ))}
        </div>
      </div>

      {/* Search results label */}
      {query && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-0">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            {filtered.length === 0
              ? `No results for "${query}"`
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
        </div>
      )}

      {/* Products grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-28 border border-gold/20">
            {query ? (
              <>
                <p className="font-display text-3xl italic text-muted-foreground mb-3">No matches found</p>
                <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
                  Try a different search term or browse all pieces below.
                </p>
                <button
                  onClick={() => { setQuery(""); setActiveCollection("All"); }}
                  className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-8 py-3.5 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
                >
                  Clear Search <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <>
                <p className="font-display text-3xl italic text-muted-foreground mb-3">Coming Soon</p>
                <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">We're adding new pieces to this collection — check back soon or explore another category.</p>
                <button
                  onClick={() => setActiveCollection("All")}
                  className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-8 py-3.5 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
                >
                  View All Pieces <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
            {filtered.map((product) => (
              <div key={product.id} className="group relative">
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                  <ArchFrame className="aspect-[3/4]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                    {product.badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`px-3 py-1 text-[9px] uppercase tracking-luxe font-medium ${
                          product.badge === "New" ? "bg-gradient-gold text-ivory" :
                          product.badge === "Limited" ? "bg-emerald-deep/90 text-gold-warm border border-gold/40" :
                          product.badge === "Bestseller" ? "bg-gradient-gold text-ivory" :
                          "bg-ink/80 text-ivory"
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {product.discountPercent && (
                      <div className="absolute top-4 right-12 z-20">
                        <span className="px-2 py-1 text-[9px] font-bold bg-red-500 text-white uppercase">
                          -{product.discountPercent}%
                        </span>
                      </div>
                    )}

                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                      className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-ivory/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-ivory"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-3.5 w-3.5 transition-all ${isWishlisted(product.id) ? "fill-gold text-gold" : "text-ink"}`} strokeWidth={1.5} />
                    </button>

                    <button
                      onClick={(e) => handleAdd(product.id, e)}
                      className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-luxe backdrop-blur translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap ${
                        addedId === product.id ? "bg-gradient-gold text-ivory" : "bg-ivory/90 text-ink hover:bg-gradient-gold hover:text-ivory"
                      }`}
                    >
                      <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
                      {addedId === product.id ? "Added ✓" : "Quick Add"}
                    </button>
                  </ArchFrame>

                  <div className="mt-4 px-1">
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{product.category} · {product.fabricType}</p>
                    <h3 className="mt-1 font-display text-lg italic text-foreground leading-snug">{product.name}</h3>
                    {product.urduName && <p className="font-urdu text-sm text-gold-warm/70 mt-0.5">{product.urduName}</p>}
                    <div className="flex items-center gap-2 flex-wrap mt-1.5">
                      {product.discountedPrice ? (
                        <>
                          <p className="font-display text-base text-red-600 font-semibold">{formatPrice(product.discountedPrice)}</p>
                          <p className="font-display text-sm text-muted-foreground line-through">{formatPrice(product.price)}</p>
                          <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-sm">{product.discountPercent}% OFF</span>
                        </>
                      ) : (
                        <p className="font-display text-base text-gradient-gold">{formatPrice(product.price)}</p>
                      )}
                    </div>
                    <p className="mt-1 text-[9px] uppercase tracking-luxe text-muted-foreground/60">{product.leadTime}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bespoke CTA */}
      <div className="border-t border-gold/20 bg-[oklch(0.22_0.07_162)] text-ivory py-16 text-center px-6">
        <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">Don't see what you're looking for?</p>
        <p className="font-display text-3xl italic mb-2">Every design can be bespoke.</p>
        <p className="text-sm text-ivory/60 mb-7 font-light max-w-md mx-auto">Commission a one-of-a-kind piece crafted to your exact measurements, fabric preferences, and vision.</p>
        <Link to="/bespoke" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-10 py-4 text-[11px] uppercase tracking-luxe text-ivory shadow-luxe hover:shadow-none transition-shadow">
          Book an Atelier Consultation <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
      <Footer />
    </div>
  );
}
