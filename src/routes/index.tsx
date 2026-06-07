import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Sparkles, Instagram, Shield, Truck, Award, Clock, Phone, ChevronDown, Flame, Quote, Gem, Crown, MapPin } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { GoldParticles } from "@/components/GoldParticles";
import { AurumLogo } from "@/components/AurumLogo";
import { PaisleyDivider } from "@/components/PaisleyDivider";
import { ArchFrame } from "@/components/ArchFrame";
import heroImg from "@/assets/pk-hero.png";
import bridal from "@/assets/pk-bridal.jpg";
import pret from "@/assets/pk-pret.jpg";
import men from "@/assets/pk-men.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import pkLook1 from "@/assets/pk-look-1.jpg";
import pkLook2 from "@/assets/pk-look-2.jpg";
const dailyWearImg = "/zirwaha-1.png";
import atelier from "@/assets/pk-atelier.jpg";

const feedItems = [
  { src: "/casper-1.png",   slug: "casper-3pc-cotton",    label: "Casper 3 Pc" },
  { src: "/simran-2.png",   slug: "simran-3pc-organza",   label: "Simran 3 Pc" },
  { src: "/rupenzal-3.png", slug: "rupenzal-2pc-printed", label: "Rupenzal 2 Pc" },
  { src: "/casper-4.png",   slug: "casper-3pc-cotton",    label: "Casper 3 Pc" },
  { src: "/simran-4.png",   slug: "simran-3pc-organza",   label: "Simran 3 Pc" },
  { src: "/rupenzal-5.png", slug: "rupenzal-2pc-printed", label: "Rupenzal 2 Pc" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURUM — Heritage Couture, Reimagined" },
      {
        name: "description",
        content:
          "AURUM. A private house of Pakistani heritage couture — bridal, festive pret and bespoke menswear hand-crafted in Lahore.",
      },
      { property: "og:title", content: "AURUM — Heritage Couture, Reimagined" },
      {
        property: "og:description",
        content: "Pakistani luxury couture for the modern maharani.",
      },
      { property: "og:image", content: "/aurum-og.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Noto+Nastaliq+Urdu:wght@400;500&display=swap",
      },
    ],
  }),
  component: Home,
});

const fabricCategories = [
  { image: "/stitched-card.png", hasImage: true, title: "Stitched", caption: "Ready-to-wear & made-to-measure", urdu: "سلا ہوا", fabric: "Stitched" as const },
  { image: "/unstitched-card.png", hasImage: true, title: "Unstitched", caption: "Premium fabrics, tailored your way", urdu: "ان سلا", fabric: "Unstitched" as const },
];

const press = [
  "Vogue Arabia", "Harper's Bazaar", "Dawn Images", "She Magazine", "Hello! Pakistan", "Gulf News"
];

const trustPillars = [
  { icon: Truck, title: "Worldwide Delivery", desc: "Complimentary shipping to 40+ countries in a signature emerald trunk" },
  { icon: Shield, title: "Authenticity Guaranteed", desc: "Every piece ships with a hand-signed certificate of authenticity" },
  { icon: Award, title: "Master Craftsmen", desc: "Five generations of zardozi and dabka embroidery from Gulberg, Lahore" },
  { icon: Clock, title: "Bespoke in 12 Weeks", desc: "Private consultations available in Lahore, Karachi, Dubai & London" },
];

const bespokeSteps = [
  { n: "01", title: "Consultation", desc: "A private session with your personal stylist — in atelier or by video" },
  { n: "02", title: "Illustration", desc: "Your piece is hand-sketched and refined until it is exactly right" },
  { n: "03", title: "Embroidery", desc: "Our karigars begin the hand work — 300+ hours of zardozi and dabka" },
  { n: "04", title: "Delivery", desc: "Your commission arrives in our signature emerald trunk with rose-silk lining" },
];

const newArrivals = [
  { src: "/seharzat-1.png",      name: "Seharzat 3 Pc",       slug: "seharzat-3pc-lawn",            price: "RS 2,844",  badge: "New" },
  { src: "/sapphire-black-1.png",name: "Sapphire Black 3 Pc", slug: "sapphire-black-embroidered-3pc",price: "RS 3,724",  badge: "New" },
  { src: "/hoorain-1.png",       name: "Hoorain 3 Pc",        slug: "hoorain-3pc-organza",           price: "RS 12,500", badge: "Festive" },
  { src: "/casper-1.png",        name: "Casper 3 Pc",         slug: "casper-3pc-cotton",             price: "RS 3,200",  badge: "Bestseller" },
  { src: "/charm-1.png",         name: "Charm 3 Pc",          slug: "charm-3pc-chiffon",             price: "RS 4,800",  badge: "Sale" },
  { src: "/iris-1.png",          name: "Iris 3 Pc",           slug: "iris-3pc-khaddar",              price: "RS 5,600",  badge: "Limited" },
];

