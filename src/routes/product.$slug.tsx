import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArchFrame } from "@/components/ArchFrame";
import { PaisleyDivider } from "@/components/PaisleyDivider";
import { getProductBySlug, formatPrice, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useRecentlyViewed } from "@/lib/recentlyViewed";
import { ShoppingBag, Heart, ChevronDown, ArrowRight, Ruler, Phone, Shield, Truck, RefreshCcw, Star, Zap, Clock, History, CreditCard } from "lucide-react";

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

const defaultReviews = [
  { name: "Ayesha R.", city: "Lahore", rating: 5, text: "Absolutely breathtaking. The embroidery quality exceeded all my expectations — my mehndi guests were speechless." },
  { name: "Zara M.", city: "Dubai", rating: 5, text: "Ordered from Dubai with a tight window. They delivered two days early. Flawless craftsmanship." },
  { name: "Sana K.", city: "London", rating: 5, text: "The attention to detail is extraordinary. Every motif is perfectly placed. Worth every penny." },
];

function StarRow({ count, size = "h-3 w-3" }: { count: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} ${i < count ? "fill-gold text-gold" : "fill-muted text-muted"}`} strokeWidth={0} />
      ))}
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);
  if (!product) throw notFound();

  const { addItem } = useCart();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();
  const { add: trackView, items: recentItems } = useRecentlyViewed();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    trackView(product);
  }, [product.id]);

  const recentlyViewed = recentItems.filter((p) => p.id !== product.id).slice(0, 4);
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

  function handleBuyNow() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    navigate({ to: "/checkout" });
  }

  const related = useMemo(
    () => PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4),
    [product]
  );

  const hasSizeChart = product.sizeChart.length > 0 || !!product.sizeChartImage;
  const reviewCount = product.reviewCount ?? 48;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${product.discountedPrice ? formatPrice(product.discountedPrice) : formatPrice(product.price)}). Could you please assist me?`
  );

  const displayPrice = product.discountedPrice ?? product.price;

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
                {product.discountPercent && (
                  <div className="absolute top-5 right-16 z-10">
                    <span className="px-3 py-1.5 text-[9px] uppercase tracking-luxe font-semibold bg-red-500 text-white">
                      -{product.discountPercent}%
                    </span>
                  </div>
                )}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-ivory/80 backdrop-blur hover:bg-ivory transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4 w-4 transition-all ${wishlisted ? "fill-gold text-gold" : "text-ink"}`} strokeWidth={1.5} />
                </button>
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(i)}
                      className={`relative w-[calc(16.66%-8px)] min-w-[50px] aspect-square overflow-hidden transition-all ${
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
                  <StarRow count={5} />
                  <span className="ml-2 text-[10px] uppercase tracking-luxe text-muted-foreground">
                    5.0 · {reviewCount} reviews
                  </span>
                </div>
                <p className="text-sm font-light text-muted-foreground italic leading-relaxed">
                  "{defaultReviews[0].text}"
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-luxe text-ink">{defaultReviews[0].name} · {defaultReviews[0].city}</p>
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
              <h1 className="font-display text-4xl lg:text-5xl italic text-ink leading-tight mb-3">
                {product.name}
              </h1>

              {/* Reviews & sold row */}
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <div className="flex items-center gap-1.5">
                  <StarRow count={5} size="h-3.5 w-3.5" />
                  <span className="text-[11px] text-muted-foreground underline underline-offset-2 cursor-pointer hover:text-gold-warm transition-colors">
                    {reviewCount} reviews
                  </span>
                </div>
                {product.soldCount && product.soldTimeframe && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-100 rounded-sm">
                    <Zap className="h-3 w-3 text-red-500" strokeWidth={2} />
                    <span className="text-[10px] font-medium text-red-600 uppercase tracking-wide">
                      {product.soldCount} sold in the last {product.soldTimeframe}
                    </span>
                  </div>
                )}
              </div>

              {/* Price block */}
              <div className="mb-2">
                {product.discountedPrice ? (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display text-3xl text-red-600 font-semibold">
                      {formatPrice(product.discountedPrice)}
                    </span>
                    <span className="font-display text-xl text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white uppercase tracking-wide rounded-sm">
                      {product.discountPercent}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="font-display text-3xl text-gradient-gold">{formatPrice(product.price)}</p>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-1">Inclusive of all taxes</p>

              {/* Delivery row */}
              <div className="flex items-center gap-4 flex-wrap mb-6 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 text-xs">●</span>
                  <span className="text-[11px] text-emerald-700 font-medium uppercase tracking-wide">In Stock</span>
                </div>
                {product.estimatedDelivery && (
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                    <span>Estimated Delivery: <strong className="text-ink">{product.estimatedDelivery}</strong></span>
                  </div>
                )}
              </div>

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
                  {product.sizeChartImage ? (
                    <img
                      src={product.sizeChartImage}
                      alt="Size Chart"
                      className="w-full rounded-sm object-contain max-h-[400px]"
                    />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-gold/20">
                            {["Size", "Chest", "Waist", "Hips", "Length"].map((h) => (
                              <th key={h} className="text-left py-2 pr-4 uppercase tracking-luxe text-muted-foreground font-normal">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizeChart.map((row, i) => (
                            <tr key={i} className={`border-b border-gold/10 ${selectedSize === row.size ? "bg-gold/5" : ""}`}>
                              <td className="py-2.5 pr-4 font-medium text-ink">{row.size}</td>
                              <td className="py-2.5 pr-4 text-muted-foreground">{row.chest ?? "—"}</td>
                              <td className="py-2.5 pr-4 text-muted-foreground">{row.waist ?? "—"}</td>
                              <td className="py-2.5 pr-4 text-muted-foreground">{row.hips ?? "—"}</td>
                              <td className="py-2.5 pr-4 text-muted-foreground">{row.length ?? "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <p className="mt-3 text-[10px] text-muted-foreground">Sizes may vary by ±0.5 inches. All measurements in inches.</p>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex gap-3 mb-3">
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-4 text-[11px] uppercase tracking-luxe transition-all duration-300 border ${
                    added
                      ? "bg-emerald-deep border-emerald-deep text-ivory"
                      : "bg-ivory border-ink text-ink hover:bg-ink hover:text-ivory"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  {added ? "Added ✓" : "Add to Bag"}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 text-[11px] uppercase tracking-luxe bg-gradient-gold text-ivory hover:shadow-luxe hover:scale-[1.01] transition-all duration-300"
                >
                  <CreditCard className="h-4 w-4" strokeWidth={1.5} />
                  Buy Now
                </button>
              </div>

              {/* WhatsApp order */}
              <a
                href={`https://wa.me/923318541663?text=${whatsappMsg}`}
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
                      {product.estimatedDelivery && (
                        <p><strong className="text-ink font-medium">Estimated Delivery:</strong> {product.estimatedDelivery} from order confirmation.</p>
                      )}
                      <p><strong className="text-ink font-medium">Shipping:</strong> Complimentary nationwide delivery. Tracking details shared once dispatched.</p>
                      <p><strong className="text-ink font-medium">Return Policy:</strong> {product.returnPolicy ?? "As each piece is made to your measurements, we are unable to accept returns. Exchanges are considered on a case-by-case basis — please contact us within 48 hours of receipt."}</p>
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
                  { icon: Truck, label: "Fast Delivery", sub: product.estimatedDelivery ?? "2–5 days" },
                  { icon: Shield, label: "Authenticity Cert.", sub: "Included with every piece" },
                  { icon: RefreshCcw, label: "Easy Returns", sub: "Within 24 hrs of delivery" },
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
                  <StarRow count={5} size="h-3.5 w-3.5" />
                </div>
                <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">5.0 · {reviewCount} Verified Reviews</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {defaultReviews.map((r) => (
                <div key={r.name} className="border border-gold/20 p-7 bg-ivory">
                  <div className="flex items-center gap-1 mb-4">
                    <StarRow count={r.rating} />
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
                    <p className="font-display text-sm text-gradient-gold mt-1">{formatPrice(p.discountedPrice ?? p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="px-6 md:px-12 py-20 max-w-[1400px] mx-auto border-t border-gold/10">
            <div className="flex items-center gap-3 mb-10">
              <History className="h-4 w-4 text-gold-warm" strokeWidth={1.5} />
              <div>
                <p className="text-[10px] uppercase tracking-luxe text-gold mb-1">Your Journey</p>
                <h2 className="font-display text-4xl italic text-ink">Recently Viewed</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {recentlyViewed.map((p) => (
                <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group block">
                  <ArchFrame className="aspect-[3/4]">
                    <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
                    {p.discountPercent && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-1 text-[9px] font-bold bg-red-500 text-white">-{p.discountPercent}%</span>
                      </div>
                    )}
                  </ArchFrame>
                  <div className="mt-3 px-1">
                    <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{p.category}</p>
                    <h3 className="font-display text-base italic text-ink mt-0.5">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {p.discountedPrice ? (
                        <>
                          <p className="font-display text-sm text-red-600 font-semibold">{formatPrice(p.discountedPrice)}</p>
                          <p className="font-display text-xs text-muted-foreground line-through">{formatPrice(p.price)}</p>
                        </>
                      ) : (
                        <p className="font-display text-sm text-gradient-gold">{formatPrice(p.price)}</p>
                      )}
                    </div>
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
        <Footer />
      </div>
    </div>
  );
}
