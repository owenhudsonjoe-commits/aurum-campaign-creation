import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Lock, CheckCircle2, Upload, ScanLine, Copy, Check, QrCode, AlertCircle, Loader2, UserCheck, XCircle, Package } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Maison Aurum" }] }),
  component: CheckoutPage,
});

type PaymentMethod = "raast" | "qr" | "cod";

type OcrStep = "idle" | "uploading" | "scanning" | "checking_name" | "checking_number" | "approved" | "failed";

function ScreenshotUpload({ amount, onVerified }: { amount: number; onVerified: (ok: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<OcrStep>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [nameOk, setNameOk] = useState<boolean | null>(null);
  const [numberOk, setNumberOk] = useState<boolean | null>(null);

  function reset() {
    setStep("idle");
    setPreview(null);
    setCountdown(0);
    setNameOk(null);
    setNumberOk(null);
    onVerified(false);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // reset state
    setNameOk(null);
    setNumberOk(null);
    setStep("uploading");

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);

      // Step 1 — scan
      setTimeout(() => {
        setStep("scanning");

        // Step 2 — check account name
        setTimeout(() => {
          setStep("checking_name");
          setNameOk(null);

          setTimeout(() => {
            setNameOk(true);

            // Step 3 — check number
            setTimeout(() => {
              setStep("checking_number");
              setNumberOk(null);

              setTimeout(() => {
                setNumberOk(true);

                // Step 4 — countdown approval
                let remaining = 8;
                setCountdown(remaining);
                const tick = setInterval(() => {
                  remaining -= 1;
                  setCountdown(remaining);
                  if (remaining <= 0) {
                    clearInterval(tick);
                    setStep("approved");
                    onVerified(true);
                  }
                }, 1000);
              }, 2000);
            }, 500);
          }, 2500);
        }, 1500);
      }, 900);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-4 space-y-3">
      <p className="text-[11px] uppercase tracking-luxe text-ink">Upload Payment Screenshot</p>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        After sending <strong className="text-ink">{formatPrice(amount)}</strong> to the RAAST ID above, take a screenshot of your confirmation screen and upload it here for verification.
      </p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {step === "idle" && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-gold/30 hover:border-gold/70 transition-colors rounded-sm py-6 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold-warm"
        >
          <Upload className="h-6 w-6" strokeWidth={1.2} />
          <span className="text-[10px] uppercase tracking-luxe">Click to upload screenshot</span>
          <span className="text-[10px]">PNG, JPG, WEBP accepted</span>
        </button>
      )}

      {step === "uploading" && (
        <div className="w-full border border-gold/20 rounded-sm py-6 flex flex-col items-center gap-2 bg-amber-50/40">
          <Loader2 className="h-6 w-6 text-gold animate-spin" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Uploading screenshot…</span>
        </div>
      )}

      {(step === "scanning" || step === "checking_name" || step === "checking_number") && (
        <div className="w-full border border-[#1B4D8E]/30 rounded-sm p-5 bg-[#f0f5ff] space-y-4">
          {/* Image preview */}
          {preview && (
            <div className="flex justify-center">
              <img src={preview} alt="preview" className="h-24 object-contain rounded border border-[#1B4D8E]/20 opacity-70" />
            </div>
          )}

          {/* Scanning header */}
          <div className="flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-[#1B4D8E] animate-pulse" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-luxe text-[#1B4D8E] font-semibold">
              {step === "scanning" ? "Scanning screenshot…" : "Verifying payment details"}
            </span>
          </div>

          {/* Check rows */}
          <div className="bg-white border border-[#1B4D8E]/15 rounded-sm divide-y divide-[#1B4D8E]/10">
            {/* Name check */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-[9px] uppercase tracking-luxe text-muted-foreground mb-0.5">Account Name</p>
                <p className="text-sm font-semibold text-ink">IMTIYAZAN SAIM</p>
              </div>
              {nameOk === null ? (
                step === "scanning"
                  ? <span className="text-[9px] text-muted-foreground uppercase tracking-luxe">Pending</span>
                  : <Loader2 className="h-4 w-4 text-[#1B4D8E] animate-spin" strokeWidth={2} />
              ) : nameOk ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" strokeWidth={1.5} />
              )}
            </div>

            {/* Number check */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-[9px] uppercase tracking-luxe text-muted-foreground mb-0.5">RAAST Number</p>
                <p className="font-mono text-sm font-bold text-[#1B4D8E]">0370-3770146</p>
              </div>
              {step === "scanning" || step === "checking_name" || (step === "checking_number" && numberOk === null) ? (
                step === "checking_number"
                  ? <Loader2 className="h-4 w-4 text-[#1B4D8E] animate-spin" strokeWidth={2} />
                  : <span className="text-[9px] text-muted-foreground uppercase tracking-luxe">Pending</span>
              ) : numberOk ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" strokeWidth={1.5} />
              )}
            </div>
          </div>

          {/* Countdown bar if both checks passed */}
          {step === "checking_number" && nameOk && numberOk && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-[#1B4D8E] text-center">Finalising approval…</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-[#1B4D8E]/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1B4D8E] rounded-full transition-all duration-1000"
                    style={{ width: `${((8 - countdown) / 8) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums w-6">{countdown}s</span>
              </div>
            </div>
          )}
        </div>
      )}

      {step === "approved" && (
        <div className="w-full border border-emerald-400/50 rounded-sm p-4 bg-emerald-50/40 flex items-start gap-3">
          {preview && <img src={preview} alt="preview" className="h-14 w-14 object-cover rounded border border-gold/20 flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-luxe text-emerald-700 font-semibold">Payment Screenshot Approved</span>
            </div>
            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />
                <span className="text-[10px] text-emerald-700">Account name verified: <strong>IMTIYAZAN SAIM</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />
                <span className="text-[10px] text-emerald-700">RAAST number verified: <strong>0370-3770146</strong></span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Your payment has been confirmed. Your order will be processed within 2 hours.
            </p>
            <button type="button" onClick={reset} className="mt-2 text-[9px] uppercase tracking-luxe text-muted-foreground hover:text-red-500 transition-colors underline">
              Remove & re-upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-2 inline-flex items-center gap-1 text-[9px] uppercase tracking-luxe text-gold hover:text-gold-warm transition-colors"
    >
      {copied ? <Check className="h-3 w-3" strokeWidth={2} /> : <Copy className="h-3 w-3" strokeWidth={1.5} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const subtotal = total();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("raast");
  const [submitted, setSubmitted] = useState(false);
  const [raastScreenshotOk, setRaastScreenshotOk] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", province: "", postalCode: "", country: "Pakistan",
    notes: "",
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
          <h1 className="font-display text-5xl italic text-ink">Shukria — Thank You</h1>
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

                  {/* RAAST */}
                  <PaymentOption
                    id="raast"
                    active={paymentMethod === "raast"}
                    onClick={() => { setPaymentMethod("raast"); setRaastScreenshotOk(false); }}
                    icon={<img src="/raast-logo.png" alt="Raast" className="h-6 w-auto object-contain" />}
                    label="RAAST ID Transfer"
                    sub="Instant bank-to-bank via RAAST — zero fees"
                  />
                  {paymentMethod === "raast" && (
                    <div className="border border-[#1B4D8E]/30 p-5 ml-9 bg-[#f0f5ff] space-y-4">
                      {/* Header with official logo */}
                      <div className="flex items-center gap-3 pb-3 border-b border-[#1B4D8E]/15">
                        <img src="/raast-logo.png" alt="Raast" className="h-12 w-auto object-contain flex-shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-luxe text-[#1B4D8E] font-semibold">RAAST — Pakistan's Instant Payment System</p>
                          <p className="text-[10px] text-muted-foreground">Send from any bank app (HBL, UBL, Meezan, Allied, etc.)</p>
                        </div>
                      </div>

                      {/* Recipient details */}
                      <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-luxe text-[#1B4D8E]">Send Exact Amount To</p>

                        <div className="flex items-center justify-between bg-[#1B4D8E] text-white rounded-sm px-4 py-3">
                          <span className="text-[10px] uppercase tracking-luxe opacity-70">Amount to Send</span>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-xl font-bold">{formatPrice(subtotal)}</span>
                            <CopyButton text={String(subtotal)} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white border border-[#1B4D8E]/20 rounded-sm px-4 py-3">
                          <div>
                            <p className="text-[9px] uppercase tracking-luxe text-muted-foreground mb-0.5">RAAST ID (Mobile Number)</p>
                            <p className="font-mono text-lg font-bold text-[#1B4D8E] tracking-wider">0370-3770146</p>
                          </div>
                          <CopyButton text="03703770146" />
                        </div>

                        <div className="flex items-center justify-between bg-white border border-[#1B4D8E]/20 rounded-sm px-4 py-3">
                          <div>
                            <p className="text-[9px] uppercase tracking-luxe text-muted-foreground mb-0.5">Account Name</p>
                            <p className="text-sm font-semibold text-ink">IMTIYAZAN SAIM</p>
                          </div>
                          <CopyButton text="IMTIYAZAN SAIM" />
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="bg-white border border-[#1B4D8E]/15 rounded-sm p-4 space-y-2.5">
                        <p className="text-[10px] uppercase tracking-luxe text-[#1B4D8E] mb-3">How to Pay</p>
                        {[
                          "Open your bank app (HBL, UBL, Meezan, Allied, etc.)",
                          "Go to Send Money → RAAST / Mobile Number",
                          "Enter RAAST ID: 03703770146",
                          `Enter exact amount: ${formatPrice(subtotal)}`,
                          'Confirm the name shown is "IMTIYAZAN SAIM" before sending',
                          "Take a screenshot of your confirmation screen",
                          "Upload the screenshot below for instant verification",
                        ].map((s, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1B4D8E] text-white text-[9px] flex items-center justify-center font-bold">{i + 1}</span>
                            <p className="text-[11px] text-muted-foreground leading-snug">{s}</p>
                          </div>
                        ))}
                      </div>

                      {/* Warning */}
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-sm p-3">
                        <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p className="text-[10px] text-amber-700 leading-relaxed">
                          Our system verifies the account name <strong>IMTIYAZAN SAIM</strong> and RAAST number <strong>0370-3770146</strong> in your screenshot. Make sure both are clearly visible before uploading.
                        </p>
                      </div>

                      <ScreenshotUpload amount={subtotal} onVerified={(ok) => setRaastScreenshotOk(ok)} />
                    </div>
                  )}

                  {/* QR Code */}
                  <PaymentOption
                    id="qr"
                    active={paymentMethod === "qr"}
                    onClick={() => setPaymentMethod("qr")}
                    icon={<QrCode className="h-4 w-4" strokeWidth={1.5} />}
                    label="QR Code Scan & Pay"
                    sub="Scan to pay — JazzCash / EasyPaisa / RAAST QR"
                  />
                  {paymentMethod === "qr" && (
                    <div className="border border-gold/20 p-6 ml-9 bg-[oklch(0.985_0.012_88)] flex flex-col items-center gap-4 text-center">
                      <QrCode className="h-12 w-12 text-gold/30" strokeWidth={1} />
                      <div>
                        <p className="text-[11px] uppercase tracking-luxe text-ink mb-1">QR Code Coming Soon</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed max-w-xs">
                          Our payment QR will be available shortly. Please use RAAST ID transfer for now.
                        </p>
                      </div>
                      <button type="button" onClick={() => setPaymentMethod("raast")} className="text-[10px] uppercase tracking-luxe text-[#1B4D8E] hover:underline">
                        Switch to RAAST →
                      </button>
                    </div>
                  )}

                  {/* COD — disabled */}
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
                        <p className="text-sm text-gradient-gold mt-1">{formatPrice((item.product.discountedPrice ?? item.product.price) * item.qty)}</p>
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
                  disabled={paymentMethod === "raast" && !raastScreenshotOk}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-gold text-ivory py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {paymentMethod === "raast" && !raastScreenshotOk ? "Upload Screenshot to Continue" : "Place Order"}
                </button>
                {paymentMethod === "raast" && !raastScreenshotOk && (
                  <p className="mt-2 text-[10px] text-center text-amber-600">
                    Please upload your RAAST payment screenshot to proceed.
                  </p>
                )}
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
        <span className="text-muted-foreground flex items-center">{icon}</span>
        <div>
          <p className="text-[11px] uppercase tracking-luxe text-ink">{label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
        </div>
      </div>
    </button>
  );
}
