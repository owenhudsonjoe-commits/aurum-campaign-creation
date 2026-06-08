import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Flame, Tag } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import heroImg from "@/assets/hero-daily-wear.png";
import stitchedImg from "@/assets/stitched-magenta.png";
import unstitchedImg from "@/assets/unstitched-style.png";
import dailyWearImg from "@/assets/pk-atelier.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import pkLook1 from "@/assets/pk-look-1.jpg";
import pkLook2 from "@/assets/pk-look-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURUM — Pakistani Heritage Couture" },
      { name: "description", content: "Pakistani heritage couture — bridal, festive prêt and bespoke tailoring from our Lahore atelier." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Home,
});

const saleItems = [
  { src: "/iris-1.png",    name: "Iris 2 Pc Lawn",        slug: "iris-2pc-arabic-lawn",      origPrice: "RS 5,800", salePrice: "RS 2,499", off: "57% OFF" },
  { src: "/berry-1.png",   name: "Berry 2 Pc Lawn",       slug: "berry-2pc-arabic-lawn",     origPrice: "RS 6,500", salePrice: "RS 2,799", off: "57% OFF" },
  { src: "/casper-1.png",  name: "Casper 3 Pc Cotton",    slug: "casper-3pc-cotton",         origPrice: "RS 7,200", salePrice: "RS 2,999", off: "58% OFF" },
  { src: "/zarmina-1.png", name: "Zarmina 2 Pc Silk",     slug: "zarmina-2pc-crush-silk",    origPrice: "RS 6,500", salePrice: "RS 2,599", off: "60% OFF" },
  { src: "/mehmal-1.png",  name: "Mehmal 2 Pc Lawn",      slug: "mehmal-2pc-arabic-lawn",    origPrice: "RS 6,500", salePrice: "RS 2,899", off: "55% OFF" },
  { src: "/tabeer-1.png",  name: "Tabeer 3 Pc Chiffon",   slug: "tabeer-3pc-chiffon",        origPrice: "RS 8,500", salePrice: "RS 3,299", off: "61% OFF" },
];

const newArrivals = [
  { src: "/seharzat-1.png",       name: "Seharzat 3 Pc",        slug: "seharzat-3pc-lawn",             price: "RS 2,844",  badge: "New" },
  { src: "/sapphire-black-1.png", name: "Sapphire Black 3 Pc",  slug: "sapphire-black-embroidered-3pc", price: "RS 3,724",  badge: "New" },
  { src: "/hoorain-1.png",        name: "Hoorain 3 Pc",         slug: "hoorain-3pc-organza",            price: "RS 12,500", badge: "Festive" },
  { src: "/casper-1.png",         name: "Casper 3 Pc",          slug: "casper-3pc-cotton",              price: "RS 3,200",  badge: "Bestseller" },
  { src: "/charm-1.png",          name: "Charm 3 Pc",           slug: "charm-3pc-chiffon",              price: "RS 4,800",  badge: "Sale" },
  { src: "/iris-1.png",           name: "Iris 3 Pc",            slug: "iris-3pc-khaddar",               price: "RS 5,600",  badge: "Limited" },
];

const shopByStyle = [
  {
    img: stitchedImg,
    label: "Stitched",
    sub: "Ready-to-wear & Couture",
    fabric: "Stitched" as const,
  },
  {
    img: unstitchedImg,
    label: "Unstitched",
    sub: "Fabric & Suit Pieces",
    fabric: "Unstitched" as const,
  },
];

const features = [
  { icon: Truck,      title: "Free Shipping", desc: "On orders over RS 5,000" },
  { icon: RotateCcw,  title: "Easy Returns",  desc: "7-day hassle-free returns" },
  { icon: Shield,     title: "100% Authentic", desc: "Certificate with every piece" },
  { icon: Headphones, title: "Expert Styling", desc: "Personal styling consultation" },
];

const clientQuotes = [
  { q: "I wore Aurum to my walima and strangers stopped to ask who I was wearing.", name: "Nadia S.", city: "Lahore" },
  { q: "The embroidery detail is unlike anything I have ever seen — heirloom quality.", name: "Zara M.", city: "Dubai" },
  { q: "I cried when I opened the trunk. Truly a different level of luxury.", name: "Ayesha R.", city: "London" },
  { q: "My lehenga was hand-delivered with rose petals inside the box. Unreal.", name: "Sana K.", city: "Karachi" },
  { q: "Ordered online from New York — fit perfectly. Shipping was flawless.", name: "Hira T.", city: "New York" },
  { q: "My mother asked if I had spent ten times more. That's the Aurum effect.", name: "Mehreen A.", city: "Islamabad" },
];

