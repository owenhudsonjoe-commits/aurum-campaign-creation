import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Nav } from "@/components/Nav";
import { ArchFrame } from "@/components/ArchFrame";
import { PRODUCTS, formatPrice } from "@/lib/products";
import type { FabricType, Collection } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react";

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

function ShopPage() {
  const { collection: initialCollection, fabric: initialFabric } = Route.useSearch();
  const [fabric, setFabric] = useState<FabricType>(initialFabric);
  const [activeCollection, setActiveCollection] = useState<Collection | "All">(initialCollection);
  const [filterOpen, setFilterOpen] = useState(false);
  const { addItem, count } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const fabricMatch = p.fabricType === fabric;
      const colMatch = activeCollection === "All" || p.category === activeCollection;
      return fabricMatch && colMatch;
    });
  }, [fabric, activeCollection]);

  function handleAdd(productId: string, e: React.MouseEvent) {
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.id === productId)!;
    addItem(product, product.sizes[0]);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1800);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Page header */}
      <div className="pt-[120px] pb-12 text-center bg-gradient-to-b from-[oklch(0.22_0.07_162)/8] to-transparent">
        <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-3">Maison Aurum</p>
        <h1 className="font-display text-5xl md:text-7xl italic text-ink mb-4">The Collections</h1>
        <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
          Each piece is made to order in our Lahore atelier — crafted to your measurements, finished by hand.
        </p>
      </div>

      {/* Fabric type tabs */}
      <div className="sticky top-[41px] z-40 bg-ivory/95 backdrop-blur border-b border-gold/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-0">
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
                {fabric === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-ink transition-colors py-4"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
            Filter
          </button>
        </div>

        {/* Collection filter row */}
        {filterOpen && (
          <div className="border-t border-gold/10 bg-ivory">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3 flex items-center gap-3 flex-wrap">
              <span className="text-[10px] uppercase tracking-luxe text-muted-foreground mr-2">Collection:</span>
              {(["All", ...COLLECTIONS] as const).map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-4 py-1.5 text-[10px] uppercase tracking-luxe border transition-all ${
                    activeCollection === col
                      ? "bg-ink text-ivory border-ink"
                      : "border-gold/30 text-muted-foreground hover:border-gold hover:text-ink"
                  }`}
                >
                  {col}
                </button>
              ))}
              <button onClick={() => setFilterOpen(false)} className="ml-auto text-muted-foreground hover:text-ink">
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl italic text-muted-foreground mb-3">Coming Soon</p>
            <p className="text-sm text-muted-foreground">We're adding pieces to this collection — check back soon.</p>
          </div>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-10">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} · {fabric} · {activeCollection === "All" ? "All Collections" : activeCollection}
            </p>
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
                      <button
                        onClick={(e) => handleAdd(product.id, e)}
                        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-luxe backdrop-blur translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap ${
                          addedId === product.id ? "bg-gradient-gold text-ivory" : "bg-ivory/90 text-ink hover:bg-gradient-gold hover:text-ivory"
                        }`}
                      >
                        <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
                        {addedId === product.id ? "Added" : "Add to Bag"}
                      </button>
                    </ArchFrame>
                    <div className="mt-4 px-1">
                      <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{product.category} · {product.fabricType}</p>
                      <h3 className="mt-1 font-display text-lg italic text-foreground leading-snug">{product.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="font-display text-base text-gradient-gold">{formatPrice(product.price)}</p>
                      </div>
                      <p className="mt-1 text-[9px] uppercase tracking-luxe text-muted-foreground/60">{product.leadTime}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer strip */}
      <div className="border-t border-gold/20 bg-[oklch(0.22_0.07_162)] text-ivory py-10 text-center">
        <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">Need something bespoke?</p>
        <p className="font-display text-2xl italic mb-5">Every design can be customised.</p>
        <Link to="/bespoke" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3 text-[10px] uppercase tracking-luxe text-gold-warm hover:bg-gold/10 transition-colors">
          Book an Atelier Consultation
        </Link>
      </div>
    </div>
  );
}
