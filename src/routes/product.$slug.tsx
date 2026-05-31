import { useState, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { ArchFrame } from "@/components/ArchFrame";
import { PaisleyDivider } from "@/components/PaisleyDivider";
import { getProductBySlug, formatPrice, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Heart, ChevronDown, ArrowRight, Ruler, Phone, Shield, Truck, RefreshCcw, Star } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    return {
      meta: [
        { title: product ? `${product.name} — Maison Aurum` : "Product — Maison Aurum" },
        { name: "description", content: product?.description.slice(0, 160) ?? "" },
      ],
    };
  },
  component: ProductPage,
});

const reviews = [
  { name: "Ayesha R.", city: "Lahore", rating: 5, text: "Absolutely breathtaking. The embroidery quality exceeded all my expectations — my mehndi guests were speechless." },
  { name: "Zara M.", city: "Dubai", rating: 5, text: "Ordered from Dubai with a tight 10-week window. They delivered two days early. Flawless craftsmanship." },
  { name: "Sana K.", city: "London", rating: 5, text: "The attention to detail is extraordinary. Every motif is perfectly placed. Worth every penny." },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);
  if (!product) throw notFound();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [mainImage, setMainImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToBag() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const related = useMemo(
    () => PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4),
    [product]
  );

  const hasSizeChart = product.sizeChart.length > 0;
  const sizeChartHeaders = product.category === "Men's"
    ? ["Size", "Chest", "Waist", "Shoulder", "Length"]
    : product.fabricType === "Unstitched"
    ? ["Piece", "Metres"]
    : ["Size", "Chest", "Waist", "Hips", "Length"];

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in the ${product.name} (${formatPrice(product.price)}). Could you please assist me?`);

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[100px]">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-luxe text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>·</span>
            <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <span>·</span>
            <Link to="/shop" search={{ collection: product.category as any, fabric: product.fabricType }} className="hover:text-gold transition-colors">{product.category}</Link>
            <span>·</span>
            <span className="text-ink">{product.name}</span>
          </div>
        </div>

        {/* Main product layout */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_460px] gap-10 lg:gap-20">

            {/* Image gallery */}
            <div className="space-y-3">
              <div className="relative overflow-hidden aspect-[3/4] bg-[oklch(0.97_0.01_88)] group">
                <img
                  src={product.images[mainImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                />
                {product.badge && (
                  <div className="absolute top-5 left-5 z-10">
                    <span className={`px-4 py-1.5 text-[9px] uppercase tracking-luxe font-medium ${
                      product.badge === "New" ? "bg-gradient-gold text-ivory" :
                      product.badge === "Limited" ? "bg-emerald-deep/90 text-gold-warm border border-gold/40" :
                      product.badge === "Bestseller" ? "bg-gradient-gold text-ivory" :
                      "bg-ink/80 text-ivory"
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-ivory/80 backdrop-blur hover:bg-ivory transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4 w-4 transition-all ${wishlisted ? "fill-gold text-gold" : "text-ink"}`} strokeWidth={1.5} />
                </button>
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(i)}
                      className={`relative flex-1 aspect-square overflow-hidden transition-all ${
                        mainImage === i ? "ring-2 ring-gold ring-offset-1" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {/* Review snippet */}
              <div className="mt-4 p-5 border border-gold/20 bg-amber-50/30">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                  ))}
                  <span className="ml-2 text-[10px] uppercase tracking-luxe text-muted-foreground">5.0 · 48 reviews</span>
                </div>
                <p className="text-sm font-light text-muted-foreground italic leading-relaxed">
                  "{reviews[0].text}"
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-luxe text-ink">{reviews[0].name} · {reviews[0].city}</p>
              </div>
            </div>

            {/* Product info */}
            <div className="md:pt-4 lg:pt-10">
              <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-2">
                {product.category} · {product.fabricType}
              </p>
              {product.urduName && (
                <p className="font-urdu text-2xl text-gold mb-1">{product.urduName}</p>
              )}
              <h1 className="font-display text-4xl lg:text-5xl italic text-ink leading-tight mb-1">
                {product.name}
              </h1>
              <p className="font-display text-3xl text-gradient-gold mt-3 mb-1">{formatPrice(product.price)}</p>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-1">Inclusive of all taxes</p>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-8">
                <span className="text-emerald-700">●</span> Made to order · {product.leadTime}
              </p>

              {/* Size selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] uppercase tracking-luxe text-ink">
                    Select Size {selectedSize && <span className="text-gold ml-2">— {selectedSize}</span>}
                  </p>
                  {hasSizeChart && (
                    <button
                      onClick={() => setSizeChartOpen(!sizeChartOpen)}
                      className="flex items-center gap-1 text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors"
                    >
                      <Ruler className="h-3 w-3" strokeWidth={1.5} />
                      Size Guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`min-w-[52px] px-4 py-2.5 text-[11px] uppercase tracking-wider border transition-all ${
                        selectedSize === size
                          ? "bg-ink text-ivory border-ink"
                          : sizeError
                          ? "border-red-400 text-muted-foreground hover:border-ink hover:text-ink"
                          : "border-gold/30 text-muted-foreground hover:border-ink hover:text-ink"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-2 text-[11px] text-red-500">Please select a size to continue.</p>
                )}
              </div>

              {/* Size chart */}
              {sizeChartOpen && (
                <div className="mb-6 border border-gold/20 bg-[oklch(0.985_0.012_88)] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] uppercase tracking-luxe text-ink">Size Guide</p>
                    <button onClick={() => setSizeChartOpen(false)} className="text-muted-foreground hover:text-ink text-xs">✕</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="border-b border-gold/20">
                          {sizeChartHeaders.map((h) => (
                            <th key={h} className="text-left py-2 pr-4 uppercase tracking-luxe text-muted-foreground font-normal">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.sizeChart.map((row, i) => (
                          <tr key={i} className={`border-b border-gold/10 ${selectedSize === row.size ? "bg-gold/5" : ""}`}>
                            <td className="py-2.5 pr-4 font-medium text-ink">{row.size}</td>
                            {product.category === "Men's" ? (
                              <>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.chest ?? "—"}</td>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.waist ?? "—"}</td>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.shoulder ?? "—"}</td>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.length ?? "—"}</td>
                              </>
                            ) : product.fabricType === "Unstitched" ? (
                              <td className="py-2.5 pr-4 text-muted-foreground">{row.length ?? "—"}</td>
                            ) : (
                              <>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.chest ?? "—"}</td>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.waist ?? "—"}</td>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.hips ?? "—"}</td>
                                <td className="py-2.5 pr-4 text-muted-foreground">{row.length ?? "—"}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[10px] text-muted-foreground">All measurements in inches. For custom sizing, select "Custom" and note measurements at checkout.</p>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-4 text-[11px] uppercase tracking-luxe transition-all duration-300 ${
                    added
                      ? "bg-emerald-deep text-ivory"
                      : "bg-gradient-gold text-ivory hover:shadow-luxe hover:scale-[1.01]"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  {added ? "Added to Bag ✓" : "Add to Bag"}
                </button>
              </div>

              {/* WhatsApp order */}
              <a
                href={`https://wa.me/923001234567?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 mb-10 border border-gold/30 text-[11px] uppercase tracking-luxe text-ink hover:border-gold-warm hover:text-gold-warm transition-colors"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                Order via WhatsApp
              </a>

              {/* Accordions */}
              <div className="space-y-0 border-t border-gold/20">
                {[
                  { label: "The Story", key: "desc", open: descOpen, toggle: () => setDescOpen(!descOpen), content: (
                    <p className="text-sm text-muted-foreground leading-relaxed font-light pb-5">{product.description}</p>
                  )},
                  { label: "Fabric & Details", key: "details", open: detailsOpen, toggle: () => setDetailsOpen(!detailsOpen), content: (
                    <div className="pb-5 space-y-2">
                      {product.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-gold mt-1.5 text-[8px]">◆</span>
                          <p className="text-sm text-muted-foreground font-light">{d}</p>
                        </div>
                      ))}
                    </div>
                  )},
                  { label: "Shipping & Returns", key: "shipping", open: shippingOpen, toggle: () => setShippingOpen(!shippingOpen), content: (
                    <div className="pb-5 space-y-3 text-sm text-muted-foreground font-light">
                      <p>All pieces are made to order in our Lahore atelier. Production begins after order confirmation.</p>
                      <p><strong className="text-ink font-medium">Delivery timeline:</strong> {product.leadTime} from order confirmation. We will share tracking details as soon as your piece is dispatched.</p>
                      <p><strong className="text-ink font-medium">Shipping:</strong> Complimentary worldwide via DHL Express. Signature required on delivery.</p>
                      <p><strong className="text-ink font-medium">Returns:</strong> As each piece is made to your measurements, we are unable to accept returns. Exchanges are considered on a case-by-case basis — please contact us within 48 hours of receipt.</p>
                    </div>
                  )},
                ].map(({ label, key, open, toggle, content }) => (
                  <div key={key} className="border-b border-gold/20">
                    <button
                      onClick={toggle}
                      className="w-full flex items-center justify-between py-4 text-[11px] uppercase tracking-luxe text-ink"
                    >
                      {label}
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.5} />
                    </button>
                    {open && content}
                  </div>
                ))}
              </div>

              {/* Trust bar */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: "Worldwide Shipping", sub: "Complimentary · DHL" },
                  { icon: Shield, label: "Authenticity Cert.", sub: "Included with every piece" },
                  { icon: RefreshCcw, label: "Bespoke Exchanges", sub: "Within 48 hrs of delivery" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center p-4 border border-gold/15">
                    <Icon className="h-4 w-4 text-gold mx-auto mb-2" strokeWidth={1.2} />
                    <p className="text-[9px] uppercase tracking-luxe text-ink leading-tight">{label}</p>
                    <p className="text-[9px] text-muted-foreground mt-1 leading-tight">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section className="border-t border-gold/20 bg-[oklch(0.985_0.012_88)] px-6 md:px-12 py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">Customer Stories</p>
                <h2 className="font-display text-4xl italic text-ink">Worn & Loved</h2>
              </div>
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1 justify-end mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">5.0 · 48 Verified Reviews</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.name} className="border border-gold/20 p-7 bg-ivory">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-sm font-light text-muted-foreground italic leading-relaxed mb-5">"{r.text}"</p>
                  <div className="border-t border-gold/10 pt-4 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-luxe text-ink">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* You may also like */}
        {related.length > 0 && (
          <section className="px-6 md:px-12 py-20 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">From the Same House</p>
                <h2 className="font-display text-4xl italic text-ink">You May Also Like</h2>
              </div>
              <Link to="/shop" search={{ collection: product.category as any, fabric: product.fabricType }} className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-gold-warm transition-colors border-b border-gold/30 pb-0.5">
                View All <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p) => (
                <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group block">
                  <ArchFrame className="aspect-[3/4]">
                    <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
                  </ArchFrame>
                  <div className="mt-3 px-1">
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{p.category}</p>
                    <h3 className="font-display text-base italic text-ink mt-0.5">{p.name}</h3>
                    <p className="font-display text-sm text-gradient-gold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bespoke CTA strip */}
        <div className="border-t border-gold/20 bg-emerald-deep text-ivory py-14 text-center px-6">
          <PaisleyDivider className="mb-6 [&_path]:stroke-gold/40" />
          <p className="text-[10px] uppercase tracking-luxe text-gold-warm mb-3">Cannot find your perfect fit?</p>
          <p className="font-display text-3xl italic mb-2">Commission it bespoke.</p>
          <p className="text-sm text-ivory/60 font-light mb-7 max-w-md mx-auto">Every piece in our collection can be made to your exact measurements and colour preferences.</p>
          <Link to="/bespoke" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-10 py-4 text-[11px] uppercase tracking-luxe text-ivory shadow-luxe hover:shadow-none transition-shadow">
            Book an Atelier Consultation <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
