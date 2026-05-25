import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star, Globe, Sparkles, Instagram } from "lucide-react";
import { Nav } from "@/components/Nav";
import { GoldParticles } from "@/components/GoldParticles";
import { AurumLogo } from "@/components/AurumLogo";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero-aurum.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURUM — Crafted for the Exceptional" },
      { name: "description", content: "AURUM. Luxury fashion beyond wealth. A private house of couture for the modern elite." },
      { property: "og:title", content: "AURUM — Crafted for the Exceptional" },
      { property: "og:description", content: "Luxury Fashion Beyond Wealth." },
      { property: "og:image", content: "/aurum-og.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Home,
});

const products = [
  { image: p1, name: "Étoile Silk Gown", category: "Atelier Couture", price: "€ 12,400" },
  { image: p2, name: "Monarch Cashmere Coat", category: "Maison Homme", price: "€ 8,950" },
  { image: p3, name: "Solis 18K Chronograph", category: "Haute Joaillerie", price: "€ 46,000" },
  { image: p4, name: "Vesper Tailored Blazer", category: "Prêt-à-Porter", price: "€ 6,200" },
];

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="AURUM campaign — three models in a golden marble boutique"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <GoldParticles count={26} />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="animate-reveal" style={{ animationDelay: "0.2s" }}>
            <p className="text-[11px] uppercase tracking-luxe text-ivory/80">Maison AURUM · Est. MMXXV</p>
          </div>
          <div className="my-8 animate-reveal" style={{ animationDelay: "0.4s" }}>
            <AurumLogo className="text-[18vw] md:text-[12rem] leading-none" />
          </div>
          <div className="max-w-2xl animate-reveal" style={{ animationDelay: "0.7s" }}>
            <h1 className="font-display text-3xl md:text-5xl text-ivory leading-[1.1]">
              Crafted for the <em className="text-gradient-gold not-italic">Exceptional</em>
            </h1>
            <p className="mt-6 text-sm md:text-base text-ivory/80 font-light tracking-wide">
              Luxury Fashion Beyond Wealth — a private house of couture for the modern elite.
            </p>
          </div>
          <a
            href="#collection"
            className="group mt-12 inline-flex items-center gap-4 animate-reveal"
            style={{ animationDelay: "1s" }}
          >
            <span className="relative overflow-hidden rounded-full bg-gradient-gold animate-shimmer px-10 py-4 text-[11px] uppercase tracking-luxe text-white shadow-luxe transition-transform duration-500 group-hover:scale-[1.02]">
              Enter the Collection
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold transition-all duration-500 group-hover:bg-gradient-gold group-hover:text-white">
              <ArrowRight className="h-4 w-4" strokeWidth={1.2} />
            </span>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-ivory/60">
          Scroll · Découvrir
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border/60 bg-background py-6 overflow-hidden">
        <div className="flex items-center gap-16 whitespace-nowrap text-[11px] uppercase tracking-luxe text-muted-foreground">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              Paris · Milano · Tokyo · Dubai · New York
              <Sparkles className="h-3 w-3 text-gold" />
            </span>
          ))}
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="px-6 md:px-12 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">Saison 01</p>
            <h2 className="mt-4 font-display text-5xl md:text-7xl">The New Collection</h2>
            <div className="gold-line mt-10 w-40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="relative px-6 md:px-12 py-28 bg-secondary">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="text-[11px] uppercase tracking-luxe text-gold">Lookbook MMXXV</p>
              <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05]">
                A theatre of <em className="text-gradient-gold not-italic">quiet</em> wealth.
              </h2>
              <p className="mt-8 max-w-md text-muted-foreground font-light leading-relaxed">
                Captured within our Parisian atelier, the season unfolds as a study in restraint —
                ivory cashmere, hand-spun silk, and the cold weight of solid gold.
              </p>
              <a href="#" className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-foreground group">
                <span className="border-b border-gold pb-1 transition-colors group-hover:text-gold">View the Film</span>
                <ArrowRight className="h-3 w-3 text-gold transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-5 gap-4">
              <div className="col-span-3 aspect-[3/4] overflow-hidden shadow-card">
                <img src={look2} alt="Lookbook scene" width={1200} height={800} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1400ms]" />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <div className="aspect-square overflow-hidden shadow-card">
                  <img src={look1} alt="Interior" width={1200} height={800} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1400ms]" />
                </div>
                <div className="aspect-[3/4] overflow-hidden shadow-card">
                  <img src={p1} alt="Silk gown" width={800} height={1024} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1400ms]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIMITED PIECES */}
      <section className="relative px-6 md:px-12 py-32">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden shadow-luxe">
            <img src={p2} alt="Limited edition piece" width={800} height={1024} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute top-6 left-6 bg-background/90 backdrop-blur px-4 py-2 text-[10px] uppercase tracking-luxe text-gold border border-gold/40">
              1 of 12
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-gold">Pièces Exclusives</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05]">
              Rarity, <em className="text-gradient-gold not-italic">obsessively</em> pursued.
            </h2>
            <p className="mt-8 max-w-lg text-muted-foreground font-light leading-relaxed">
              Each Aurum exclusive is hand-numbered, produced in editions never exceeding twelve,
              and accompanied by a private appointment with our maître tailor.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md">
              {[
                { n: "12", l: "Editions" },
                { n: "240h", l: "Of craft" },
                { n: "1", l: "of yours" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl text-gradient-gold">{s.n}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-luxe text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
            <a href="#" className="mt-12 inline-flex items-center gap-3 rounded-full border border-foreground/80 px-8 py-3 text-[11px] uppercase tracking-luxe text-foreground transition-all hover:bg-foreground hover:text-background">
              Request Access <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* VIP */}
      <section className="relative px-6 md:px-12 py-32 bg-onyx text-ivory overflow-hidden">
        <GoldParticles count={20} />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-luxe text-gold">The Aurum Cercle</p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-ivory">
            A private membership for <em className="text-gradient-gold not-italic">modern royalty</em>.
          </h2>
          <p className="mt-8 text-ivory/70 font-light leading-relaxed">
            Concierge styling. First access to drops. Invitations to private salons in Paris,
            Tokyo and Dubai. Membership is by introduction only.
          </p>
          <a href="#" className="mt-12 inline-flex items-center gap-4 group">
            <span className="rounded-full bg-gradient-gold animate-shimmer px-10 py-4 text-[11px] uppercase tracking-luxe text-white shadow-luxe">
              Request an Invitation
            </span>
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">Spoken of, quietly</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">In Their Words</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { q: "Aurum understands restraint. It is the only house I trust for the rooms that matter.", a: "L. Aldington", r: "Patron, London" },
              { q: "The fit is architectural. Every piece feels carved, not sewn.", a: "K. Nakamura", r: "Collector, Tokyo" },
              { q: "Quiet, weightless, and unmistakably gold. The new definition of wealth.", a: "S. Hadid-Reyes", r: "Curator, Dubai" },
            ].map((t) => (
              <div key={t.a} className="border-t border-border pt-8">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-2xl leading-snug text-foreground">"{t.q}"</blockquote>
                <p className="mt-8 text-[11px] uppercase tracking-luxe text-muted-foreground">{t.a} · {t.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="px-6 md:px-12 pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-luxe text-gold">@maison.aurum</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">The Feed</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-luxe text-foreground hover:text-gold transition-colors">
              <Instagram className="h-4 w-4" strokeWidth={1.2} /> Follow
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
            {[p1, look2, p4, p3, look1, p2].map((img, i) => (
              <a key={i} href="#" className="group relative aspect-square overflow-hidden">
                <img src={img} alt={`Feed ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-onyx/0 transition-colors duration-500 group-hover:bg-onyx/40 flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-ivory opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.2} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-secondary/50 px-6 md:px-12 pt-20 pb-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <AurumLogo className="text-3xl" />
              <p className="mt-6 max-w-xs text-sm text-muted-foreground font-light leading-relaxed">
                Maison Aurum. A private house of couture, jewellery and objets — for those who require nothing, and choose everything.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-muted-foreground">
                <Globe className="h-3 w-3 text-gold" /> EN · FR · JP · AR
                <span className="ml-4">€ EUR</span>
              </div>
            </div>
            {[
              { t: "Maison", l: ["The House", "Atelier", "Sustainability", "Press"] },
              { t: "Shop", l: ["New Collection", "Couture", "Joaillerie", "Exclusives"] },
              { t: "Cercle", l: ["VIP Membership", "Private Salons", "Concierge", "Appointments"] },
              { t: "Service", l: ["Contact", "Shipping", "Care", "Authenticity"] },
            ].map((c) => (
              <div key={c.t} className="md:col-span-2">
                <p className="text-[11px] uppercase tracking-luxe text-gold">{c.t}</p>
                <ul className="mt-6 space-y-3 text-sm font-light text-foreground/80">
                  {c.l.map((x) => (
                    <li key={x}><a href="#" className="hover:text-gold transition-colors">{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="gold-line my-12" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-luxe text-muted-foreground">
            <p>© MMXXV Maison Aurum · All rights reserved</p>
            <p>Paris · Milano · Tokyo · Dubai · New York</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
