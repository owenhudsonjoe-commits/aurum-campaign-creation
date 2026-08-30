import { useState, useMemo, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ArchFrame } from "@/components/ArchFrame";
import { formatPrice } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ShoppingBag, Heart, Flame, ArrowLeft, ChevronDown } from "lucide-react";

type SortOption = "featured" | "price-asc" | "price-desc" | "most-popular";
const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "most-popular": "Most Popular",
};

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Summer Sale — Under RS 3,000 | Maison Aurum" },
      { name: "description", content: "Shop the Maison Aurum Summer Sale — handcrafted luxury pieces all under RS 3,000." },
    ],
  }),
  component: SalePage,
});

function SalePage() {
  const { addItem } = useCart();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();
  const { products } = useCatalog();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const saleProducts = useMemo(() => {
    const base = products.filter(
      (p) => p.discountedPrice !== undefined && p.discountedPrice <= 3500
    );
    return [...base].sort((a, b) => {
      const aPrice = a.discountedPrice ?? a.price;
      const bPrice = b.discountedPrice ?? b.price;
      if (sort === "price-asc") return aPrice - bPrice;
      if (sort === "price-desc") return bPrice - aPrice;
      if (sort === "most-popular") return (b.soldCount ?? 0) - (a.soldCount ?? 0);
      return 0;
    });
  }, [products, sort]);

  function handleAdd(productId: string, e: React.MouseEvent) {
    e.preventDefault();
    const product = products.find((p) => p.id === productId)!;
    addItem(product, product.sizes[0]);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1800);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Hero banner */}
      <div className="relative pt-[100px] pb-14 overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-amber-400">
        <div className="absolute inset-0 jaali-bg opacity-5 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-red-900/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-5 py-2 mb-6">
            <Flame className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-luxe text-white font-semibold">Limited Time · گرمیوں کی سیل</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-3">
            Summer Sale
          </h1>
          <p className="font-display text-2xl md:text-4xl italic text-white/80 mb-5">Under RS 3,000</p>
          <p className="text-sm text-white/70 font-light max-w-lg">
            Handcrafted luxury at prices that feel like a secret. Every piece in this edit is under RS 3,500 — grab yours before it's gone.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-5 py-2.5">
            <span className="text-[11px] uppercase tracking-luxe text-white font-medium">{saleProducts.length} Pieces Available</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[41px] z-40 bg-ivory/97 backdrop-blur border-b border-gold/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Back to Home
          </Link>

          <div className="flex items-center gap-4">
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground hidden sm:block">
              {saleProducts.length} {saleProducts.length === 1 ? "piece" : "pieces"}
            </p>

            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-ink transition-colors border border-gold/20 px-3 py-1.5 hover:border-gold/50"
              >
                {SORT_LABELS[sort]}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-ivory border border-gold/20 shadow-luxe min-w-[180px]">
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSort(opt); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] uppercase tracking-luxe transition-colors ${
                        sort === opt ? "bg-ink text-ivory" : "text-muted-foreground hover:bg-gold/10 hover:text-ink"
                      }`}
                    >
                      {SORT_LABELS[opt]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          {saleProducts.map((product) => (
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
                      <span className="px-3 py-1 text-[9px] uppercase tracking-luxe font-medium bg-gradient-gold text-ivory">
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
                    <Heart
                      className={`h-3.5 w-3.5 transition-all ${isWishlisted(product.id) ? "fill-gold text-gold" : "text-ink"}`}
                      strokeWidth={1.5}
                    />
                  </button>

                  <button
                    onClick={(e) => handleAdd(product.id, e)}
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-luxe backdrop-blur translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap ${
                      addedId === product.id
                        ? "bg-gradient-gold text-ivory"
                        : "bg-ivory/90 text-ink hover:bg-gradient-gold hover:text-ivory"
                    }`}
                  >
                    <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
                    {addedId === product.id ? "Added ✓" : "Quick Add"}
                  </button>
                </ArchFrame>
              </Link>

              <div className="mt-5 px-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-luxe text-gold-warm truncate">{product.category}</p>
                    <Link to="/product/$slug" params={{ slug: product.slug }}>
                      <h3 className="mt-1 font-display text-lg italic text-ink leading-snug hover:text-gold transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-xl text-red-600 font-medium">
                    {formatPrice(product.discountedPrice!)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 uppercase">
                    -{product.discountPercent}%
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {product.sizes.map((s) => (
                    <span key={s} className="text-[9px] uppercase tracking-wide border border-gold/30 px-2 py-0.5 text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}
