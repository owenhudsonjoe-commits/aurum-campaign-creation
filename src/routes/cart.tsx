import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — Maison Aurum" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();
  const subtotal = total();
  const shipping = 0;

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[120px] max-w-[1100px] mx-auto px-6 md:px-12 pb-24">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">Maison Aurum</p>
          <h1 className="font-display text-5xl italic text-ink">Your Bag</h1>
          <p className="text-sm text-muted-foreground mt-1">{count()} {count() === 1 ? "piece" : "pieces"}</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-28 border border-gold/20">
            <p className="font-display text-3xl italic text-muted-foreground mb-4">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mb-8">Discover our collections and find your perfect piece.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-8 py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
            >
              Explore Collections <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-12">
            {/* Items */}
            <div className="space-y-0">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-6 py-8 border-b border-gold/20">
                  <Link to="/product/$slug" params={{ slug: item.product.slug }} className="shrink-0">
                    <div className="w-28 h-36 overflow-hidden bg-[oklch(0.97_0.01_88)]">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{item.product.category}</p>
                    <h3 className="font-display text-xl italic text-ink mt-0.5">{item.product.name}</h3>
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mt-1">Size: {item.size}</p>
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground/60 mt-0.5">{item.product.leadTime}</p>

                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center gap-0 border border-gold/30">
                        <button
                          onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                          className="px-3 py-2 hover:bg-gold/10 transition-colors"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="px-4 py-2 text-sm border-x border-gold/30 min-w-[48px] text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                          className="px-3 py-2 hover:bg-gold/10 transition-colors"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-center gap-5">
                        <p className="font-display text-xl text-gradient-gold">{formatPrice(item.product.price * item.qty)}</p>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:pt-0">
              <div className="border border-gold/20 p-8 sticky top-[100px]">
                <h2 className="font-display text-2xl italic text-ink mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-gold-warm text-[11px] uppercase tracking-luxe">Complimentary</span>
                  </div>
                  <div className="border-t border-gold/20 pt-3 flex justify-between">
                    <span className="font-medium text-ink">Total</span>
                    <span className="font-display text-2xl text-gradient-gold">{formatPrice(subtotal + shipping)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-gold text-ivory py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
                >
                  Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  to="/shop"
                  className="mt-3 w-full flex items-center justify-center text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-ink transition-colors py-2"
                >
                  Continue Shopping
                </Link>
                <div className="mt-6 pt-6 border-t border-gold/10 space-y-2">
                  {["Stripe · Credit & Debit Cards", "JazzCash · EasyPaisa", "Bank Transfer"].map((m) => (
                    <p key={m} className="text-[10px] text-muted-foreground tracking-wide">{m}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