const SALE_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from first load

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = SALE_END.getTime() - Date.now();
    return Math.max(0, diff);
  });

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(() => Math.max(0, SALE_END.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      {[
        { v: pad(d), label: "Days" },
        { v: pad(h), label: "Hrs" },
        { v: pad(m), label: "Min" },
        { v: pad(s), label: "Sec" },
      ].map(({ v, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-neutral-900 text-amber-400 font-black text-xl md:text-2xl tabular-nums w-12 md:w-14 h-12 md:h-14 flex items-center justify-center leading-none">
              {v}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1 font-semibold">{label}</span>
          </div>
          {i < 3 && <span className="text-rose-500 font-black text-xl md:text-2xl mb-4">:</span>}
        </div>
      ))}
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="text-sm text-foreground/60">You're on the list. Welcome to AURUM.</p>;
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
      />
      <button
        type="submit"
        className="bg-foreground text-background px-6 py-3 text-[11px] font-semibold tracking-widest uppercase hover:bg-foreground/90 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="h-[97px]" />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[85svh] min-h-[500px] w-full overflow-hidden bg-foreground/5">
        <img
          src={heroImg}
          alt="AURUM Collection"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-foreground/35" />

        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto">
          <div className="animate-reveal">
            <p className="text-[11px] tracking-widest uppercase text-background/70 mb-4 font-medium">
              New Collection · Summer 2026
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-[1.05] mb-6 max-w-2xl">
              Dressed for<br />the Modern Woman
            </h1>
            <p className="text-sm md:text-base text-background/70 mb-8 max-w-md leading-relaxed font-light">
              Heritage craftsmanship, contemporary silhouettes. Bridal, festive prêt and bespoke — handcrafted in Lahore.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase hover:bg-background/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
              <Link
                to="/bespoke"
                className="inline-flex items-center gap-2 border border-background text-background px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase hover:bg-background/10 transition-colors"
              >
                Book Bespoke
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 px-6 py-5">
              <Icon className="h-5 w-5 shrink-0 text-foreground/50" strokeWidth={1.5} />
              <div>
                <p className="text-[12px] font-semibold text-foreground">{title}</p>
                <p className="text-[11px] text-foreground/50 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SUMMER SUPER SALE ────────────────────────────────────── */}
      <section className="border-b border-border overflow-hidden">
        {/* Top banner strip */}
        <div className="bg-neutral-900 py-3 px-5 flex items-center justify-center gap-3">
          <Flame className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white">
            Summer Super Sale — Dresses Under <span className="text-amber-400">RS 3,500</span> · Limited Stock
          </p>
          <Flame className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        </div>

        <div className="bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">

            {/* Header row */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 leading-none">
                  Summer<br />
                  <span className="text-rose-600">Super Sale 🔥</span>
                </h2>
                <p className="mt-3 text-sm text-neutral-500">Starting at <span className="font-bold text-rose-600">RS 2,499</span> · While stocks last</p>
              </div>

              {/* Countdown + CTA stacked */}
              <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-2 flex items-center gap-1">
                    <Flame className="h-3 w-3" /> Sale ends in
                  </p>
                  <CountdownTimer />
                </div>
                <Link
                  to="/sale"
                  className="inline-flex items-center gap-2 bg-rose-600 text-white px-7 py-3.5 text-[12px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-colors"
                >
                  See All Sale Items <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* 3 Floating product cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {saleItems.slice(0, 3).map((item, i) => (
                <Link
                  key={item.slug}
                  to="/product/$slug"
                  params={{ slug: item.slug }}
                  className="group relative"
                >
                  <div className={`relative overflow-hidden bg-white shadow-md ${i === 1 ? "md:-mt-6" : ""}`}>
                    <div className="aspect-[3/4]">
                      <img
                        src={item.src}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Off ribbon */}
                    <div className="absolute top-3 left-0 bg-rose-600 text-white text-[9px] font-black tracking-widest px-3 py-1.5 shadow-sm">
                      {item.off}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <span className="text-[10px] text-white font-semibold uppercase tracking-widest">View Product →</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-[12px] font-semibold text-neutral-800 leading-tight truncate group-hover:text-rose-600 transition-colors">{item.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[15px] font-black text-rose-600">{item.salePrice}</span>
                      <span className="text-[11px] text-neutral-400 line-through">{item.origPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 flex items-center justify-center">
              <Link
                to="/sale"
                className="group inline-flex items-center gap-3 border-2 border-neutral-900 text-neutral-900 px-10 py-4 text-[12px] font-black uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                <Flame className="h-4 w-4 text-rose-600 group-hover:text-amber-400 transition-colors" />
                See All {saleItems.length}+ Sale Pieces
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-foreground/40 mb-1 font-medium">Just In</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">New Arrivals</h2>
            </div>
            <Link to="/shop" className="text-[12px] font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {newArrivals.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group flex-shrink-0 snap-start w-[180px] md:w-[220px]"
              >
                <div className="relative overflow-hidden bg-foreground/5 aspect-[3/4]">
                  <img
                    src={p.src}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-foreground text-background text-[9px] font-semibold uppercase tracking-widest px-2 py-1">
                      {p.badge}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-[13px] font-medium text-foreground leading-tight group-hover:text-foreground/60 transition-colors">{p.name}</p>
                  <p className="mt-1 text-[12px] text-foreground/60">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY STYLE ────────────────────────────────────────── */}
      <section className="border-b border-border">
        {/* Section label */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-12 pb-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-foreground/40 font-semibold mb-1">Curated for You</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Shop by Style</h2>
          </div>
          <Link to="/shop" className="text-[11px] font-semibold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors flex items-center gap-1.5">
            All Collections <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Two-panel full-bleed layout */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Stitched — left */}
          <Link
            to="/shop"
            search={{ collection: "All" as const, fabric: "Stitched" as const }}
            className="group relative overflow-hidden bg-neutral-100"
            style={{ minHeight: "520px" }}
          >
            <img
              src={stitchedImg}
              alt="Stitched"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            {/* Dual gradient: dark bottom + subtle left side */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Top-left tag */}
            <div className="absolute top-5 left-5 border border-white/40 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 backdrop-blur-sm bg-white/10">
              Ready to Wear
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 inset-x-0 p-7 md:p-10">
              <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-2">01 — Collection</p>
              <h3 className="text-white text-4xl md:text-5xl font-black leading-none mb-3 tracking-tight">
                Stitched
              </h3>
              <p className="text-white/70 text-sm mb-6 font-light max-w-xs leading-relaxed">
                Ready-to-wear couture &amp; bespoke masterpieces — crafted to perfection.
              </p>
              <span className="inline-flex items-center gap-2 bg-white text-neutral-900 text-[11px] font-black uppercase tracking-widest px-6 py-3 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </span>
            </div>
          </Link>

          {/* Unstitched — right */}
          <Link
            to="/shop"
            search={{ collection: "All" as const, fabric: "Unstitched" as const }}
            className="group relative overflow-hidden bg-stone-100"
            style={{ minHeight: "520px" }}
          >
            <img
              src={unstitchedImg}
              alt="Unstitched"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />

            {/* Top-right tag */}
            <div className="absolute top-5 right-5 border border-white/40 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 backdrop-blur-sm bg-white/10">
              Fabric &amp; Suits
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 inset-x-0 p-7 md:p-10">
              <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-2">02 — Collection</p>
              <h3 className="text-white text-4xl md:text-5xl font-black leading-none mb-3 tracking-tight">
                Unstitched
              </h3>
              <p className="text-white/70 text-sm mb-6 font-light max-w-xs leading-relaxed">
                Luxury fabric &amp; suit pieces — tailored to your vision.
              </p>
              <span className="inline-flex items-center gap-2 bg-white text-neutral-900 text-[11px] font-black uppercase tracking-widest px-6 py-3 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── EDITORIAL SPLIT ──────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-3 gap-4">

            {/* Bridal — tall */}
            <Link to="/shop" search={{ collection: "Bridal" as const, fabric: "Stitched" as const }} className="group relative overflow-hidden bg-foreground/5 md:row-span-2 aspect-[3/4] md:aspect-auto">
              <img src={lookbook1} alt="Bridal Edit" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                <p className="text-[10px] tracking-widest uppercase text-background/60 mb-2 font-medium">Bridal Edit · 2026</p>
                <h3 className="text-background text-2xl md:text-3xl font-bold leading-tight mb-3">The Bridal<br />Collection</h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-background border-b border-background/50 pb-0.5 group-hover:border-background transition-colors">
                  Explore <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Festive */}
            <Link to="/shop" search={{ collection: "Festive / Pret" as const, fabric: "Stitched" as const }} className="group relative overflow-hidden bg-foreground/5 aspect-[16/9] md:col-span-2">
              <img src={pkLook1} alt="Festive" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                <p className="text-[10px] tracking-widest uppercase text-background/60 mb-1 font-medium">Festive Collection</p>
                <h3 className="text-background text-xl font-bold">Eid Essentials</h3>
              </div>
            </Link>

            {/* Daily Wear */}
            <Link to="/shop" search={{ collection: "Daily Wear" as const, fabric: "Stitched" as const }} className="group relative overflow-hidden bg-foreground/5 aspect-[16/9] md:col-span-2">
              <img src={dailyWearImg} alt="Daily Wear" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                <p className="text-[10px] tracking-widest uppercase text-background/60 mb-1 font-medium">Daily Wear</p>
                <h3 className="text-background text-xl font-bold">Everyday Elegance</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── MARQUEE REVIEWS ──────────────────────────────────────── */}
      <div className="border-y border-border py-8 overflow-hidden bg-foreground/[0.02]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {clientQuotes.map((c, i) => (
                <div key={i} className="inline-flex items-center gap-6 px-10 border-r border-border">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <span key={si} className="text-foreground text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-foreground/70 max-w-[260px] truncate">"{c.q}"</p>
                  <p className="text-[11px] font-semibold text-foreground/50 whitespace-nowrap">— {c.name}, {c.city}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] tracking-widest uppercase text-foreground/40 mb-2 font-medium">Stay in the loop</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">New drops, exclusive offers,<br className="hidden md:block" /> styling tips.</h2>
          </div>
          <div className="w-full md:max-w-md">
            <NewsletterForm />
            <p className="text-[11px] text-foreground/40 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
