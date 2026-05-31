import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{ title: "Wishlist — Maison Aurum" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleMoveToCart(product: typeof items[0]) {
    addItem(product, product.sizes[0]);
    remove(product.id);
    const next = new Set(addedIds);
    next.add(product.id);
    setAddedIds(next);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[100px]">
        {/* Header */}
        <div className="border-b border-gold/20 bg-[oklch(0.985_0.012_88)] px-6 md:px-12 py-14 text-center">
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">Your Curation</p>
          <h1 className="font-display text-5xl italic text-ink">Wishlist</h1>
          {items.length > 0 && (
            <p className="mt-3 text-sm text-muted-foreground font-light">
              {items.length} {items.length === 1 ? "piece" : "pieces"} saved
            </p>
          )}
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-gold/40" strokeWidth={1} />
              </div>
              <h2 className="font-display text-3xl italic text-ink mb-3">Nothing saved yet</h2>
              <p className="text-sm text-muted-foreground font-light max-w-xs mb-8">
                Tap the heart on any piece you love — it will wait here for you.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-10 py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
              >
                Explore the Collection <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {items.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Image */}
                  <Link to="/product/$slug" params={{ slug: product.slug }} className="block relative overflow-hidden aspect-[3/4] bg-[oklch(0.97_0.01_88)]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className={`absolute top-4 left-4 px-3 py-1 text-[9px] uppercase tracking-luxe font-medium ${
                        product.badge === "Bestseller" || product.badge === "New"
                          ? "bg-gradient-gold text-ivory"
                          : "bg-ink/80 text-ivory"
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {product.discountPercent && (
                      <span className="absolute top-4 right-12 px-2 py-1 text-[9px] font-bold bg-red-500 text-white uppercase">
                        -{product.discountPercent}%
                      </span>
                    )}
                    {/* Remove button */}
                    <button
                      onClick={(e) => { e.preventDefault(); remove(product.id); }}
                      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-ivory/90 hover:bg-red-50 hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </Link>

                  {/* Info */}
                  <div className="mt-4">
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{product.category} · {product.fabricType}</p>
                    <Link to="/product/$slug" params={{ slug: product.slug }}>
                      <h3 className="mt-1 font-display text-lg italic text-ink hover:text-gold-warm transition-colors leading-snug">{product.name}</h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-center gap-2 flex-wrap mt-1.5">
                      {product.discountedPrice ? (
                        <>
                          <span className="font-display text-base text-red-600 font-semibold">{formatPrice(product.discountedPrice)}</span>
                          <span className="font-display text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                          <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-sm">{product.discountPercent}% OFF</span>
                        </>
                      ) : (
                        <span className="font-display text-base text-gradient-gold">{formatPrice(product.price)}</span>
                      )}
                    </div>

                    {/* Add to bag */}
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-gold/30 text-[10px] uppercase tracking-luxe text-ink hover:bg-gradient-gold hover:text-ivory hover:border-transparent transition-all duration-300"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Continue shopping */}
          {items.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-light">
                Items in your wishlist are not reserved — add to bag to secure them.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-gold-warm transition-colors border-b border-gold/30 pb-0.5 whitespace-nowrap"
              >
                Continue Shopping <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
