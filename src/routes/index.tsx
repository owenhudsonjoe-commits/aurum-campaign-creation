import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Sparkles } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import heroImg from "@/assets/hero-daily-wear.webp";
import stitchedImg from "@/assets/stitched-magenta.webp";
import unstitchedImg from "@/assets/unstitched-style.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURUM — Pakistani Heritage Couture" },
      { name: "description", content: "Pakistani heritage couture — bridal, festive prêt and bespoke tailoring from our Lahore atelier." },
    ],
  }),
  component: Home,
});

/* ─── Data ───────────────────────────────────────────────────────── */
const saleItems = [
  { src: "/iris-1.webp",    name: "Iris 2 Pc Lawn",      slug: "iris-2pc-arabic-lawn",      origPrice: "RS 5,800", salePrice: "RS 2,499", off: "57% OFF" },
  { src: "/berry-1.webp",   name: "Berry 2 Pc Lawn",     slug: "berry-2pc-arabic-lawn",     origPrice: "RS 6,500", salePrice: "RS 2,799", off: "57% OFF" },
  { src: "/casper-1.webp",  name: "Casper 3 Pc Cotton",  slug: "casper-3pc-cotton",         origPrice: "RS 7,200", salePrice: "RS 2,999", off: "58% OFF" },
];

const newArrivals = [
  { src: "/seharzat-1.webp",       name: "Seharzat 3 Pc",       slug: "seharzat-3pc-lawn",              price: "RS 2,844",  badge: "New" },
  { src: "/sapphire-black-1.webp", name: "Sapphire Black 3 Pc", slug: "sapphire-black-embroidered-3pc", price: "RS 3,724",  badge: "New" },
  { src: "/hoorain-1.webp",        name: "Hoorain 3 Pc",        slug: "hoorain-3pc-organza",            price: "RS 12,500", badge: "Festive" },
  { src: "/casper-1.webp",         name: "Casper 3 Pc",         slug: "casper-3pc-cotton",              price: "RS 3,200",  badge: "Bestseller" },
  { src: "/charm-1.webp",          name: "Charm 3 Pc",          slug: "charm-3pc-chiffon",              price: "RS 4,800",  badge: "Sale" },
  { src: "/iris-1.webp",           name: "Iris 3 Pc",           slug: "iris-3pc-khaddar",               price: "RS 5,600",  badge: "Limited" },
];

const shopByStyle = [
  { img: stitchedImg,   label: "Stitched",   sub: "Ready-to-wear & Couture",  fabric: "Stitched"   as const },
  { img: unstitchedImg, label: "Unstitched", sub: "Fabric & Suit Pieces",     fabric: "Unstitched" as const },
];

const features = [
  { icon: Truck,       title: "Free Shipping",   desc: "On orders over RS 5,000" },
  { icon: RotateCcw,   title: "Easy Returns",    desc: "7-day hassle-free returns" },
  { icon: Shield,      title: "100% Authentic",  desc: "Certificate with every piece" },
  { icon: Headphones,  title: "Expert Styling",  desc: "Personal styling consultation" },
];

const clientQuotes = [
  { q: "I wore Aurum to my walima and strangers stopped to ask who I was wearing.", name: "Nadia S.", city: "Lahore" },
  { q: "The embroidery detail is unlike anything I have ever seen — heirloom quality.", name: "Zara M.", city: "Dubai" },
  { q: "I cried when I opened the trunk. Truly a different level of luxury.", name: "Ayesha R.", city: "London" },
  { q: "My lehenga was hand-delivered with rose petals inside the box. Unreal.", name: "Sana K.", city: "Karachi" },
  { q: "Ordered online from New York — fit perfectly. Shipping was flawless.", name: "Hira T.", city: "New York" },
  { q: "My mother asked if I had spent ten times more. That's the Aurum effect.", name: "Mehreen A.", city: "Islamabad" },
];

const SALE_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

