import { useState, useMemo, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PRODUCTS, formatPrice } from "@/lib/products";
import type { FabricType, Collection } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ShoppingBag, ArrowRight, Heart, Search, X, ChevronDown } from "lucide-react";

type SortOption = "featured" | "price-asc" | "price-desc" | "most-popular";
const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "most-popular": "Most Popular",
};

const FABRIC_TABS: FabricType[] = ["Stitched", "Unstitched"];
const COLLECTIONS: Collection[] = ["Bridal", "Festive / Pret", "Daily Wear", "Men's"];

const shopSearchSchema = z.object({
  collection: z.enum(["All", "Bridal", "Festive / Pret", "Daily Wear", "Men's"]).optional().default("All"),
  fabric: z.enum(["Stitched", "Unstitched"]).optional().default("Stitched"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: shopSearchSchema,
  head: () => ({
    meta: [
      { title: "Shop — AURUM" },
      { name: "description", content: "Browse Stitched & Unstitched collections — Bridal, Festive Prêt and Men's." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { collection: activeCollection, fabric } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { addItem } = useCart();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();

  function setFabric(tab: FabricType) {
    navigate({ search: { fabric: tab, collection: "All" } });
  }
  function setActiveCollection(col: Collection | "All") {
    navigate({ search: (prev) => ({ ...prev, collection: col }) });
  }
  const [addedId, setAddedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = PRODUCTS.filter((p) => {
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
    return [...result].sort((a, b) => {
      const aPrice = a.discountedPrice ?? a.price;
      const bPrice = b.discountedPrice ?? b.price;
      if (sort === "price-asc") return aPrice - bPrice;
      if (sort === "price-desc") return bPrice - aPrice;
      if (sort === "most-popular") return (b.soldCount ?? 0) - (a.soldCount ?? 0);
      return 0;
    });
  }, [fabric, activeCollection, query, sort]);

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

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Page header */}
      <div className="pt-[97px] border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8">
          <p className="font-sans text-[9px] tracking-[0.35em] uppercase font-medium mb-2" style={{ color: "var(--gold)" }}>AURUM</p>
          <h1 className="font-display font-light text-3xl md:text-4xl text-foreground">
            {activeCollection === "All" ? "All Collections" : activeCollection}
          </h1>
          <p className="font-sans text-[11px] text-foreground/40 mt-1.5">{filtered.length} products</p>
        </div>

        {/* Filter bar */}
        <div className="sticky top-[97px] z-40 bg-background border-b border-border">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-12">
            {/* Fabric tabs */}
            <div className="flex items-center h-full">
              {FABRIC_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setFabric(tab); setActiveCollection("All"); }}
                  className={`h-full px-5 text-[12px] font-medium border-b-2 transition-colors ${
                    fabric === tab
                      ? "border-foreground text-foreground"
                      : "border-transparent text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <div className="h-4 w-px bg-border mx-2" />
              {(["All", ...COLLECTIONS] as const).map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`h-full px-4 text-[12px] font-medium border-b-2 transition-colors hidden md:block ${
                    activeCollection === col
                      ? "border-foreground text-foreground"
                      : "border-transparent text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {col === "Festive / Pret" ? "Festive" : col}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-[12px] text-foreground/60 hover:text-foreground transition-colors"
                >
                  Sort: {SORT_LABELS[sort]}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} strokeWidth={2} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50 bg-background border border-border shadow-lg min-w-[180px]">
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSort(opt); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-[12px] transition-colors ${
                          sort === opt ? "bg-foreground text-background" : "text-foreground/70 hover:bg-muted"
                        }`}
                      >
                        {SORT_LABELS[opt]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="flex items-center gap-2">
                {searchOpen && (
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search…"
                      className="w-36 md:w-48 pl-3 pr-7 py-1.5 text-[12px] border border-border bg-background focus:outline-none focus:border-foreground text-foreground placeholder:text-foreground/40 transition-colors"
                      onKeyDown={(e) => { if (e.key === "Escape") { setSearchOpen(false); setQuery(""); } }}
                    />
                    {query && (
                      <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground">
                        <X className="h-3 w-3" strokeWidth={2} />
                      </button>
                    )}
                  </div>
                )}
                <button
                  onClick={() => { if (searchOpen) { setSearchOpen(false); setQuery(""); } else { openSearch(); } }}
                  className="text-foreground/50 hover:text-foreground transition-colors"
                >
                  {searchOpen ? <X className="h-4 w-4" strokeWidth={2} /> : <Search className="h-4 w-4" strokeWidth={2} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile collection pills */}
          <div className="md:hidden flex items-center gap-2 px-5 py-2.5 overflow-x-auto scrollbar-hide">
            {(["All", ...COLLECTIONS] as const).map((col) => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`flex-shrink-0 px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                  activeCollection === col
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-foreground/60 hover:text-foreground"
                }`}
              >
                {col === "Festive / Pret" ? "Festive" : col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8">
        {query && (
          <p className="text-sm text-foreground/50 mb-6">
            {filtered.length === 0 ? `No results for "${query}"` : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-24 border border-border">
            <p className="text-xl font-semibold text-foreground/40 mb-2">No products found</p>
            <p className="text-sm text-foreground/40 mb-6">Try a different category or clear your search.</p>
            <button
              onClick={() => { setQuery(""); setActiveCollection("All"); }}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-[12px] font-medium tracking-widest uppercase"
            >
              Clear Filters <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {filtered.map((product) => (
              <div key={product.id} className="group relative">
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                  <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badges */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-foreground text-background text-[9px] font-semibold uppercase tracking-widest px-2 py-1">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    {product.discountPercent && (
                      <div className="absolute top-3 right-10 z-20">
                        <span className="bg-red-600 text-white text-[9px] font-bold uppercase px-2 py-1">
                          -{product.discountPercent}%
                        </span>
                      </div>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                      className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-3.5 w-3.5 ${isWishlisted(product.id) ? "fill-foreground text-foreground" : "text-foreground"}`} strokeWidth={1.5} />
                    </button>

                    {/* Quick add */}
                    <button
                      onClick={(e) => handleAdd(product.id, e)}
                      className={`absolute bottom-0 inset-x-0 z-20 flex items-center justify-center gap-2 py-3 text-[11px] font-semibold uppercase tracking-widest translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
                        addedId === product.id
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground hover:bg-foreground hover:text-background"
                      }`}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
                      {addedId === product.id ? "Added ✓" : "Quick Add"}
                    </button>
                  </div>

                  <div className="mt-3">
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-medium">{product.category}</p>
                    <h3 className="mt-0.5 text-[13px] font-medium text-foreground leading-snug group-hover:text-foreground/60 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {product.discountedPrice ? (
                        <>
                          <p className="text-[13px] font-semibold text-red-600">{formatPrice(product.discountedPrice)}</p>
                          <p className="text-[12px] text-foreground/40 line-through">{formatPrice(product.price)}</p>
                        </>
                      ) : (
                        <p className="text-[13px] font-medium text-foreground">{formatPrice(product.price)}</p>
                      )}
                    </div>
                    <p className="text-[10px] text-foreground/40 mt-0.5">{product.leadTime}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bespoke CTA */}
      <div className="border-t border-border bg-foreground text-background py-14 text-center px-6">
        <p className="text-[11px] tracking-widest uppercase text-background/50 mb-2 font-medium">Can't find what you need?</p>
        <h2 className="text-2xl font-bold mb-2">Every design can be bespoke.</h2>
        <p className="text-sm text-background/60 mb-7 max-w-md mx-auto">Commission a one-of-a-kind piece crafted to your exact measurements, fabric preferences, and vision.</p>
        <Link to="/bespoke" className="inline-flex items-center gap-2 border border-background text-background px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase hover:bg-background hover:text-foreground transition-colors">
          Book a Consultation <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
      <Footer />
    </div>
  );
}
