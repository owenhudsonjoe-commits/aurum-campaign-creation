import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProductBySlug, formatPrice, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useRecentlyViewed } from "@/lib/recentlyViewed";
import { ShoppingBag, Heart, ChevronDown, ArrowRight, Ruler, Phone, Shield, Truck, RefreshCcw, Zap, Clock, CreditCard } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    return {
      meta: [
        { title: product ? `${product.name} — AURUM` : "Product — AURUM" },
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

function Stars({ count, size = "h-3 w-3" }: { count: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`${size === "h-3 w-3" ? "text-xs" : "text-sm"} ${i < count ? "text-foreground" : "text-foreground/20"}`}>★</span>
      ))}
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const maybeProduct = getProductBySlug(slug);
  if (!maybeProduct) throw notFound();
  const product = maybeProduct;

  const { addItem } = useCart();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();
  const { add: trackView, items: recentItems } = useRecentlyViewed();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [mainImage, setMainImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => { trackView(product); }, [product.id]);

  const recentlyViewed = recentItems.filter((p) => p.id !== product.id).slice(0, 4);
  const related = useMemo(
    () => PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4),
    [product]
  );
  const hasSizeChart = product.sizeChart.length > 0 || !!product.sizeChartImage;
  const reviewCount = product.reviewCount ?? 48;
  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${product.discountedPrice ? formatPrice(product.discountedPrice) : formatPrice(product.price)}). Could you please assist me?`
  );

  function handleAddToBag() {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    addItem(product, selectedSize);
    navigate({ to: "/checkout" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-[97px]">

        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4 border-b border-border">
          <div className="flex items-center gap-2 text-[11px] text-foreground/40 font-medium">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <Link to="/shop" search={{ collection: product.category as any, fabric: product.fabricType }} className="hover:text-foreground transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_460px] gap-8 lg:gap-16">

            {/* Image gallery */}
            <div className="space-y-2">
              <div className="relative overflow-hidden bg-muted aspect-[3/4] group">
                <img
                  src={product.images[mainImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-foreground text-background text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5">
                      {product.badge}
                    </span>
                  </div>
                )}
                {product.discountPercent && (
                  <div className="absolute top-4 right-14 z-10">
                    <span className="bg-red-600 text-white text-[9px] font-bold uppercase px-2 py-1.5">
                      -{product.discountPercent}%
                    </span>
                  </div>
                )}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur hover:bg-background transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4 w-4 ${wishlisted ? "fill-foreground text-foreground" : "text-foreground"}`} strokeWidth={1.8} />
                </button>
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(i)}
                      className={`relative w-16 h-20 overflow-hidden transition-all border-2 ${
                        mainImage === i ? "border-foreground" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Review snippet */}
              <div className="mt-2 p-4 border border-border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Stars count={5} />
                  <span className="text-[11px] text-foreground/50">{reviewCount} reviews</span>
                </div>
                <p className="text-[12px] text-foreground/60 leading-relaxed">"{defaultReviews[0].text}"</p>
                <p className="mt-1.5 text-[11px] font-semibold text-foreground/50">{defaultReviews[0].name} · {defaultReviews[0].city}</p>
              </div>
            </div>

            {/* Product info */}
            <div className="md:pt-2">
              <p className="text-[11px] uppercase tracking-widest text-foreground/40 font-medium mb-2">
                {product.category} · {product.fabricType}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
                {product.name}
              </h1>

              {/* Ratings row */}
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <div className="flex items-center gap-1.5">
                  <Stars count={5} />
                  <span className="text-[12px] text-foreground/50">{reviewCount} reviews</span>
                </div>
                {product.soldCount && product.soldTimeframe && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-100">
                    <Zap className="h-3 w-3 text-red-500" strokeWidth={2} />
                    <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">
                      {product.soldCount} sold in {product.soldTimeframe}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-1">
                {product.discountedPrice ? (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl font-bold text-red-600">{formatPrice(product.discountedPrice)}</span>
                    <span className="text-lg text-foreground/40 line-through">{formatPrice(product.price)}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white uppercase">{product.discountPercent}% OFF</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</p>
                )}
              </div>
              <p className="text-[11px] text-foreground/40 mb-3">Inclusive of all taxes</p>

              {/* Stock & delivery */}
              <div className="flex items-center gap-4 flex-wrap mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  <span className="text-[12px] text-green-700 font-medium">In Stock</span>
                </div>
                {product.estimatedDelivery && (
                  <div className="flex items-center gap-1.5 text-[12px] text-foreground/50">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.8} />
                    <span>Est. delivery: <strong className="text-foreground">{product.estimatedDelivery}</strong></span>
                  </div>
                )}
              </div>

              {/* Size selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-semibold text-foreground uppercase tracking-wide">
                    Size {selectedSize && <span className="text-foreground/50 ml-1">— {selectedSize}</span>}
                  </p>
                  {hasSizeChart && (
                    <button
                      onClick={() => setSizeChartOpen(!sizeChartOpen)}
                      className="flex items-center gap-1 text-[11px] text-foreground/50 hover:text-foreground transition-colors"
                    >
                      <Ruler className="h-3 w-3" strokeWidth={2} />
                      Size Guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`min-w-[48px] px-4 py-2.5 text-[12px] font-medium border-2 transition-all ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : sizeError
                          ? "border-red-400 text-foreground/60 hover:border-foreground"
                          : "border-border text-foreground/60 hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && <p className="mt-2 text-[12px] text-red-500 font-medium">Please select a size.</p>}
              </div>

              {/* Size chart */}
              {sizeChartOpen && (
                <div className="mb-6 border border-border bg-muted/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[12px] font-semibold text-foreground uppercase tracking-wide">Size Guide</p>
                    <button onClick={() => setSizeChartOpen(false)} className="text-foreground/40 hover:text-foreground text-lg leading-none">×</button>
                  </div>
                  {product.sizeChartImage ? (
                    <img src={product.sizeChartImage} alt="Size Chart" className="w-full object-contain max-h-[400px]" />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="border-b border-border">
                            {["Size", "Chest", "Waist", "Hips", "Length"].map((h) => (
                              <th key={h} className="text-left py-2 pr-4 text-foreground/50 font-medium uppercase tracking-wide text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizeChart.map((row, i) => (
                            <tr key={i} className={`border-b border-border/50 ${selectedSize === row.size ? "bg-muted" : ""}`}>
                              <td className="py-2.5 pr-4 font-semibold text-foreground">{row.size}</td>
                              <td className="py-2.5 pr-4 text-foreground/60">{row.chest ?? "—"}</td>
                              <td className="py-2.5 pr-4 text-foreground/60">{row.waist ?? "—"}</td>
                              <td className="py-2.5 pr-4 text-foreground/60">{row.hips ?? "—"}</td>
                              <td className="py-2.5 pr-4 text-foreground/60">{row.length ?? "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <p className="mt-3 text-[10px] text-foreground/40">All measurements in inches. May vary ±0.5".</p>
                </div>
              )}

              {/* CTAs */}
              <div className="flex gap-3 mb-3">
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold uppercase tracking-widest border-2 transition-all ${
                    added
                      ? "bg-foreground border-foreground text-background"
                      : "bg-background border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={2} />
                  {added ? "Added ✓" : "Add to Bag"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  <CreditCard className="h-4 w-4" strokeWidth={2} />
                  Buy Now
                </button>
              </div>

              <a
                href={`https://wa.me/923318541663?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 mb-8 bg-[#25D366] hover:bg-[#20bc5a] text-white text-[12px] font-bold uppercase tracking-widest transition-colors shadow-sm"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </a>

              {/* Accordions */}
              <div className="border-t border-border">
                {[
                  { label: "Description", key: "desc", open: descOpen, toggle: () => setDescOpen(!descOpen), content: (
                    <p className="text-[13px] text-foreground/60 leading-relaxed pb-5">{product.description}</p>
                  )},
                  { label: "Fabric & Details", key: "details", open: detailsOpen, toggle: () => setDetailsOpen(!detailsOpen), content: (
                    <div className="pb-5 space-y-2">
                      {product.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-foreground/40 mt-1.5 text-[10px]">—</span>
                          <p className="text-[13px] text-foreground/60">{d}</p>
                        </div>
                      ))}
                    </div>
                  )},
                  { label: "Shipping & Returns", key: "shipping", open: shippingOpen, toggle: () => setShippingOpen(!shippingOpen), content: (
                    <div className="pb-5 space-y-2 text-[13px] text-foreground/60">
                      {product.estimatedDelivery && <p><strong className="text-foreground font-medium">Estimated Delivery:</strong> {product.estimatedDelivery}</p>}
                      <p><strong className="text-foreground font-medium">Shipping:</strong> Free nationwide delivery. Tracking shared once dispatched.</p>
                      <p><strong className="text-foreground font-medium">Returns:</strong> {product.returnPolicy ?? "Each piece is made to your measurements. Exchanges considered within 48 hours."}</p>
                    </div>
                  )},
                ].map(({ label, key, open, toggle, content }) => (
                  <div key={key} className="border-b border-border">
                    <button
                      onClick={toggle}
                      className="w-full flex items-center justify-between py-4 text-[12px] font-semibold text-foreground uppercase tracking-wide"
                    >
                      {label}
                      <ChevronDown className={`h-4 w-4 text-foreground/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={2} />
                    </button>
                    {open && content}
                  </div>
                ))}
              </div>

              {/* Trust bar */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: "Free Delivery", sub: product.estimatedDelivery ?? "2–5 days" },
                  { icon: Shield, label: "Authentic", sub: "Certificate included" },
                  { icon: RefreshCcw, label: "Easy Returns", sub: "Within 48 hrs" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center p-3 border border-border">
                    <Icon className="h-4 w-4 text-foreground/40 mx-auto mb-1.5" strokeWidth={1.8} />
                    <p className="text-[10px] font-semibold text-foreground uppercase tracking-wide">{label}</p>
                    <p className="text-[10px] text-foreground/40 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="border-t border-border bg-muted/30 px-5 md:px-10 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-foreground/40 font-medium mb-2">Customer Reviews</p>
                <h2 className="text-2xl font-bold">What our customers say</h2>
              </div>
              <div className="hidden sm:block text-right">
                <Stars count={5} size="h-4 w-4" />
                <p className="text-[11px] text-foreground/40 mt-1">{reviewCount} verified reviews</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {defaultReviews.map((r) => (
                <div key={r.name} className="border border-border p-6 bg-background">
                  <Stars count={r.rating} />
                  <p className="text-[13px] text-foreground/60 leading-relaxed my-4">"{r.text}"</p>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-foreground">{r.name}</p>
                    <p className="text-[11px] text-foreground/40">{r.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="px-5 md:px-10 py-16 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">You May Also Like</h2>
              <Link to="/shop" search={{ collection: product.category as any, fabric: product.fabricType }} className="text-[12px] font-medium text-foreground/50 hover:text-foreground flex items-center gap-1 transition-colors">
                View All <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative overflow-hidden bg-muted aspect-[3/4] mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[13px] font-medium text-foreground group-hover:text-foreground/60 transition-colors">{p.name}</p>
                  <p className="text-[12px] text-foreground/50 mt-0.5">{formatPrice(p.discountedPrice ?? p.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="border-t border-border px-5 md:px-10 py-16 max-w-[1400px] mx-auto">
            <h2 className="text-xl font-bold mb-8">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyViewed.map((p) => (
                <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative overflow-hidden bg-muted aspect-[3/4] mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[13px] font-medium text-foreground group-hover:text-foreground/60 transition-colors">{p.name}</p>
                  <p className="text-[12px] text-foreground/50 mt-0.5">{formatPrice(p.discountedPrice ?? p.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
