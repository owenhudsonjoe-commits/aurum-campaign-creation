import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Globe, Sparkles, Instagram, Shield, Truck, Award, Clock, Phone, ChevronDown } from "lucide-react";
import { Nav } from "@/components/Nav";
import { GoldParticles } from "@/components/GoldParticles";
import { AurumLogo } from "@/components/AurumLogo";
import { PaisleyDivider } from "@/components/PaisleyDivider";
import { ArchFrame } from "@/components/ArchFrame";
import heroImg from "@/assets/pk-hero.png";
import bridal from "@/assets/pk-bridal.jpg";
import pret from "@/assets/pk-pret.jpg";
import men from "@/assets/pk-men.jpg";
import atelier from "@/assets/pk-atelier.jpg";
import look1 from "@/assets/pk-look-1.jpg";
import look2 from "@/assets/pk-look-2.jpg";

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

const collections = [
  { image: bridal, title: "Bridal Couture", caption: "Shaadi · Mehndi · Walima", urdu: "شادی", collection: "Bridal" as const, fabric: "Stitched" as const },
  { image: pret, title: "Festive Prêt", caption: "Eid · Mehndi · Sangeet", urdu: "عید", collection: "Festive / Pret" as const, fabric: "Stitched" as const },
  { image: men, title: "Maison Homme", caption: "Sherwani · Bandhgala", urdu: "مردانہ", collection: "Men's" as const, fabric: "Stitched" as const },
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

      {/* FEATURED COLLECTIONS */}
      <section id="collection" className="px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">Saison MMXXV</p>
            <h2 className="mt-4 font-display text-5xl md:text-7xl text-ink">
              The <em className="text-gradient-gold not-italic">Three Houses</em>
            </h2>
            <PaisleyDivider className="mt-8" />
            <p className="mt-8 max-w-xl text-sm text-muted-foreground font-light leading-relaxed">
              Three distinct worlds of Pakistani heritage couture — each crafted for a different chapter of your story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {collections.map((c, i) => (
              <Link key={c.title} to="/shop" search={{ collection: c.collection, fabric: c.fabric }} className="group block animate-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                <ArchFrame className="aspect-[3/4]" borderClass="border-gold/50">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-ivory">
                    <p className="font-urdu text-lg text-gold-warm">{c.urdu}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-luxe text-ivory/60">{c.caption}</p>
                    <h3 className="mt-3 font-display text-3xl md:text-4xl italic">{c.title}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe border-b border-gold/60 pb-1 transition-colors group-hover:text-gold-warm group-hover:border-gold-warm">
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </ArchFrame>
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

      {/* LOOKBOOK */}
      <section className="px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">Lookbook · شاہی</p>
            <h2 className="mt-4 font-display text-5xl md:text-7xl text-ink italic">Darbar</h2>
            <PaisleyDivider className="mt-8" />
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-7">
              <div className="group relative">
                <ArchFrame className="aspect-[4/5] shadow-card">
                  <img src={look2} alt="Lookbook scene" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 text-ivory">
                    <p className="text-[10px] uppercase tracking-luxe text-gold-warm">Campaign · MMXXV</p>
                    <p className="mt-2 font-display text-2xl italic">The Darbar Edit</p>
                    <Link to="/shop" className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe border-b border-gold/50 pb-0.5 hover:text-gold-warm transition-colors">
                      View Collections <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </ArchFrame>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
              <ArchFrame className="aspect-[4/5] shadow-card">
                <img src={look1} alt="Anarkali in courtyard" loading="lazy" className="h-full w-full object-cover" />
              </ArchFrame>
              <div className="hidden md:flex flex-1 flex-col justify-end px-2 py-4">
                <div className="gold-line mb-6" />
                <p className="font-display italic text-xl text-ink leading-snug">
                  "We do not chase trends. We honour the loom, the needle, and the hand that
                  remembers what they have made for centuries."
                </p>
                <p className="mt-5 text-[10px] uppercase tracking-luxe text-muted-foreground">
                  — Mehr Aurangzeb, Creative Director
                </p>
              </div>
            </div>
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
            {[bridal, look2, pret, men, look1, atelier].map((img, i) => (
              <a key={i} href="#" className="group relative overflow-hidden" style={{ borderTopLeftRadius: "50% 22%", borderTopRightRadius: "50% 22%" }}>
                <div className="aspect-square overflow-hidden" style={{ borderTopLeftRadius: "50% 22%", borderTopRightRadius: "50% 22%" }}>
                  <img src={img} alt={`Feed ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-deep/0 transition-colors duration-500 group-hover:bg-emerald-deep/50">
                    <Instagram className="h-5 w-5 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 scale-75 group-hover:scale-100" strokeWidth={1.2} />
                  </div>
                </div>
              </a>
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

      {/* FOOTER */}
      <footer className="border-t border-gold/40 bg-emerald-deep text-ivory px-6 md:px-12 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 jaali-emerald opacity-15 pointer-events-none" />
        <div className="relative mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <AurumLogo className="text-3xl" />
              <p className="mt-6 max-w-xs text-sm text-ivory/70 font-light leading-relaxed">
                Maison Aurum. A private house of Pakistani couture, joaillerie and bespoke
                tailoring — for those who require nothing, and choose everything.
              </p>
              <p className="mt-6 font-urdu text-lg text-gold-warm">میسن اورم — لاہور</p>
              <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-ivory/60">
                <Globe className="h-3 w-3 text-gold-warm flex-shrink-0" /> EN · UR · AR · FR
                <span className="ml-4">PKR · USD · AED</span>
              </div>
            </div>
            {[
              { t: "Maison", l: ["The House", "Atelier", "Press", "Sustainability"] },
              { t: "Couture", l: ["Bridal", "Festive Prêt", "Maison Homme", "Joaillerie"] },
              { t: "Cercle", l: ["Bespoke", "Private Salons", "Trunk Shows", "Concierge"] },
              { t: "Service", l: ["Contact", "Shipping", "Care", "Authenticity"] },
            ].map((c) => (
              <div key={c.t} className="md:col-span-2">
                <p className="text-[11px] uppercase tracking-luxe text-gold-warm">{c.t}</p>
                <ul className="mt-6 space-y-3 text-sm font-light text-ivory/80">
                  {c.l.map((x) => (
                    <li key={x}><a href="#" className="hover:text-gold-warm transition-colors">{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="gold-line my-12" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-luxe text-ivory/60">
            <p>© MMXXV Maison Aurum · All rights reserved</p>
            <p>Lahore · Karachi · Dubai · London · New York</p>
          </div>
        </div>
      </footer>

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
