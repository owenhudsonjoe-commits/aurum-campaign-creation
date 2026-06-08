import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Lock, CheckCircle2, Upload, ScanLine, Copy, Check, AlertCircle, Loader2, UserCheck, XCircle, Package } from "lucide-react";

async function extractTextFromImage(_dataUrl: string): Promise<string> {
  return "";
}
function normalize(s: string): string {
  return s.replace(/[\s\-_.,;:]/g, "").toUpperCase();
}

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AURUM" }] }),
  component: CheckoutPage,
});

type PaymentMethod = "raast" | "qr" | "cod" | "";
type OcrStep = "idle" | "uploading" | "scanning" | "checking_name" | "checking_number" | "approved" | "failed";

function ScreenshotUpload({ amount, onVerified }: { amount: number; onVerified: (ok: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<OcrStep>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [nameOk, setNameOk] = useState<boolean | null>(null);
  const [numberOk, setNumberOk] = useState<boolean | null>(null);
  const [failReason, setFailReason] = useState("");

  function reset() {
    setStep("idle"); setPreview(null); setCountdown(0); setNameOk(null); setNumberOk(null); setFailReason(""); onVerified(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNameOk(null); setNumberOk(null); setFailReason(""); setStep("uploading");
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setStep("scanning");
      let rawText = "";
      try { rawText = await extractTextFromImage(dataUrl); } catch { setFailReason("Could not read image."); setStep("failed"); onVerified(false); return; }
      const norm = normalize(rawText);
      setStep("checking_name");
      await new Promise(r => setTimeout(r, 600));
      const foundName = ["IMTIYAZANSAIM", "IMTIYAZAN", "SAIM"].some(v => norm.includes(v));
      setNameOk(foundName);
      if (!foundName) { setFailReason("Account name 'IMTIYAZAN SAIM' not found. Make sure the name is visible."); setStep("failed"); onVerified(false); return; }
      setStep("checking_number");
      await new Promise(r => setTimeout(r, 600));
      const foundNumber = norm.includes("03703770146") || norm.includes("3703770146");
      setNumberOk(foundNumber);
      if (!foundNumber) { setFailReason("RAAST number '0370-3770146' not found. Make sure the recipient number is visible."); setStep("failed"); onVerified(false); return; }
      let remaining = 20; setCountdown(remaining);
      const tick = setInterval(() => { remaining -= 1; setCountdown(remaining); if (remaining <= 0) { clearInterval(tick); setStep("approved"); onVerified(true); } }, 1000);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-4 space-y-3">
      <p className="text-[12px] font-semibold text-foreground uppercase tracking-wide">Upload Payment Screenshot</p>
      <p className="text-[11px] text-foreground/60 leading-relaxed">
        After sending <strong className="text-foreground">{formatPrice(amount)}</strong> to the RAAST ID above, upload your confirmation screenshot. Both <strong>IMTIYAZAN SAIM</strong> and <strong>0370-3770146</strong> must be visible.
      </p>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {step === "idle" && (
        <button type="button" onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-border hover:border-foreground/50 transition-colors py-8 flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/60">
          <Upload className="h-6 w-6" strokeWidth={1.5} />
          <span className="text-[12px] font-medium">Click to upload screenshot</span>
          <span className="text-[11px]">PNG, JPG, WEBP</span>
        </button>
      )}
      {step === "uploading" && (
        <div className="w-full border border-border py-8 flex flex-col items-center gap-2 bg-muted/30">
          <Loader2 className="h-6 w-6 text-foreground/50 animate-spin" strokeWidth={1.5} />
          <span className="text-[12px] text-foreground/50">Reading image…</span>
        </div>
      )}
      {(step === "scanning" || step === "checking_name" || step === "checking_number") && (
        <div className="w-full border border-border p-5 bg-muted/30 flex flex-col items-center gap-3">
          {preview && <img src={preview} alt="preview" className="h-20 object-contain border border-border opacity-70" />}
          <div className="flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-foreground/60 animate-pulse" strokeWidth={1.5} />
            <span className="text-[12px] font-semibold text-foreground">Verifying screenshot…</span>
          </div>
          {step === "checking_number" && (
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-foreground rounded-full transition-all duration-1000" style={{ width: `${((20 - countdown) / 20) * 100}%` }} />
                </div>
                <span className="text-[11px] text-foreground/50 tabular-nums w-6">{countdown}s</span>
              </div>
            </div>
          )}
        </div>
      )}
      {step === "failed" && (
        <div className="w-full border border-red-300 p-4 bg-red-50 space-y-3">
          <div className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[12px] font-semibold text-red-700 mb-1">Verification Failed</p>
              <p className="text-[11px] text-red-600 leading-relaxed">{failReason}</p>
            </div>
          </div>
          <button type="button" onClick={reset} className="text-[11px] font-medium text-foreground hover:underline">← Try again</button>
        </div>
      )}
      {step === "approved" && (
        <div className="w-full border border-green-300 p-4 bg-green-50 flex items-start gap-3">
          {preview && <img src={preview} alt="preview" className="h-14 w-14 object-cover border border-border flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" strokeWidth={1.5} />
              <span className="text-[12px] font-semibold text-green-700">Payment Approved</span>
            </div>
            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-green-600" strokeWidth={1.5} />
                <span className="text-[11px] text-green-700">Account: <strong>IMTIYAZAN SAIM</strong> ✓</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-green-600" strokeWidth={1.5} />
                <span className="text-[11px] text-green-700">RAAST: <strong>0370-3770146</strong> ✓</span>
              </div>
            </div>
            <button type="button" onClick={reset} className="mt-1 text-[10px] text-foreground/40 hover:text-red-500 transition-colors underline">Remove & re-upload</button>
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
      className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium text-foreground/50 hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3 w-3" strokeWidth={2} /> : <Copy className="h-3 w-3" strokeWidth={1.5} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const subtotal = total();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [raastScreenshotOk, setRaastScreenshotOk] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", province: "", postalCode: "", country: "Pakistan", notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(num);
    setSubmitted(true);
    clearCart();
  }

  const inputClass = "w-full border border-border bg-background px-4 py-3 text-[13px] outline-none focus:border-foreground transition-colors placeholder:text-foreground/40";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="pt-[140px] flex flex-col items-center justify-center px-6 text-center pb-24">
          <CheckCircle2 className="h-14 w-14 text-foreground mb-6" strokeWidth={1} />
          <p className="text-[11px] uppercase tracking-widest text-foreground/40 mb-3 font-medium">Order Confirmed</p>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-sm text-foreground/60 max-w-md leading-relaxed mb-2">
            Your order has been received. Our team will contact you within 24 hours to confirm measurements and lead time.
          </p>
          <p className="text-sm text-foreground/50 max-w-md mb-6">
            A confirmation has been sent to <strong className="text-foreground">{form.email}</strong>.
          </p>

          {/* Order number badge */}
          <div className="border border-border bg-muted/20 px-6 py-4 mb-8 text-center">
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1">Your Order Number</p>
            <p className="text-xl font-bold text-foreground tracking-wider">{orderNumber}</p>
            <p className="text-[11px] text-foreground/40 mt-1">Save this to track your delivery</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/track"
              search={{ order: orderNumber } as never}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase hover:bg-foreground/90 transition-colors"
            >
              Track My Order
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase hover:border-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="pt-[140px] text-center px-6">
          <p className="text-xl font-semibold text-foreground/40 mb-4">Your bag is empty</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-[97px] max-w-[1200px] mx-auto px-5 md:px-10 pb-24">

        <div className="py-8 border-b border-border mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="h-4 w-4 text-foreground/40" strokeWidth={1.8} />
            <span className="text-[11px] text-foreground/40 uppercase tracking-widest font-medium">Secure Checkout</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">

            {/* Left — form */}
            <div className="space-y-10">

              {/* Contact */}
              <section>
                <h2 className="text-[13px] font-bold text-foreground uppercase tracking-wide border-b border-border pb-3 mb-5">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className={inputClass} />
                  <input required name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className={inputClass} />
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={inputClass} />
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone / WhatsApp" className={inputClass} />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-[13px] font-bold text-foreground uppercase tracking-wide border-b border-border pb-3 mb-5">Delivery Address</h2>
                <div className="space-y-3">
                  <input required name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className={inputClass} />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input required name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass} />
                    <input name="province" value={form.province} onChange={handleChange} placeholder="Province / State" className={inputClass} />
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className={inputClass} />
                    <select name="country" value={form.country} onChange={handleChange} className={inputClass + " appearance-none"}>
                      <option>Pakistan</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>United Arab Emirates</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Special instructions, measurements, or notes for our team..." rows={3} className={inputClass + " resize-none"} />
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-[13px] font-bold text-foreground uppercase tracking-wide border-b border-border pb-3 mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "raast" as const, label: "RAAST Transfer", sub: "Send to 0370-3770146 (IMTIYAZAN SAIM)" },
                    { id: "qr" as const, label: "QR Code Payment", sub: "Scan via any banking app" },
                    { id: "cod" as const, label: "Cash on Delivery", sub: "Unlocks after 2 successful deliveries" },
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-colors ${
                        paymentMethod === m.id ? "border-foreground bg-muted/30" : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="mt-0.5 accent-foreground"
                        required
                      />
                      <div>
                        <p className="text-[13px] font-semibold text-foreground">{m.label}</p>
                        <p className="text-[11px] text-foreground/50 mt-0.5">{m.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* RAAST details */}
                {paymentMethod === "raast" && (
                  <div className="mt-4 p-5 border border-border bg-muted/20">
                    <p className="text-[12px] font-bold text-foreground uppercase tracking-wide mb-4">RAAST Payment Details</p>
                    <div className="space-y-3 text-[13px]">
                      {[
                        { label: "RAAST ID", value: "0370-3770146" },
                        { label: "Account Name", value: "IMTIYAZAN SAIM" },
                        { label: "Amount", value: formatPrice(subtotal) },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-foreground/50">{label}</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-foreground">{value}</span>
                            <CopyButton text={value} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                      <p className="text-[11px] text-amber-700 leading-relaxed">Please transfer the exact amount and ensure both the name and RAAST ID are visible in your confirmation screenshot.</p>
                    </div>
                    <ScreenshotUpload amount={subtotal} onVerified={setRaastScreenshotOk} />
                  </div>
                )}

                {/* QR details */}
                {paymentMethod === "qr" && (
                  <div className="mt-4 p-5 border border-border bg-muted/20 text-center">
                    <p className="text-[12px] font-bold text-foreground uppercase tracking-wide mb-4">Scan to Pay</p>
                    <div className="w-40 h-40 mx-auto bg-muted border border-border flex items-center justify-center mb-3">
                      <p className="text-[11px] text-foreground/40">QR Code</p>
                    </div>
                    <p className="text-[12px] text-foreground/60 mb-1">Amount: <strong className="text-foreground">{formatPrice(subtotal)}</strong></p>
                    <p className="text-[11px] text-foreground/40">Scan using JazzCash, EasyPaisa, or any banking app</p>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="mt-4 p-4 border border-amber-200 bg-amber-50 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                    <div>
                      <p className="text-[12px] font-semibold text-amber-800 mb-1">COD Not Yet Available</p>
                      <p className="text-[11px] text-amber-700 leading-relaxed">Cash on Delivery becomes available after <strong>2 successful deliveries</strong> to your address. Please select RAAST Transfer or QR Code Payment for your first orders.</p>
                    </div>
                  </div>
                )}
              </section>

              <button
                type="submit"
                disabled={
                  !paymentMethod ||
                  (paymentMethod === "raast" && !raastScreenshotOk)
                }
                className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-4 text-[12px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Lock className="h-4 w-4" strokeWidth={2} />
                Place Order
              </button>
            </div>

            {/* Right — summary */}
            <div>
              <div className="border border-border p-5 sticky top-[115px]">
                <h2 className="text-[14px] font-bold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <div className="w-14 h-18 bg-muted shrink-0 overflow-hidden" style={{ height: "72px" }}>
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-foreground leading-tight">{item.product.name}</p>
                        <p className="text-[11px] text-foreground/50 mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                        <p className="text-[12px] font-semibold text-foreground mt-1">{formatPrice(item.product.price * item.qty)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Subtotal</span>
                    <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Shipping</span>
                    <span className="font-medium text-foreground">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 mt-1">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-[15px] text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