const clientQuotes = [
  { q: "I wore Aurum to my walima and strangers stopped to ask who I was wearing.", name: "Nadia S.", city: "Lahore" },
  { q: "The embroidery detail is unlike anything I have ever seen — heirloom quality.", name: "Zara M.", city: "Dubai" },
  { q: "I cried when I opened the trunk. Truly a different level of luxury.", name: "Ayesha R.", city: "London" },
  { q: "My lehenga was hand-delivered with rose petals inside the box. Unreal.", name: "Sana K.", city: "Karachi" },
  { q: "Ordered online from New York — fit perfectly. Shipping was flawless.", name: "Hira T.", city: "New York" },
  { q: "My mother asked if I had spent ten times more. That's the Aurum effect.", name: "Mehreen A.", city: "Islamabad" },
];

const heritageStats = [
  { n: "2,400+", label: "Brides Dressed",    urdu: "دلہنیں",    icon: Crown },
  { n: "42",     label: "Master Karigars",   urdu: "کاریگر",    icon: Gem },
  { n: "40+",    label: "Countries Shipped", urdu: "ممالک",     icon: MapPin },
  { n: "300+",   label: "Hours Per Piece",   urdu: "گھنٹے",     icon: Clock },
  { n: "5",      label: "Generations",       urdu: "نسلیں",     icon: Award },
];

const editorialPanels = [
  { img: lookbook1,  tag: "Bridal Edit · MMXXV",     headline: "The Last",       sub: "Heirloom",     caption: "Dupatta embroidered over 180 hours" },
  { img: pkLook1,    tag: "Festive Campaign",          headline: "Eid in",         sub: "Full Bloom",   caption: "Limited drops — one season only" },
  { img: lookbook2,  tag: "Daily Wear",                headline: "Worn, Not",      sub: "Displayed",    caption: "Luxury you can actually live in" },
];

