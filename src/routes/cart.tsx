import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Trash2, Plus, Minus, ArrowRight, Gift, Shield, Truck, Tag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — AURUM" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();
  const subtotal = total();
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
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-[97px] max-w-[1200px] mx-auto px-5 md:px-10 pb-24">

        <div className="py-8 border-b border-border mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Your Bag</h1>
          <p className="text-sm text-foreground/50 mt-1">
            {count()} {count() === 1 ? "item" : "items"} · All items are made to order
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 border border-border">
            <ShoppingBagIcon />
            <p className="text-xl font-semibold text-foreground/40 mb-2 mt-6">Your bag is empty</p>
            <p className="text-sm text-foreground/40 mb-8 max-w-xs mx-auto">Discover our collections and find your perfect piece.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase hover:bg-foreground/90 transition-colors">
              Shop Now <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-12">

            {/* Items */}
            <div>
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-5 py-6 border-b border-border">
                  <Link to="/product/$slug" params={{ slug: item.product.slug }} className="shrink-0">
                    <div className="w-24 h-32 overflow-hidden bg-muted">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-medium">{item.product.category}</p>
                        <h3 className="text-[14px] font-semibold text-foreground mt-0.5">{item.product.name}</h3>
                        <p className="text-[12px] text-foreground/50 mt-1">Size: {item.size} · {item.product.leadTime}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-foreground/30 hover:text-red-500 transition-colors shrink-0 mt-0.5"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)} className="px-3 py-2 hover:bg-muted transition-colors">
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="px-4 py-2 text-[13px] border-x border-border min-w-[44px] text-center font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)} className="px-3 py-2 hover:bg-muted transition-colors">
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                      <p className="text-[14px] font-semibold text-foreground">{formatPrice(item.product.price * item.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift wrapping */}
              <div className="mt-5 p-4 border border-border flex items-start gap-4">
                <input
                  type="checkbox"
                  id="gift-wrap"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-0.5 accent-foreground"
                />
                <label htmlFor="gift-wrap" className="cursor-pointer flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="h-4 w-4 text-foreground/50" strokeWidth={1.8} />
                    <span className="text-[12px] font-semibold text-foreground">Signature Gift Wrapping</span>
                    <span className="ml-auto text-[12px] text-foreground/50">{formatPrice(giftWrapFee)}</span>
                  </div>
                  <p className="text-[11px] text-foreground/50 leading-relaxed">
                    Your order arrives in our signature trunk, lined with rose silk, with a handwritten card.
                  </p>
                </label>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="border border-border p-6 sticky top-[115px]">
                <h2 className="text-[15px] font-bold text-foreground mb-5">Order Summary</h2>

                <div className="space-y-3 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Subtotal ({count()} items)</span>
                    <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Gift Wrapping</span>
                      <span className="text-foreground font-medium">{formatPrice(giftWrapFee)}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-green-700">
                      <span>Promo (AURUM10)</span>
                      <span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Shipping</span>
                    <span className="text-foreground font-medium text-[12px]">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-[16px] text-foreground">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Promo */}
                <form onSubmit={applyPromo} className="mt-5 flex gap-0">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" strokeWidth={1.8} />
                    <input
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                      placeholder="Promo code"
                      disabled={promoApplied}
                      className={`w-full border ${promoError ? "border-red-400" : "border-border"} pl-9 pr-3 py-2.5 text-[12px] bg-background focus:outline-none focus:border-foreground transition-colors disabled:opacity-50`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={promoApplied || !promoCode}
                    className="px-4 py-2.5 bg-foreground text-background text-[11px] font-semibold uppercase tracking-widest hover:bg-foreground/80 transition-colors disabled:opacity-40"
                  >
                    {promoApplied ? "✓" : "Apply"}
                  </button>
                </form>
                {promoError && <p className="mt-1.5 text-[11px] text-red-500">Invalid code. Try AURUM10 for 10% off.</p>}
                {promoApplied && <p className="mt-1.5 text-[11px] text-green-600">10% discount applied!</p>}

                <Link
                  to="/checkout"
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-foreground text-background py-3.5 text-[12px] font-semibold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                >
                  Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
                <Link
                  to="/shop"
                  className="mt-3 w-full flex items-center justify-center text-[12px] text-foreground/50 hover:text-foreground transition-colors py-2"
                >
                  Continue Shopping
                </Link>

                {/* Trust */}
                <div className="mt-5 pt-5 border-t border-border space-y-3">
                  {[
                    { icon: Truck, label: "Free worldwide shipping" },
                    { icon: Shield, label: "Secure checkout" },
                    { icon: Gift, label: "Signature packaging available" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-[11px] text-foreground/50">
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2 font-medium">We Accept</p>
                  <div className="flex flex-wrap gap-2">
                    {["Visa", "Mastercard", "JazzCash", "EasyPaisa", "Bank Transfer"].map((m) => (
                      <span key={m} className="px-2.5 py-1 border border-border text-[10px] text-foreground/50">{m}</span>
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

function ShoppingBagIcon() {
  return (
    <div className="w-14 h-14 mx-auto border border-border flex items-center justify-center">
      <svg className="w-6 h-6 text-foreground/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>
  );
}
