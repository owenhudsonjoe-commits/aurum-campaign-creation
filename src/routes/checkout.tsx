import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Lock, CheckCircle2, Upload, ScanLine, Copy, Check, QrCode, AlertCircle, Loader2, UserCheck, XCircle, Package } from "lucide-react";
import { createWorker } from "tesseract.js";

async function extractTextFromImage(dataUrl: string): Promise<string> {
  const worker = await createWorker("eng");
  const { data } = await worker.recognize(dataUrl);
  await worker.terminate();
  return data.text.toUpperCase();
}

function normalize(s: string): string {
  return s.replace(/[\s\-_.,;:]/g, "").toUpperCase();
}

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Maison Aurum" }] }),
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
    setStep("idle");
    setPreview(null);
    setCountdown(0);
    setNameOk(null);
    setNumberOk(null);
    setFailReason("");
    onVerified(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNameOk(null);
    setNumberOk(null);
    setFailReason("");
    setStep("uploading");

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setStep("scanning");

      let rawText = "";
      try {
        rawText = await extractTextFromImage(dataUrl);
      } catch {
        setFailReason("Could not read image. Please upload a clear screenshot.");
        setStep("failed");
        onVerified(false);
        return;
      }

      const norm = normalize(rawText);

      // Check account name — accept common OCR variations
      setStep("checking_name");
      await new Promise(r => setTimeout(r, 600));
      const nameVariants = ["IMTIYAZANSAIM", "IMTIYAZAN", "SAIM"];
      const foundName = nameVariants.some(v => norm.includes(v));
      setNameOk(foundName);

      if (!foundName) {
        setFailReason("Account name 'IMTIYAZAN SAIM' not found in screenshot. Make sure the name is visible and upload a valid RAAST confirmation screenshot.");
        setStep("failed");
        onVerified(false);
        return;
      }

      // Check RAAST number — strip dashes/spaces
      setStep("checking_number");
      await new Promise(r => setTimeout(r, 600));
      const foundNumber = norm.includes("03703770146") || norm.includes("3703770146");
      setNumberOk(foundNumber);

      if (!foundNumber) {
        setFailReason("RAAST number '0370-3770146' not found in screenshot. Make sure the recipient number is visible in your confirmation.");
        setStep("failed");
        onVerified(false);
        return;
      }

      // Both passed — 20s countdown
      let remaining = 20;
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
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-4 space-y-3">
      <p className="text-[11px] uppercase tracking-luxe text-ink">Upload Payment Screenshot</p>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        After sending <strong className="text-ink">{formatPrice(amount)}</strong> to the RAAST ID above, take a screenshot of your confirmation screen. Our system will scan for <strong>IMTIYAZAN SAIM</strong> and <strong>0370-3770146</strong> — both must be visible.
      </p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {step === "idle" && (
        <button type="button" onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-gold/30 hover:border-gold/70 transition-colors rounded-sm py-6 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold-warm">
          <Upload className="h-6 w-6" strokeWidth={1.2} />
          <span className="text-[10px] uppercase tracking-luxe">Click to upload screenshot</span>
          <span className="text-[10px]">PNG, JPG, WEBP accepted</span>
        </button>
      )}

      {step === "uploading" && (
        <div className="w-full border border-gold/20 rounded-sm py-6 flex flex-col items-center gap-2 bg-amber-50/40">
          <Loader2 className="h-6 w-6 text-gold animate-spin" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Reading image…</span>
        </div>
      )}

      {(step === "scanning" || step === "checking_name" || step === "checking_number") && (
        <div className="w-full border border-[#1B4D8E]/30 rounded-sm p-5 bg-[#f0f5ff] flex flex-col items-center gap-3">
          {preview && <img src={preview} alt="preview" className="h-20 object-contain rounded border border-[#1B4D8E]/20 opacity-70" />}
          <div className="flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-[#1B4D8E] animate-pulse" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-luxe text-[#1B4D8E] font-semibold">Verifying screenshot…</span>
          </div>
          {step === "checking_number" && (
            <div className="w-full space-y-1.5 mt-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-[#1B4D8E]/15 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1B4D8E] rounded-full transition-all duration-1000" style={{ width: `${((20 - countdown) / 20) * 100}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums w-6">{countdown}s</span>
              </div>
            </div>
          )}
        </div>
      )}

      {step === "failed" && (
        <div className="w-full border border-red-300 rounded-sm p-4 bg-red-50 space-y-3">
          <div className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[11px] uppercase tracking-luxe text-red-700 font-semibold mb-1">Verification Failed</p>
              <p className="text-[10px] text-red-600 leading-relaxed">{failReason}</p>
            </div>
          </div>
          {preview && <img src={preview} alt="preview" className="h-16 object-contain rounded border border-red-200 opacity-60" />}
          <button type="button" onClick={reset} className="text-[10px] uppercase tracking-luxe text-[#1B4D8E] hover:underline">
            ← Try again with a different screenshot
          </button>
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
            <p className="text-[10px] text-muted-foreground leading-relaxed">Your payment has been confirmed. Your order will be processed within 2 hours.</p>
            <button type="button" onClick={reset} className="mt-2 text-[9px] uppercase tracking-luxe text-muted-foreground hover:text-red-500 transition-colors underline">Remove & re-upload</button>
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

function QrScreenshotUpload({ amount, onVerified }: { amount: number; onVerified: (ok: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<OcrStep>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [amountOk, setAmountOk] = useState<boolean | null>(null);
  const [statusOk, setStatusOk] = useState<boolean | null>(null);
  const [failReason, setFailReason] = useState("");

  function reset() {
    setStep("idle");
    setPreview(null);
    setCountdown(0);
    setAmountOk(null);
    setStatusOk(null);
    setFailReason("");
    onVerified(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAmountOk(null);
    setStatusOk(null);
    setFailReason("");
    setStep("uploading");

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setStep("scanning");

      let rawText = "";
      try {
        rawText = await extractTextFromImage(dataUrl);
      } catch {
        setFailReason("Could not read image. Please upload a clear screenshot.");
        setStep("failed");
        onVerified(false);
        return;
      }

      const norm = normalize(rawText);

      // Check payment status keywords
      setStep("checking_name");
      await new Promise(r => setTimeout(r, 600));
      const successKeywords = ["SUCCESS", "SUCCESSFUL", "PAID", "CONFIRMED", "COMPLETE", "PAYMENT SENT", "TRANSACTIONSUCCESS", "TRANSACTIONSUCCESSFUL"];
      const foundStatus = successKeywords.some(kw => norm.includes(normalize(kw)));
      setAmountOk(foundStatus);

      if (!foundStatus) {
        setFailReason("No payment confirmation found in screenshot. Make sure your screenshot shows a successful/confirmed payment screen from your banking app.");
        setStep("failed");
        onVerified(false);
        return;
      }

      // Check that the screenshot is a payment receipt (look for payment/money/transfer keywords)
      setStep("checking_number");
      await new Promise(r => setTimeout(r, 600));
      const paymentKeywords = ["AMOUNT", "RS", "PKR", "TRANSFER", "DEBIT", "PAYMENT", "SENT", "RUPEE"];
      const foundPayment = paymentKeywords.some(kw => norm.includes(normalize(kw)));
      setStatusOk(foundPayment);

      if (!foundPayment) {
        setFailReason("This does not appear to be a payment receipt. Please upload your bank app's payment confirmation screenshot.");
        setStep("failed");
        onVerified(false);
        return;
      }

      // Both passed — 20s countdown
      let remaining = 20;
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
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-4 space-y-3">
      <p className="text-[11px] uppercase tracking-luxe text-ink">Upload Payment Screenshot</p>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        After scanning the QR and paying <strong className="text-ink">{formatPrice(amount)}</strong>, take a screenshot of your confirmation screen and upload it here.
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
        <div className="w-full border border-gold/30 rounded-sm p-5 bg-amber-50/30 flex flex-col items-center gap-3">
          {preview && <img src={preview} alt="preview" className="h-20 object-contain rounded border border-gold/20 opacity-70" />}
          <div className="flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-gold-warm animate-pulse" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-luxe text-ink font-semibold">Verifying screenshot…</span>
          </div>
          {step === "checking_number" && (
            <div className="w-full space-y-1.5 mt-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-gold/15 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-gold rounded-full transition-all duration-1000" style={{ width: `${((20 - countdown) / 20) * 100}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums w-6">{countdown}s</span>
              </div>
            </div>
          )}
        </div>
      )}

      {step === "failed" && (
        <div className="w-full border border-red-300 rounded-sm p-4 bg-red-50 space-y-3">
          <div className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[11px] uppercase tracking-luxe text-red-700 font-semibold mb-1">Verification Failed</p>
              <p className="text-[10px] text-red-600 leading-relaxed">{failReason}</p>
            </div>
          </div>
          {preview && <img src={preview} alt="preview" className="h-16 object-contain rounded border border-red-200 opacity-60" />}
          <button type="button" onClick={reset} className="text-[10px] uppercase tracking-luxe text-gold hover:underline">
            ← Try again with a different screenshot
          </button>
        </div>
      )}

      {step === "approved" && (
        <div className="w-full border border-emerald-400/50 rounded-sm p-4 bg-emerald-50/40 flex items-start gap-3">
          {preview && <img src={preview} alt="preview" className="h-14 w-14 object-cover rounded border border-gold/20 flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-luxe text-emerald-700 font-semibold">QR Payment Approved</span>
            </div>
            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />
                <span className="text-[10px] text-emerald-700">Amount verified: <strong>{formatPrice(amount)}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />
                <span className="text-[10px] text-emerald-700">Payment status: <strong>Confirmed</strong></span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Your QR payment has been verified. Your order will be processed within 2 hours.
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

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const subtotal = total();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [submitted, setSubmitted] = useState(false);
  const [raastScreenshotOk, setRaastScreenshotOk] = useState(false);
  const [qrScreenshotOk, setQrScreenshotOk] = useState(false);
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
                    onClick={() => { setPaymentMethod("qr"); setQrScreenshotOk(false); }}
                    icon={<QrCode className="h-4 w-4" strokeWidth={1.5} />}
                    label="QR Code Scan & Pay"
                    sub="Scan to pay — JazzCash / EasyPaisa / RAAST QR"
                  />
                  {paymentMethod === "qr" && (
                    <div className="border border-gold/20 p-5 ml-9 bg-[oklch(0.985_0.012_88)] space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-3 pb-3 border-b border-gold/15">
                        <QrCode className="h-6 w-6 text-gold flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <p className="text-[11px] uppercase tracking-luxe text-ink font-semibold">QR Code Payment</p>
                          <p className="text-[10px] text-muted-foreground">Scan with JazzCash, EasyPaisa, or any RAAST-enabled app</p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-between bg-ink text-ivory rounded-sm px-4 py-3">
                        <span className="text-[10px] uppercase tracking-luxe opacity-70">Amount to Pay</span>
                        <span className="font-display text-xl font-bold">{formatPrice(subtotal)}</span>
                      </div>

                      {/* QR code image */}
                      <div className="flex flex-col items-center gap-3 py-4">
                        <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">Scan QR Code</p>
                        <div className="border-4 border-ink/10 rounded-sm p-2 bg-white inline-block">
                          <img src="/qr-payment.png" alt="Payment QR Code" className="w-48 h-48 object-contain" />
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center max-w-xs leading-relaxed">
                          Open your bank / wallet app, tap <strong>Scan QR</strong>, point at this code, enter the exact amount and confirm.
                        </p>
                      </div>

                      {/* Steps */}
                      <div className="bg-white border border-gold/15 rounded-sm p-4 space-y-2.5">
                        <p className="text-[10px] uppercase tracking-luxe text-ink mb-3">How to Pay</p>
                        {[
                          "Open JazzCash, EasyPaisa, or any RAAST-enabled bank app",
                          "Tap 'Scan QR Code' or 'Pay via QR'",
                          `Enter exact amount: ${formatPrice(subtotal)}`,
                          "Confirm and complete the payment",
                          "Take a screenshot of your payment confirmation",
                          "Upload the screenshot below for instant verification",
                        ].map((s, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ink text-ivory text-[9px] flex items-center justify-center font-bold">{i + 1}</span>
                            <p className="text-[11px] text-muted-foreground leading-snug">{s}</p>
                          </div>
                        ))}
                      </div>

                      {/* Warning */}
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-sm p-3">
                        <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p className="text-[10px] text-amber-700 leading-relaxed">
                          Make sure your screenshot shows the payment amount and confirmation status clearly. Our system will scan and verify it automatically.
                        </p>
                      </div>

                      {/* QR screenshot upload with OCR */}
                      <QrScreenshotUpload amount={subtotal} onVerified={(ok) => setQrScreenshotOk(ok)} />
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
                  disabled={
                    paymentMethod === "" ||
                    (paymentMethod === "raast" && !raastScreenshotOk) ||
                    (paymentMethod === "qr" && !qrScreenshotOk)
                  }
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-gold text-ivory py-4 text-[11px] uppercase tracking-luxe hover:shadow-luxe transition-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {paymentMethod === "" ? "Select a Payment Method" :
                   (paymentMethod === "raast" && !raastScreenshotOk) || (paymentMethod === "qr" && !qrScreenshotOk)
                     ? "Upload Screenshot to Continue"
                     : "Place Order"}
                </button>
                {(paymentMethod === "raast" && !raastScreenshotOk) && (
                  <p className="mt-2 text-[10px] text-center text-amber-600">
                    Please upload your RAAST payment screenshot to proceed.
                  </p>
                )}
                {(paymentMethod === "qr" && !qrScreenshotOk) && (
                  <p className="mt-2 text-[10px] text-center text-amber-600">
                    Please upload your QR payment screenshot to proceed.
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