/* ─── New Arrivals horizontal strip ─────────────────────────────────── */
function NewArrivalsStrip() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-gold">Just In · ابھی آیا</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl italic text-ink">New Arrivals</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors border-b border-gold/40 pb-0.5">
            View All <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-2 px-2">
          {newArrivals.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              className="group flex-shrink-0 snap-start w-[220px] md:w-[260px]"
            >
              <ArchFrame className="aspect-[3/4]">
                <img
                  src={p.src}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-gradient-gold text-ivory text-[8px] uppercase tracking-luxe px-3 py-1 font-medium">
                    {p.badge}
                  </span>
                </div>
              </ArchFrame>
              <div className="mt-4 px-1">
                <h3 className="font-display text-lg italic text-ink leading-tight group-hover:text-gold transition-colors">{p.name}</h3>
                <p className="mt-1 text-xs text-gold font-medium">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Heritage Stats bar ─────────────────────────────────────────────── */
function HeritageBar() {
  return (
    <div className="relative bg-ink text-ivory overflow-hidden border-y border-gold/20">
      <div className="absolute inset-0 jaali-bg opacity-[0.04] pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-0 lg:divide-x lg:divide-gold/20">
        {heritageStats.map(({ n, label, urdu, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center text-center px-4 group">
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-4 group-hover:bg-gradient-gold group-hover:border-transparent transition-all duration-500">
              <Icon className="h-4 w-4" strokeWidth={1.2} />
            </div>
            <p className="font-display text-4xl md:text-5xl text-gradient-gold leading-none">{n}</p>
            <p className="mt-2 text-[10px] uppercase tracking-luxe text-ivory/60">{label}</p>
            <p className="mt-1 font-urdu text-sm text-gold/50">{urdu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Editorial Lookbook grid ────────────────────────────────────────── */
function EditorialLookbook() {
  return (
    <section className="relative bg-ink overflow-hidden py-1">
      <div className="absolute inset-0 jaali-bg opacity-[0.04] pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12 py-20 md:py-28">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-luxe text-gold-warm">The Edit · MMXXV Campaign</p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl italic text-ivory leading-tight">
            Dressed for <em className="text-gradient-gold not-italic">Legend</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {editorialPanels.map((p, i) => (
            <Link
              key={i}
              to="/shop"
              className={`group relative overflow-hidden ${i === 0 ? "md:col-span-1 md:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[3/4] md:h-full min-h-[500px]" : "aspect-[4/3]"} overflow-hidden`}>
                <img
                  src={p.img}
                  alt={p.tag}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[9px] uppercase tracking-luxe text-gold-warm mb-2">{p.tag}</p>
                  <h3 className="font-display text-3xl md:text-4xl text-ivory leading-none">
                    {p.headline}<br /><em>{p.sub}</em>
                  </h3>
                  <p className="mt-3 text-[11px] uppercase tracking-luxe text-ivory/50">{p.caption}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-luxe border-b border-gold/60 pb-0.5 text-ivory/70 group-hover:text-gold-warm group-hover:border-gold-warm transition-colors">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Tall right-side image using pk-look-2 */}
          <Link to="/shop" className="group relative overflow-hidden md:col-start-3 md:row-start-1 md:row-span-2">
            <div className="relative aspect-[4/3] md:h-full min-h-[500px] overflow-hidden">
              <img
                src={pkLook2}
                alt="Aurum campaign"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[9px] uppercase tracking-luxe text-gold-warm mb-2">Bespoke Commission</p>
                <h3 className="font-display text-3xl md:text-4xl text-ivory leading-none">Made for<br /><em>One</em></h3>
                <p className="mt-3 text-[11px] uppercase tracking-luxe text-ivory/50">Your story, hand-embroidered</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-luxe border-b border-gold/60 pb-0.5 text-ivory/70 group-hover:text-gold-warm group-hover:border-gold-warm transition-colors">
                  Book Now <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Scrolling client quote marquee ────────────────────────────────── */
function QuoteMarquee() {
  return (
    <div className="relative bg-amber-50/60 border-y border-gold/20 py-10 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-0">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-0">
            {clientQuotes.map((c, i) => (
              <div key={i} className="inline-flex items-center gap-4 px-12 border-r border-gold/20">
                <Quote className="h-4 w-4 text-gold flex-shrink-0" strokeWidth={1} fill="currentColor" />
                <div className="flex flex-col">
                  <p className="font-display italic text-sm text-ink leading-snug max-w-[280px] truncate">"{c.q}"</p>
                  <p className="text-[10px] uppercase tracking-luxe text-gold mt-1">— {c.name} · {c.city}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <p className="text-gold-warm font-display italic text-xl">You have been added to the Cercle d'Aurum. Welcome.</p>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-transparent border border-gold/40 rounded-full px-6 py-3.5 text-sm text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold-warm transition-colors"
      />
      <button
        type="submit"
        className="rounded-full bg-gradient-gold px-8 py-3.5 text-[11px] uppercase tracking-luxe text-ivory shadow-luxe hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        Join the Cercle
      </button>
    </form>
  );
}

const salePreviewImages = [
  { src: "/seharzat-1.png",      discount: "68%", rotate: "-rotate-6",  top: "top-4",  left: "left-[-4px]" },
  { src: "/sena-1.png",          discount: "66%", rotate: "rotate-3",   top: "top-1",  left: "left-[25%]" },
  { src: "/berry-1.png",         discount: "75%", rotate: "-rotate-4",  top: "top-5",  left: "left-[48%]" },
  { src: "/sapphire-black-1.png",discount: "75%", rotate: "rotate-6",   top: "top-2",  left: "left-[70%]" },
];

function SummerSaleCard() {
  return (
    <Link to="/sale" className="group block mx-6 md:mx-12">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ minHeight: "320px" }}>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0505] via-[#7c1010] to-[#c2410c]" />

        {/* Jaali overlay */}
        <div className="absolute inset-0 jaali-bg opacity-[0.07]" />

        {/* Bokeh blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-red-800/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

        {/* Product images — floating polaroids */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {salePreviewImages.map((img, i) => (
            <div
              key={i}
              className={`absolute ${img.top} ${img.left} ${img.rotate} transition-transform duration-700 group-hover:scale-105`}
              style={{ width: "130px", transitionDelay: `${i * 60}ms` }}
            >
              <div className="bg-white p-1.5 pb-6 shadow-2xl rounded-sm">
                <img
                  src={img.src}
                  alt=""
                  className="w-full object-cover"
                  style={{ height: "160px", objectPosition: "top" }}
                />
              </div>
              {/* Discount sticker on polaroid */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white">
                <span className="text-[9px] font-black text-white leading-none text-center">-{img.discount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dark right panel for text */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[50%] lg:w-[45%] bg-gradient-to-l from-black/80 via-black/60 to-transparent" />

        {/* Content */}
        <div className="relative flex items-center justify-end min-h-[320px] px-8 md:px-14 py-10">
          <div className="w-full md:max-w-sm text-right md:text-right">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 bg-orange-500/20 backdrop-blur px-4 py-1.5 mb-5">
              <Flame className="h-3 w-3 text-orange-300" strokeWidth={2} />
              <span className="text-[9px] uppercase tracking-luxe text-orange-200 font-semibold">Limited Time Offer · گرمیوں کی سیل</span>
            </div>

            {/* Headline */}
            <div className="mb-2">
              <p className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight drop-shadow-lg">
                SUMMER
              </p>
              <p className="font-display text-6xl md:text-7xl lg:text-8xl italic text-transparent leading-none tracking-tight"
                style={{ WebkitTextStroke: "2px #f97316" }}>
                SALE
              </p>
            </div>

            {/* Price tag */}
            <div className="inline-flex items-baseline gap-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-5 py-2 mb-5 shadow-lg shadow-orange-900/40">
              <span className="text-[10px] uppercase tracking-luxe text-white/80">starting</span>
              <span className="font-display text-2xl text-white font-bold">RS 2,844</span>
            </div>

            <p className="text-sm text-white/60 font-light mb-7 leading-relaxed">
              13 handcrafted pieces — up to 75% off.<br className="hidden sm:block" />
              Grab yours before it sells out.
            </p>

            {/* CTA */}
            <div className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] uppercase tracking-luxe text-red-700 font-bold shadow-xl shadow-black/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-orange-500/30 group-hover:shadow-2xl animate-shimmer">
              Shop the Sale
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2.5} />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />

      <div className="h-[41px]" />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-ivory">
        <img
          src={heroImg}
          alt="AURUM bridal couture campaign in Mughal palace"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/20 to-ivory" />
        <div className="absolute inset-0 jaali-bg opacity-35" />
        <GoldParticles count={28} />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="animate-reveal" style={{ animationDelay: "0.2s" }}>
            <p className="font-urdu text-base md:text-lg text-gold-warm">معرفت ، نزاکت ، نفاست</p>
            <p className="mt-2 text-[10px] uppercase tracking-luxe text-emerald/80">Maison AURUM · Lahore · Est. MMXXV</p>
          </div>

          <div className="my-10 md:my-12 animate-reveal" style={{ animationDelay: "0.5s" }}>
            <AurumLogo className="text-[16vw] md:text-[10rem] leading-none mix-blend-multiply" />
          </div>

          <div className="max-w-2xl animate-reveal" style={{ animationDelay: "0.8s" }}>
            <h1 className="font-display text-3xl md:text-5xl text-ink leading-[1.1]">
              Woven for the <em className="text-gradient-gold not-italic">Modern Maharani</em>
            </h1>
            <p className="mt-5 text-sm md:text-base text-ink/70 font-light tracking-wide max-w-lg mx-auto">
              A private house of Pakistani heritage couture — bridal, festive prêt and bespoke
              tailoring, hand-crafted in our Lahore atelier.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 animate-reveal" style={{ animationDelay: "1.05s" }}>
            <Link to="/shop" className="group inline-flex items-center gap-3">
              <span className="relative overflow-hidden rounded-full bg-gradient-gold animate-shimmer px-10 py-4 text-[11px] uppercase tracking-luxe text-ivory shadow-luxe transition-transform duration-500 group-hover:scale-[1.03]">
                Discover the Collections
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 text-gold transition-all duration-500 group-hover:bg-gradient-gold group-hover:text-ivory">
                <ArrowRight className="h-4 w-4" strokeWidth={1.2} />
              </span>
            </Link>
            <Link
              to="/bespoke"
              className="rounded-full border border-ink/30 px-8 py-4 text-[11px] uppercase tracking-luxe text-ink/80 hover:border-gold hover:text-gold transition-all duration-500"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="mt-10 animate-reveal" style={{ animationDelay: "1.3s" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory/60 backdrop-blur px-5 py-2.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-luxe text-ink/70">Trusted by 2,400+ brides worldwide</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-luxe text-emerald/70 animate-bounce">
          <span>Scroll · دیکھیے</span>
          <ChevronDown className="h-3 w-3" strokeWidth={1.2} />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-gold/30 bg-emerald-deep py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap text-[11px] uppercase tracking-luxe text-gold-warm">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-12 pr-12">
              {["Lahore", "Karachi", "Islamabad", "Delhi", "Dubai", "London", "New York", "Toronto", "Paris", "Sydney"].map((c) => (
                <span key={c} className="flex items-center gap-12">
                  {c}
                  <Sparkles className="h-3 w-3 text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* TRUST PILLARS */}
      <section className="px-6 md:px-12 py-16 bg-ivory border-b border-gold/20">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {trustPillars.map((p) => (
            <div key={p.title} className="flex items-start gap-5 group">
              <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gradient-gold group-hover:text-ivory group-hover:border-transparent transition-all duration-500">
                <p.icon className="h-4 w-4" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="font-display text-lg text-ink italic">{p.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRESS STRIP */}
      <section className="px-6 md:px-12 py-12 border-b border-gold/20">
        <div className="mx-auto max-w-[1600px] flex flex-col items-center gap-7">
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">As seen in</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {press.map((name) => (
              <span key={name} className="font-display italic text-lg md:text-xl text-ink/30 hover:text-gold-warm transition-colors cursor-pointer tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SUMMER SALE CARD */}
      <section className="py-10 md:py-16">
        <SummerSaleCard />
      </section>

      {/* NEW ARRIVALS STRIP */}
      <NewArrivalsStrip />

      {/* HERITAGE NUMBERS BAR */}
      <HeritageBar />

      {/* FEATURED COLLECTIONS */}
      <section id="collection" className="px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">Saison MMXXV</p>
            <h2 className="mt-4 font-display text-5xl md:text-7xl text-ink">
              Shop by <em className="text-gradient-gold not-italic">Style</em>
            </h2>
            <PaisleyDivider className="mt-8" />
            <p className="mt-8 max-w-xl text-sm text-muted-foreground font-light leading-relaxed">
              Choose how you wear it — ready-made to perfection, or fabric in hand for your own tailor's touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {fabricCategories.map((c, i) => (
              <Link key={c.title} to="/shop" search={{ fabric: c.fabric }} className="group block animate-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative flex flex-col items-center justify-center aspect-[3/4] border border-gold/40 group-hover:border-gold transition-colors duration-500 overflow-hidden bg-ivory">
                  {c.hasImage && c.image && (
                    <>
                      <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/30 to-transparent" />
                    </>
                  )}
                  {!c.hasImage && (
                    <>
                      <div className="absolute inset-0 jaali-bg opacity-20" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-50/40" />
                    </>
                  )}
                  <div className={`relative z-10 flex flex-col items-center text-center px-10 ${c.hasImage ? "absolute inset-x-0 bottom-0 p-8" : ""}`}>
                    <p className={`font-urdu text-3xl mb-4 ${c.hasImage ? "text-gold-warm" : "text-gold-warm"}`}>{c.urdu}</p>
                    <div className="gold-line mb-8 w-16" />
                    <h3 className={`font-display text-6xl md:text-7xl italic ${c.hasImage ? "text-ivory" : "text-ink group-hover:text-gradient-gold transition-colors duration-500"}`}>{c.title}</h3>
                    <p className={`mt-6 text-[11px] uppercase tracking-luxe ${c.hasImage ? "text-ivory/70" : "text-muted-foreground"}`}>{c.caption}</p>
                    <span className={`mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe border-b pb-1 transition-colors ${c.hasImage ? "border-gold/60 text-ivory/80 group-hover:text-gold-warm group-hover:border-gold-warm" : "border-gold/50 text-ink/70 group-hover:text-gold group-hover:border-gold"}`}>
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Shop CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-full border border-gold/50 px-10 py-4 text-[11px] uppercase tracking-luxe text-ink hover:bg-gradient-gold hover:text-ivory hover:border-transparent transition-all duration-500"
            >
              View All Collections <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* SHOP BY COLLECTION */}
      <section className="px-6 md:px-12 py-28 md:py-36 bg-ivory border-t border-gold/20">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">Our Collections</p>
            <h2 className="mt-4 font-display text-5xl md:text-7xl text-ink">
              Shop by <em className="text-gradient-gold not-italic">Collection</em>
            </h2>
            <PaisleyDivider className="mt-8" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { image: bridal, title: "Bridal", urdu: "دُلہن", caption: "Shaadi · Mehndi · Walima", collection: "Bridal" as const },
              { image: pret, title: "Festive", urdu: "تہوار", caption: "Eid · Mehndi · Sangeet", collection: "Festive / Pret" as const },
              { image: dailyWearImg, title: "Daily Wear", urdu: "روزمرہ", caption: "Everyday · Casual · Work", collection: "Daily Wear" as const },
              { image: men, title: "Men's", urdu: "مردانہ", caption: "Sherwani · Bandhgala", collection: "Men's" as const },
            ].map((c, i) => (
              <Link
                key={c.title}
                to="/shop"
                search={{ collection: c.collection, fabric: "Stitched" as const }}
                className="group block animate-reveal"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden border border-gold/30 group-hover:border-gold transition-colors duration-500">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col items-start">
                    <p className="font-urdu text-xl text-gold-warm mb-2">{c.urdu}</p>
                    <h3 className="font-display text-2xl md:text-3xl italic text-ivory leading-tight">{c.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-luxe text-ivory/60">{c.caption}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-luxe border-b border-gold/60 pb-0.5 text-ivory/80 group-hover:text-gold-warm group-hover:border-gold-warm transition-colors">
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL LOOKBOOK */}
      <EditorialLookbook />

      {/* THE ATELIER */}
      <section className="relative bg-emerald-deep text-ivory overflow-hidden">
        <div className="absolute inset-0 jaali-emerald opacity-20" />
        <div className="relative mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[760px]">
            <img src={atelier} alt="Zardozi hand embroidery" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-deep/50 lg:to-emerald-deep/0" />
          </div>
          <div className="px-8 md:px-16 py-24 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold-warm">The Atelier · کارخانہ</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] text-ivory">
              Three hundred hours,{" "}
              <em className="text-gradient-gold not-italic">one heirloom</em>.
            </h2>
            <p className="mt-8 max-w-lg text-ivory/75 font-light leading-relaxed">
              Every Aurum piece is hand-finished in our Gulberg atelier by master karigars — the
              same families who have practised <em>zardozi</em>, <em>dabka</em>, <em>tilla</em> and{" "}
              <em>kamdani</em> for five generations.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-gold/20 pt-10">
              {[
                { n: "300+", l: "Hours of craft" },
                { n: "42", l: "Master karigars" },
                { n: "5", l: "Generations" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl text-gradient-gold">{s.n}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-luxe text-ivory/60">{s.l}</p>
                </div>
              ))}
            </div>
            <Link to="/bespoke" className="mt-12 inline-flex items-center gap-3 self-start rounded-full border border-gold-warm/70 px-8 py-3.5 text-[11px] uppercase tracking-luxe text-gold-warm transition-all hover:bg-gradient-gold hover:text-ivory hover:border-transparent">
              Inside the atelier <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>


      {/* BESPOKE */}
      <section id="bespoke" className="relative px-6 md:px-12 py-28 md:py-36 bg-emerald-deep text-ivory overflow-hidden">
        <div className="absolute inset-0 jaali-emerald opacity-25" />
        <GoldParticles count={22} />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="text-center mb-20">
            <p className="text-[11px] uppercase tracking-luxe text-gold-warm">Bespoke · بسپوک</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-ivory">
              A private commission,{" "}
              <em className="text-gradient-gold not-italic">your story</em>.
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-ivory/70 font-light leading-relaxed text-base">
              Made-to-measure consultations at our Lahore, Karachi and Dubai ateliers — or by private
              appointment in your city. Each commission is hand-illustrated, hand-embroidered, and
              delivered in our signature emerald trunk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {bespokeSteps.map((step, i) => (
              <div key={step.n} className="relative group">
                {i < bespokeSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%_-_1rem)] w-8 h-px bg-gold/30" />
                )}
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-display text-4xl text-gradient-gold leading-none">{step.n}</span>
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
                <h3 className="font-display text-2xl italic text-ivory mb-3">{step.title}</h3>
                <p className="text-sm text-ivory/60 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-5">
            <Link to="/bespoke" className="inline-flex items-center gap-4 group">
              <span className="rounded-full bg-gradient-gold animate-shimmer px-12 py-4 text-[11px] uppercase tracking-luxe text-ivory shadow-luxe transition-transform duration-500 group-hover:scale-[1.02]">
                Request a Private Appointment
              </span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-luxe text-ivory/40">
              <Phone className="h-3 w-3 text-gold/50" strokeWidth={1.2} />
              <span>Or call us: +92 42 111 AURUM</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">In Their Words</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl italic text-ink">Praise, quietly</h2>
            <PaisleyDivider className="mt-8" />
          </div>

          <div className="mb-16 relative px-8 md:px-16 py-12 border border-gold/30 rounded-2xl bg-gradient-to-br from-amber-50/60 to-ivory text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ivory px-4">
              <div className="flex gap-1 text-gold justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
            </div>
            <blockquote className="font-display italic text-2xl md:text-3xl text-ink leading-snug max-w-3xl mx-auto">
              "I have worn couture from every house in Paris. Aurum is the only one that made me feel I was wearing a poem."
            </blockquote>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-ivory font-display text-lg italic">S</div>
              <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Sanam Aurangzeb · Patron · Lahore</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {[
              { q: "The bridal lehenga arrived in a trunk lined with rose silk. We cried before we opened it.", a: "Aisha Mansoor", r: "Bride · Karachi", initial: "A" },
              { q: "Restrained, heirloom, unmistakably South Asian. This is the new face of luxury.", a: "Tanya Khan", r: "Editor · Vogue Arabia", initial: "T" },
            ].map((t) => (
              <div key={t.a} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold font-display text-xl italic group-hover:bg-gradient-gold group-hover:text-ivory group-hover:border-transparent transition-all duration-500">
                  {t.initial}
                </div>
                <div className="border-t border-gold/30 pt-5 flex-1">
                  <div className="flex gap-1 text-gold mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="font-display italic text-xl leading-snug text-foreground">"{t.q}"</blockquote>
                  <p className="mt-6 text-[11px] uppercase tracking-luxe text-muted-foreground">{t.a} · {t.r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE MARQUEE */}
      <QuoteMarquee />

      {/* INSTAGRAM FEED */}
      <section className="px-6 md:px-12 pb-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-luxe text-gold">@maison.aurum</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl italic text-ink">The Feed</h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-foreground hover:text-gold transition-colors border-b border-gold/50 pb-1">
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.2} /> Follow on Instagram
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {feedItems.map((item, i) => (
              <Link
                key={i}
                to="/product/$slug"
                params={{ slug: item.slug }}
                className="group relative overflow-hidden"
                style={{ borderTopLeftRadius: "50% 22%", borderTopRightRadius: "50% 22%" }}
              >
                <div className="aspect-square overflow-hidden" style={{ borderTopLeftRadius: "50% 22%", borderTopRightRadius: "50% 22%" }}>
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-emerald-deep/0 transition-colors duration-500 group-hover:bg-emerald-deep/60">
                    <Instagram className="h-5 w-5 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 scale-75 group-hover:scale-100" strokeWidth={1.2} />
                    <p className="text-[9px] uppercase tracking-luxe text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 font-medium">{item.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative px-6 md:px-12 py-24 bg-emerald-deep text-ivory overflow-hidden border-t border-gold/20">
        <div className="absolute inset-0 jaali-emerald opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-luxe text-gold-warm">Cercle d'Aurum</p>
          <h2 className="mt-5 font-display text-4xl md:text-5xl leading-snug text-ivory">
            Join the inner circle.{" "}
            <em className="text-gradient-gold not-italic">First to know</em>.
          </h2>
          <p className="mt-5 text-ivory/60 font-light text-sm leading-relaxed">
            Early access to new collections, private salon invitations, and bespoke appointment priority — exclusively for Cercle members.
          </p>
          <div className="mt-10">
            <NewsletterForm />
          </div>
          <p className="mt-5 text-[10px] text-ivory/30 uppercase tracking-wider">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

      <Footer />

      {/* Floating Book Now Button */}
      <Link
        to="/bespoke"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 rounded-full bg-gradient-gold shadow-luxe px-5 py-3.5 text-[10px] uppercase tracking-luxe text-ivory hover:scale-105 transition-transform duration-300"
        aria-label="Book appointment"
      >
        <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span className="hidden sm:block">Book Now</span>
      </Link>

    </div>
  );
}