/* ─── Countdown ──────────────────────────────────────────────────── */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, SALE_END.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(Math.max(0, SALE_END.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-2">
      {[{ v: pad(d), label: "Days" }, { v: pad(h), label: "Hrs" }, { v: pad(m), label: "Min" }, { v: pad(s), label: "Sec" }].map(({ v, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="font-sans font-bold text-xl tabular-nums w-12 h-12 flex items-center justify-center" style={{ background: "#17130f", color: "#c9a84c" }}>{v}</div>
            <span className="text-[9px] uppercase tracking-widest mt-1 font-sans font-medium" style={{ color: "rgba(245,240,232,0.4)" }}>{label}</span>
          </div>
          {i < 3 && <span className="font-bold text-xl mb-4" style={{ color: "#c9a84c" }}>:</span>}
        </div>
      ))}
    </div>
  );
}

/* ─── Newsletter form ────────────────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <p className="font-sans text-sm" style={{ color: "rgba(245,240,232,0.55)" }}>You're on the list. Welcome to AURUM.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex flex-col sm:flex-row gap-0 w-full max-w-md">
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 px-4 py-3 text-sm font-sans outline-none"
        style={{ background: "rgba(245,240,232,0.07)", border: "1px solid rgba(245,240,232,0.15)", borderRight: "none", color: "#f5f0e8" }}
      />
      <button type="submit"
        className="px-6 py-3 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ background: "var(--gold)", color: "#17130f", border: "none" }}>
        Subscribe
      </button>
    </form>
  );
}

/* ─── Home page ──────────────────────────────────────────────────── */
function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="h-[97px]" />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "88svh", minHeight: "520px" }}>
        <img
          src={heroImg} alt="AURUM Collection"
          fetchPriority="high" decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Dark vignette */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(23,19,15,0.65) 0%, rgba(23,19,15,0.25) 60%, rgba(23,19,15,0.1) 100%)" }} />

        {/* Corner ornament */}
        <div className="absolute top-8 left-8 hidden md:block" style={{ width: 48, height: 48, borderTop: "1px solid rgba(201,168,76,0.5)", borderLeft: "1px solid rgba(201,168,76,0.5)" }} />
        <div className="absolute bottom-8 right-8 hidden md:block" style={{ width: 48, height: 48, borderBottom: "1px solid rgba(201,168,76,0.5)", borderRight: "1px solid rgba(201,168,76,0.5)" }} />

        <div className="relative z-10 flex h-full flex-col items-start justify-center px-8 md:px-20 max-w-[1400px] mx-auto">
          <div className="animate-reveal">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-5 font-medium" style={{ color: "#c9a84c" }}>
              New Collection · Summer 2026
            </p>
            <h1 className="font-display font-light leading-[1.08] mb-6 max-w-2xl" style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", color: "#f5f0e8" }}>
              Dressed for<br />the <em className="italic" style={{ color: "#c9a84c" }}>Modern</em> Woman
            </h1>
            <p className="font-sans font-light text-sm md:text-base mb-10 max-w-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.6)" }}>
              Heritage craftsmanship, contemporary silhouettes — bridal, festive prêt and bespoke, handcrafted in Lahore.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
                style={{ background: "#f5f0e8", color: "#17130f" }}>
                Shop Now <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
              <Link to="/bespoke"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(245,240,232,0.35)", color: "#f5f0e8" }}>
                Book Bespoke
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────────────────── */}
      <div className="border-y border-border" style={{ background: "var(--color-muted)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 px-6 py-5">
              <Icon className="h-4 w-4 shrink-0 text-foreground/30" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[11px] font-semibold tracking-wide text-foreground">{title}</p>
                <p className="font-sans text-[10px] mt-0.5" style={{ color: "rgba(26,23,20,0.45)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SALE SECTION ─────────────────────────────────────────── */}
      <section className="border-b border-border overflow-hidden" style={{ background: "#17130f" }}>
        {/* Gold top bar */}
        <div className="py-3 px-5 flex items-center justify-center gap-3" style={{ background: "var(--gold)" }}>
          <Sparkles className="h-3.5 w-3.5 shrink-0" style={{ color: "#17130f" }} />
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "#17130f" }}>
            Summer Sale · Dresses from RS 2,499 · Limited Stock
          </p>
          <Sparkles className="h-3.5 w-3.5 shrink-0" style={{ color: "#17130f" }} />
        </div>

        <div className="py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "#c9a84c" }}>Limited Time</p>
                <h2 className="font-display font-light leading-none" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "#f5f0e8" }}>
                  Summer<br /><em className="italic" style={{ color: "#c9a84c" }}>Super Sale</em>
                </h2>
                <p className="font-sans text-sm mt-3" style={{ color: "rgba(245,240,232,0.4)" }}>
                  Starting at <span className="font-semibold" style={{ color: "#c9a84c" }}>RS 2,499</span> · While stocks last
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-5">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-2 font-medium" style={{ color: "rgba(245,240,232,0.4)" }}>Sale ends in</p>
                  <CountdownTimer />
                </div>
                <Link to="/sale"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
                  style={{ background: "var(--gold)", color: "#17130f" }}>
                  See All Sale Items <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {saleItems.map((item, i) => (
                <Link key={item.slug} to="/product/$slug" params={{ slug: item.slug }} className="group relative">
                  <div className={`relative overflow-hidden ${i === 1 ? "md:-mt-8" : ""}`} style={{ background: "#1f1a15" }}>
                    <div className="aspect-[3/4]">
                      <img src={item.src} alt={item.name} loading="lazy" decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="absolute top-0 left-0 px-3 py-1.5 font-sans text-[9px] font-bold tracking-[0.15em] uppercase" style={{ background: "var(--gold)", color: "#17130f" }}>
                      {item.off}
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(23,19,15,0.7) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="font-sans text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#f5f0e8" }}>View Product →</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-sans text-[12px] font-medium leading-tight truncate" style={{ color: "rgba(245,240,232,0.7)" }}>{item.name}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-sans text-[14px] font-bold" style={{ color: "#c9a84c" }}>{item.salePrice}</span>
                      <span className="font-sans text-[11px] line-through" style={{ color: "rgba(245,240,232,0.3)" }}>{item.origPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/sale"
                className="inline-flex items-center gap-3 px-10 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-white/5"
                style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}>
                View All Sale Pieces <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURAL FUSION (STITCHED) ───────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-border" style={{ background: "rgba(201,168,76,0.03)" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sans text-[9px] tracking-[0.35em] uppercase font-medium mb-2" style={{ color: "var(--gold)" }}>Heritage meets Modern</p>
              <h2 className="font-display font-light text-3xl md:text-4xl text-foreground">Cultural Fusion</h2>
            </div>
            <Link to="/shop" search={{ collection: "Cultural Fusion", fabric: "Stitched" }} className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/40 hover:text-foreground transition-colors flex items-center gap-1.5">
              Explore Collection <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>

          <div className="min-h-[300px] flex items-center justify-center border border-dashed border-border">
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-foreground/30">New designs arriving soon</p>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sans text-[9px] tracking-[0.35em] uppercase font-medium mb-2" style={{ color: "var(--gold)" }}>Just In</p>
              <h2 className="font-display font-light text-3xl md:text-4xl text-foreground">New Arrivals</h2>
            </div>
            <Link to="/shop" className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/40 hover:text-foreground transition-colors flex items-center gap-1.5">
              View All <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {newArrivals.map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }}
                className="group flex-shrink-0 snap-start w-[170px] md:w-[210px]">
                <div className="relative overflow-hidden aspect-[3/4]" style={{ background: "var(--color-muted)" }}>
                  <img src={p.src} alt={p.name} loading="lazy" decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.2em] px-2 py-1 bg-foreground text-background">{p.badge}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-sans text-[12px] font-medium leading-tight group-hover:text-foreground/50 transition-colors">{p.name}</p>
                  <p className="mt-1 font-sans text-[12px]" style={{ color: "var(--gold)" }}>{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY STYLE ────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-14 pb-8 flex items-end justify-between">
          <div>
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase font-medium mb-2" style={{ color: "var(--gold)" }}>Curated for You</p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-foreground">Shop by Style</h2>
          </div>
          <Link to="/shop" className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/40 hover:text-foreground transition-colors flex items-center gap-1.5">
            All Collections <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {shopByStyle.map((s, i) => (
            <Link key={s.label} to="/shop" search={{ collection: "All" as const, fabric: s.fabric }}
              className="group relative overflow-hidden" style={{ minHeight: "520px" }}>
              <img src={s.img} alt={s.label} loading="lazy" decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(23,19,15,0.8) 0%, rgba(23,19,15,0.1) 60%, transparent 100%)" }} />

              {/* Index label */}
              <div className="absolute top-6 left-6 font-sans text-[9px] tracking-[0.3em] uppercase px-3 py-1.5" style={{ border: "1px solid rgba(245,240,232,0.3)", color: "rgba(245,240,232,0.6)" }}>
                0{i + 1} — {i === 0 ? "Ready to Wear" : "Fabric & Suits"}
              </div>

              <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
                <h3 className="font-display font-light text-5xl md:text-6xl leading-none mb-3" style={{ color: "#f5f0e8" }}>{s.label}</h3>
                <p className="font-sans text-sm font-light mb-8" style={{ color: "rgba(245,240,232,0.55)" }}>{s.sub}</p>
                <span className="inline-flex items-center gap-2 px-6 py-3 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:opacity-90"
                  style={{ background: "#f5f0e8", color: "#17130f" }}>
                  Explore <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MARQUEE REVIEWS ──────────────────────────────────────── */}
      <div className="border-y border-border py-7 overflow-hidden" style={{ background: "var(--color-muted)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {clientQuotes.map((c, i) => (
                <div key={i} className="inline-flex items-center gap-5 px-10 border-r border-border">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <span key={si} className="text-[11px]" style={{ color: "var(--gold)" }}>★</span>
                    ))}
                  </div>
                  <p className="font-sans text-[12px] max-w-[240px] truncate" style={{ color: "rgba(26,23,20,0.6)" }}>"{c.q}"</p>
                  <p className="font-sans text-[11px] font-medium whitespace-nowrap" style={{ color: "rgba(26,23,20,0.4)" }}>— {c.name}, {c.city}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── BESPOKE CTA ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border text-center px-6" style={{ background: "#17130f" }}>
        <p className="font-sans text-[9px] tracking-[0.4em] uppercase mb-4 font-medium" style={{ color: "#c9a84c" }}>Couture Atelier</p>
        <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#f5f0e8" }}>
          Every design can be bespoke.
        </h2>
        <p className="font-sans text-sm font-light mb-10 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(245,240,232,0.45)" }}>
          Commission a one-of-a-kind piece crafted to your exact measurements, fabric preferences, and vision.
        </p>
        <Link to="/bespoke"
          className="inline-flex items-center gap-3 px-10 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-white/5"
          style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c" }}>
          Book a Consultation <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-border" style={{ background: "#17130f" }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase mb-3 font-medium" style={{ color: "#c9a84c" }}>Stay in the loop</p>
            <h2 className="font-display font-light text-3xl md:text-4xl" style={{ color: "#f5f0e8" }}>
              New drops, exclusive offers,<br className="hidden md:block" /> styling tips.
            </h2>
          </div>
          <div className="w-full md:max-w-md">
            <NewsletterForm />
            <p className="font-sans text-[10px] mt-3" style={{ color: "rgba(245,240,232,0.25)" }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
