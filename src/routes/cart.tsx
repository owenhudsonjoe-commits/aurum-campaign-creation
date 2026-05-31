import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Trash2, Plus, Minus, ArrowRight, Gift, Shield, Truck, Tag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — Maison Aurum" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();
  const subtotal = total();
  const shipping = 0;
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const giftWrapFee = 2500;

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (promoCode.toUpperCase() === "AURUM10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  }

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal - discount + (giftWrap ? giftWrapFee : 0);

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[120px] max-w-[1200px] mx-auto px-6 md:px-12 pb-24">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">Maison Aurum</p>
          <h1 className="font-display text-5xl italic text-ink">Your Bag</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {count()} {count() === 1 ? "piece" : "pieces"} · All items are made to order
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-28 border border-gold/20">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold/50" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <p className="font-display text-3xl italic text-muted-foreground mb-2">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto font-light">Discover our collections and find your perfect piece, made to order just for you.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-10 py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow">
              Explore Collections <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-14">
            {/* Items */}
            <div>
              <div className="space-y-0">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-6 py-8 border-b border-gold/20 group">
                    <Link to="/product/$slug" params={{ slug: item.product.slug }} className="shrink-0">
                      <div className="w-28 h-36 overflow-hidden bg-[oklch(0.97_0.01_88)] group-hover:opacity-90 transition-opacity">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{item.product.category} · {item.product.fabricType}</p>
                          <h3 className="font-display text-xl italic text-ink mt-0.5">{item.product.name}</h3>
                          {item.product.urduName && <p className="font-urdu text-sm text-gold-warm/70 mt-0.5">{item.product.urduName}</p>}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-muted-foreground/40 hover:text-red-400 transition-colors mt-1 shrink-0"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-[10px] uppercase tracking-luxe text-muted-foreground">
                        <span>Size: <span className="text-ink">{item.size}</span></span>
                        <span>Lead time: <span className="text-ink">{item.product.leadTime}</span></span>
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center border border-gold/30">
                          <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)} className="px-3 py-2 hover:bg-gold/10 transition-colors">
                            <Minus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                          <span className="px-4 py-2 text-sm border-x border-gold/30 min-w-[48px] text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)} className="px-3 py-2 hover:bg-gold/10 transition-colors">
                            <Plus className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="font-display text-xl text-gradient-gold">{formatPrice(item.product.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift wrapping */}
              <div className="mt-6 p-5 border border-gold/20 bg-amber-50/40 flex items-start gap-4">
                <input
                  type="checkbox"
                  id="gift-wrap"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-0.5 accent-[#b8860b]"
                />
                <label htmlFor="gift-wrap" className="cursor-pointer flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    <span className="text-[11px] uppercase tracking-luxe text-ink">Signature Gift Wrapping</span>
                    <span className="ml-auto text-[11px] text-muted-foreground">{formatPrice(giftWrapFee)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Your order arrives in our signature emerald trunk, lined with rose silk, with a handwritten card from our atelier.
                  </p>
                </label>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="border border-gold/20 p-8 sticky top-[100px]">
                <h2 className="font-display text-2xl italic text-ink mb-6">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({count()} pieces)</span>
                    <span className="text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gift Wrapping</span>
                      <span className="text-ink">{formatPrice(giftWrapFee)}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo (AURUM10)</span>
                      <span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Worldwide Shipping</span>
                    <span className="text-gold-warm text-[11px] uppercase tracking-luxe">Complimentary</span>
                  </div>
                  <div className="border-t border-gold/20 pt-3 flex justify-between">
                    <span className="font-medium text-ink">Total</span>
                    <span className="font-display text-2xl text-gradient-gold">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Promo code */}
                <form onSubmit={applyPromo} className="mt-5">
                  <div className="flex gap-0">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <input
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                        placeholder="Promo code"
                        disabled={promoApplied}
                        className={`w-full border ${promoError ? "border-red-300" : "border-gold/30"} pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors disabled:opacity-50`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode}
                      className="px-4 py-2.5 bg-ink text-ivory text-[10px] uppercase tracking-luxe hover:bg-ink/80 transition-colors disabled:opacity-40"
                    >
                      {promoApplied ? "Applied ✓" : "Apply"}
                    </button>
                  </div>
                  {promoError && <p className="mt-1.5 text-[11px] text-red-500">Invalid promo code. Try AURUM10 for 10% off.</p>}
                </form>

                <Link
                  to="/checkout"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-gold text-ivory py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
                >
                  Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  to="/shop"
                  className="mt-3 w-full flex items-center justify-center text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-ink transition-colors py-2"
                >
                  Continue Shopping
                </Link>

                {/* Trust icons */}
                <div className="mt-6 pt-6 border-t border-gold/10 space-y-3">
                  {[
                    { icon: Truck, label: "Complimentary worldwide shipping" },
                    { icon: Shield, label: "Secure payment · All methods accepted" },
                    { icon: Gift, label: "Signature packaging on every order" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-[10px] text-muted-foreground">
                      <Icon className="h-3.5 w-3.5 text-gold/60 shrink-0" strokeWidth={1.5} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-gold/10">
                  <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">We Accept</p>
                  <div className="flex flex-wrap gap-2">
                    {["Visa", "Mastercard", "JazzCash", "EasyPaisa", "Bank Transfer"].map((m) => (
                      <span key={m} className="px-2.5 py-1 border border-gold/20 text-[9px] text-muted-foreground tracking-wide">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
