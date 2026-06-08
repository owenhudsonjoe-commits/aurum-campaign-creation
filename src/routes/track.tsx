import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Search, Package, CheckCircle2, Truck, Clock, MapPin, MessageCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Maison Aurum" },
      { name: "description", content: "Track your Maison Aurum order and get real-time delivery updates." },
    ],
  }),
  component: TrackPage,
});

type TrackingStatus = "placed" | "processing" | "dispatched" | "delivered";

interface TrackingResult {
  orderNumber: string;
  status: TrackingStatus;
  customerName: string;
  city: string;
  estimatedDelivery: string;
  placedOn: string;
  items: string;
  steps: { status: TrackingStatus; label: string; sub: string; date: string; done: boolean; active: boolean }[];
}

const DEMO_ORDERS: Record<string, TrackingResult> = {
  "AUR-1001": {
    orderNumber: "AUR-1001",
    status: "delivered",
    customerName: "Ayesha R.",
    city: "Lahore",
    estimatedDelivery: "Delivered",
    placedOn: "2 Jun 2026",
    items: "Casper 3 Pc — Size M",
    steps: [
      { status: "placed", label: "Order Placed", sub: "Your order has been received", date: "2 Jun, 10:22 AM", done: true, active: false },
      { status: "processing", label: "Processing", sub: "Our atelier is preparing your piece", date: "2 Jun, 2:15 PM", done: true, active: false },
      { status: "dispatched", label: "Dispatched", sub: "Handed over to courier", date: "3 Jun, 11:00 AM", done: true, active: false },
      { status: "delivered", label: "Delivered", sub: "Package delivered successfully", date: "5 Jun, 3:40 PM", done: true, active: true },
    ],
  },
  "AUR-1002": {
    orderNumber: "AUR-1002",
    status: "dispatched",
    customerName: "Zara M.",
    city: "Karachi",
    estimatedDelivery: "Expected 10 Jun 2026",
    placedOn: "6 Jun 2026",
    items: "Iris Silk Dupatta — Size S",
    steps: [
      { status: "placed", label: "Order Placed", sub: "Your order has been received", date: "6 Jun, 9:05 AM", done: true, active: false },
      { status: "processing", label: "Processing", sub: "Our atelier is preparing your piece", date: "6 Jun, 4:00 PM", done: true, active: false },
      { status: "dispatched", label: "Dispatched", sub: "Handed over to courier — TCS", date: "8 Jun, 10:30 AM", done: true, active: true },
      { status: "delivered", label: "Delivered", sub: "Awaiting delivery", date: "", done: false, active: false },
    ],
  },
  "AUR-1003": {
    orderNumber: "AUR-1003",
    status: "processing",
    customerName: "Sana K.",
    city: "Islamabad",
    estimatedDelivery: "Expected 12 Jun 2026",
    placedOn: "7 Jun 2026",
    items: "Berry Lawn 3 Pc — Size L",
    steps: [
      { status: "placed", label: "Order Placed", sub: "Your order has been received", date: "7 Jun, 6:12 PM", done: true, active: false },
      { status: "processing", label: "Processing", sub: "Our atelier is preparing your piece", date: "8 Jun, 11:00 AM", done: true, active: true },
      { status: "dispatched", label: "Dispatched", sub: "Awaiting dispatch", date: "", done: false, active: false },
      { status: "delivered", label: "Delivered", sub: "Awaiting delivery", date: "", done: false, active: false },
    ],
  },
};

const STATUS_COLOR: Record<TrackingStatus, string> = {
  placed: "text-blue-600",
  processing: "text-amber-600",
  dispatched: "text-violet-600",
  delivered: "text-emerald-600",
};
const STATUS_BG: Record<TrackingStatus, string> = {
  placed: "bg-blue-50 border-blue-200",
  processing: "bg-amber-50 border-amber-200",
  dispatched: "bg-violet-50 border-violet-200",
  delivered: "bg-emerald-50 border-emerald-200",
};
const STATUS_LABEL: Record<TrackingStatus, string> = {
  placed: "Order Placed",
  processing: "Processing",
  dispatched: "Dispatched",
  delivered: "Delivered",
};

function TrackPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const key = query.trim().toUpperCase();
    setSearched(true);
    setResult(DEMO_ORDERS[key] ?? null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />

      <main className="flex-1 pt-[105px] pb-20">
        {/* Header */}
        <div className="border-b border-border bg-muted/20 py-12 px-5 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">Maison Aurum</p>
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-2">Track Your Order</h1>
          <p className="text-[13px] text-foreground/50">Enter your order number to see real-time delivery updates</p>
        </div>

        <div className="max-w-xl mx-auto px-5 mt-12">
          {/* Search form */}
          <form onSubmit={handleTrack} className="flex gap-0">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
              placeholder="e.g. AUR-1001"
              className="flex-1 border border-border px-4 py-3.5 text-[13px] text-foreground placeholder:text-foreground/30 bg-background focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-foreground text-background px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              <Search className="h-4 w-4" strokeWidth={2} />
              Track
            </button>
          </form>
          <p className="text-[11px] text-foreground/30 mt-2 text-center">
            Your order number was sent via WhatsApp/email after purchase.
          </p>

          {/* Not found */}
          {searched && !result && (
            <div className="mt-8 p-6 border border-border text-center">
              <Package className="h-10 w-10 text-foreground/20 mx-auto mb-3" strokeWidth={1.2} />
              <p className="text-[14px] font-medium text-foreground mb-1">Order not found</p>
              <p className="text-[12px] text-foreground/50 mb-5">
                We couldn't find an order matching <strong className="text-foreground">"{query}"</strong>. Double-check the number or contact us directly.
              </p>
              <a
                href="https://wa.me/923318541663?text=Hi%2C%20I%20need%20help%20tracking%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 transition-colors"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Contact Us on WhatsApp
              </a>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 space-y-5">
              {/* Order summary card */}
              <div className="border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-foreground/40 mb-1">Order Number</p>
                    <p className="text-[15px] font-semibold text-foreground">{result.orderNumber}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border ${STATUS_BG[result.status]} ${STATUS_COLOR[result.status]}`}>
                    {STATUS_LABEL[result.status]}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 text-[12px]">
                  <div>
                    <p className="text-foreground/40 text-[10px] uppercase tracking-wide mb-0.5">Placed On</p>
                    <p className="text-foreground font-medium">{result.placedOn}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-[10px] uppercase tracking-wide mb-0.5">Delivery</p>
                    <p className="text-foreground font-medium">{result.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-[10px] uppercase tracking-wide mb-0.5">Ship To</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-foreground/40" strokeWidth={1.8} />
                      <p className="text-foreground font-medium">{result.city}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-[10px] uppercase tracking-wide mb-0.5">Item(s)</p>
                    <p className="text-foreground font-medium">{result.items}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="border border-border p-5">
                <p className="text-[11px] uppercase tracking-widest text-foreground/40 mb-6 font-medium">Delivery Timeline</p>
                <div className="relative">
                  {result.steps.map((step, i) => {
                    const Icon = i === 0 ? Clock : i === 1 ? Package : i === 2 ? Truck : CheckCircle2;
                    return (
                      <div key={step.status} className="relative flex gap-4 pb-7 last:pb-0">
                        {/* Vertical line */}
                        {i < result.steps.length - 1 && (
                          <div className={`absolute left-[15px] top-8 w-px h-full ${step.done ? "bg-foreground/30" : "bg-border"}`} />
                        )}
                        {/* Icon */}
                        <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                          step.active
                            ? "border-foreground bg-foreground text-background"
                            : step.done
                            ? "border-foreground/40 bg-foreground/10 text-foreground/60"
                            : "border-border bg-background text-foreground/20"
                        }`}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        </div>
                        {/* Text */}
                        <div className="pt-0.5">
                          <p className={`text-[13px] font-semibold ${step.active ? "text-foreground" : step.done ? "text-foreground/70" : "text-foreground/30"}`}>
                            {step.label}
                          </p>
                          <p className={`text-[11px] mt-0.5 ${step.done ? "text-foreground/50" : "text-foreground/25"}`}>{step.sub}</p>
                          {step.date && (
                            <p className="text-[10px] text-foreground/30 mt-1 tracking-wide">{step.date}</p>
                          )}
                          {step.active && (
                            <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-widest bg-foreground text-background px-2 py-0.5">
                              Current Status
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help strip */}
              <div className="p-4 border border-border bg-muted/20 flex items-center justify-between gap-4">
                <p className="text-[12px] text-foreground/60">Have a question about your order?</p>
                <a
                  href={`https://wa.me/923318541663?text=Hi%2C%20I%20need%20help%20with%20order%20${result.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:text-foreground/60 transition-colors"
                >
                  WhatsApp Us <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </div>
            </div>
          )}

          {/* Try demo hint */}
          {!searched && (
            <div className="mt-8 p-4 border border-dashed border-border text-center">
              <p className="text-[11px] text-foreground/30 mb-2">Try a demo order number:</p>
              <div className="flex justify-center gap-3 flex-wrap">
                {["AUR-1001", "AUR-1002", "AUR-1003"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => { setQuery(n); }}
                    className="text-[11px] font-medium text-foreground/50 hover:text-foreground border border-border px-3 py-1.5 transition-colors hover:border-foreground/50"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
