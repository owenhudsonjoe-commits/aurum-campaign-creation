import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CreditCard, Smartphone, Building2, Package, ChevronDown, Lock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Maison Aurum" }] }),
  component: CheckoutPage,
});

type PaymentMethod = "stripe" | "jazzcash" | "easypaisa" | "bank" | "cod";

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const subtotal = total();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", province: "", postalCode: "", country: "Pakistan",
    notes: "",
    cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
    jazzNumber: "", bankRef: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory">
        <Nav />
        <div className="pt-[140px] flex flex-col items-center justify-center px-6 text-center pb-24">
          <CheckCircle2 className="h-16 w-16 text-gold mb-6" strokeWidth={1} />
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-3">Order Confirmed</p>
          <h1 className="font-display text-5xl italic text-ink mb-4">Shukria — Thank You</h1>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-2">
            Your order has been received. Our atelier team will contact you within 24 hours to confirm measurements and lead time.
          </p>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-10">
            A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-10 py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow">
            Return to Maison Aurum
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <Nav />
        <div className="pt-[140px] text-center px-6">
          <p className="font-display text-3xl italic text-muted-foreground mb-4">Your bag is empty</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-gold text-ivory px-8 py-4 text-[11px] uppercase tracking-luxe">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[100px] max-w-[1200px] mx-auto px-6 md:px-12 pb-24">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">Maison Aurum</p>
          <h1 className="font-display text-5xl italic text-ink">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Left: form */}
            <div className="space-y-10">
              {/* Contact */}
              <section>
                <h2 className="text-[11px] uppercase tracking-luxe text-ink border-b border-gold/20 pb-3 mb-6">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input-aurum" />
                  <input required name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="input-aurum" />
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="input-aurum" />
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone / WhatsApp" className="input-aurum" />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-[11px] uppercase tracking-luxe text-ink border-b border-gold/20 pb-3 mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <input required name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className="input-aurum w-full" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required name="city" value={form.city} onChange={handleChange} placeholder="City" className="input-aurum" />
                    <input name="province" value={form.province} onChange={handleChange} placeholder="Province / State" className="input-aurum" />
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="input-aurum" />
                    <select name="country" value={form.country} onChange={handleChange} className="input-aurum bg-ivory appearance-none">
                      <option>Pakistan</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>United Arab Emirates</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Special instructions, custom measurements, or notes for our atelier..." rows={3} className="input-aurum w-full resize-none" />
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-[11px] uppercase tracking-luxe text-ink border-b border-gold/20 pb-3 mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {/* Stripe */}
                  <PaymentOption
                    id="stripe" active={paymentMethod === "stripe"} onClick={() => setPaymentMethod("stripe")}
                    icon={<CreditCard className="h-4 w-4" strokeWidth={1.5} />}
                    label="Credit / Debit Card" sub="Visa, Mastercard, Amex — secured by Stripe"
                  />
                  {paymentMethod === "stripe" && (
                    <div className="border border-gold/20 p-5 ml-9 space-y-3 bg-[oklch(0.985_0.012_88)]">
                      <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Name on Card" className="input-aurum w-full" required={paymentMethod === "stripe"} />
                      <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Card Number" maxLength={19} className="input-aurum w-full" required={paymentMethod === "stripe"} />
                      <div className="grid grid-cols-2 gap-3">
                        <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM / YY" maxLength={7} className="input-aurum" required={paymentMethod === "stripe"} />
                        <input name="cardCvv" value={form.cardCvv} onChange={handleChange} placeholder="CVV" maxLength={4} className="input-aurum" required={paymentMethod === "stripe"} />
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Lock className="h-3 w-3" strokeWidth={1.5} />
                        Your payment is encrypted and processed securely by Stripe.
                      </div>
                    </div>
                  )}

                  {/* JazzCash */}
                  <PaymentOption
                    id="jazzcash" active={paymentMethod === "jazzcash"} onClick={() => setPaymentMethod("jazzcash")}
                    icon={<Smartphone className="h-4 w-4" strokeWidth={1.5} />}
                    label="JazzCash" sub="Pay via your JazzCash mobile wallet"
                  />
                  {paymentMethod === "jazzcash" && (
                    <div className="border border-gold/20 p-5 ml-9 space-y-3 bg-[oklch(0.985_0.012_88)]">
                      <input name="jazzNumber" value={form.jazzNumber} onChange={handleChange} placeholder="JazzCash Mobile Number (03XX-XXXXXXX)" className="input-aurum w-full" required={paymentMethod === "jazzcash"} />
                      <p className="text-[11px] text-muted-foreground">After placing the order, you will receive a payment request on your JazzCash number. Please approve it within 10 minutes.</p>
                    </div>
                  )}

                  {/* EasyPaisa */}
                  <PaymentOption
                    id="easypaisa" active={paymentMethod === "easypaisa"} onClick={() => setPaymentMethod("easypaisa")}
                    icon={<Smartphone className="h-4 w-4" strokeWidth={1.5} />}
                    label="EasyPaisa" sub="Pay via your EasyPaisa mobile wallet"
                  />
                  {paymentMethod === "easypaisa" && (
                    <div className="border border-gold/20 p-5 ml-9 bg-[oklch(0.985_0.012_88)]">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">After placing your order, transfer the exact amount to our EasyPaisa account. Our team will confirm receipt and begin processing within 24 hours.</p>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  <PaymentOption
                    id="bank" active={paymentMethod === "bank"} onClick={() => setPaymentMethod("bank")}
                    icon={<Building2 className="h-4 w-4" strokeWidth={1.5} />}
                    label="Bank Transfer" sub="Direct transfer to Maison Aurum account"
                  />
                  {paymentMethod === "bank" && (
                    <div className="border border-gold/20 p-5 ml-9 bg-[oklch(0.985_0.012_88)] space-y-2">
                      <p className="text-[10px] uppercase tracking-luxe text-ink mb-3">Bank Details</p>
                      {[
                        ["Bank", "Meezan Bank"],
                        ["Account Title", "Maison Aurum (Pvt.) Ltd."],
                        ["Account No.", "XXXX-XXXX-XXXX"],
                        ["IBAN", "PK00MEZN0000000000000000"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{k}</span>
                          <span className="text-ink font-medium">{v}</span>
                        </div>
                      ))}
                      <p className="text-[10px] text-muted-foreground pt-2">Please use your order number as the payment reference. Orders are confirmed upon receipt of transfer.</p>
                    </div>
                  )}

                  {/* COD */}
                  <div className="flex items-start gap-4 p-4 border border-gold/10 bg-[oklch(0.985_0.012_88)] opacity-60 cursor-not-allowed">
                    <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-gold/30 mt-0.5 shrink-0" />
                    <div className="flex items-start gap-3">
                      <Package className="h-4 w-4 mt-0.5 text-muted-foreground" strokeWidth={1.5} />
                      <div>
                        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Cash on Delivery</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Not available at this time — available after 2 successful deliveries.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: summary */}
            <div>
              <div className="border border-gold/20 p-7 sticky top-[100px]">
                <h2 className="font-display text-2xl italic text-ink mb-6">Your Order</h2>
                <div className="space-y-5 mb-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="w-16 h-20 shrink-0 overflow-hidden bg-[oklch(0.97_0.01_88)]">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display italic text-sm text-ink leading-tight">{item.product.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                        <p className="text-sm text-gradient-gold mt-1">{formatPrice(item.product.price * item.qty)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gold/20 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-gold-warm text-[11px] uppercase tracking-luxe">Complimentary</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gold/10">
                    <span className="font-medium text-ink">Total</span>
                    <span className="font-display text-2xl text-gradient-gold">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-gold text-ivory py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow"
                >
                  <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Place Order
                </button>
                <p className="mt-3 text-[10px] text-center text-muted-foreground">
                  By placing your order you agree to our Terms & Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function PaymentOption({ id, active, onClick, icon, label, sub }: {
  id: string; active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string;
}) {
  return (
    <button type="button" onClick={onClick} className={`w-full flex items-center gap-4 p-4 border text-left transition-all ${active ? "border-ink bg-[oklch(0.985_0.012_88)]" : "border-gold/20 hover:border-gold/60"}`}>
      <div className={`flex items-center justify-center h-5 w-5 rounded-full border-2 transition-all shrink-0 ${active ? "border-ink bg-ink" : "border-gold/40"}`}>
        {active && <div className="h-2 w-2 rounded-full bg-ivory" />}
      </div>
      <div className="flex items-center gap-3 flex-1">
        <span className="text-muted-foreground">{icon}</span>
        <div>
          <p className="text-[11px] uppercase tracking-luxe text-ink">{label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
        </div>
      </div>
    </button>
  );
}
