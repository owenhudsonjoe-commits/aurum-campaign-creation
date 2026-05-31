import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Heart, ChevronDown, ChevronLeft, ArrowRight, Ruler } from "lucide-react";

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

  const hasSizeChart = product.sizeChart.length > 0;
  const sizeChartHeaders = product.category === "Men's"
    ? ["Size", "Chest", "Waist", "Shoulder", "Length"]
    : product.fabricType === "Unstitched"
    ? ["Piece", "Metres"]
    : ["Size", "Chest", "Waist", "Hips", "Length"];

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <div className="pt-[100px]">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-luxe text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_480px] gap-10 lg:gap-20">

            {/* Image gallery */}
            <div className="space-y-3">
              <div className="relative overflow-hidden aspect-[3/4] bg-[oklch(0.97_0.01_88)]">
                <img
                  src={product.images[mainImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                {product.badge && (
                  <div className="absolute top-5 left-5">
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
              <p className="font-display text-3xl text-gradient-gold mt-3 mb-2">{formatPrice(product.price)}</p>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-8">{product.leadTime}</p>

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
                      Size Chart
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
                  <p className="mt-3 text-[10px] text-muted-foreground">All measurements are in inches. For custom sizing, select "Custom" above and note your measurements at checkout.</p>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex gap-3 mb-10">
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
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="px-5 py-4 border border-gold/30 hover:border-gold transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`h-4 w-4 transition-all ${wishlisted ? "fill-gold text-gold" : "text-muted-foreground"}`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* Accordions */}
              <div className="space-y-0 border-t border-gold/20">
                {/* Description */}
                <div className="border-b border-gold/20">
                  <button
                    onClick={() => setDescOpen(!descOpen)}
                    className="w-full flex items-center justify-between py-4 text-[11px] uppercase tracking-luxe text-ink"
                  >
                    The Story
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${descOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                  </button>
                  {descOpen && (
                    <div className="pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="border-b border-gold/20">
                  <button
                    onClick={() => setDetailsOpen(!detailsOpen)}
                    className="w-full flex items-center justify-between py-4 text-[11px] uppercase tracking-luxe text-ink"
                  >
                    Fabric & Details
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                  </button>
                  {detailsOpen && (
                    <div className="pb-5 space-y-2">
                      {product.details.map((d, i) => (
                        <p key={i} className="text-sm text-muted-foreground font-light">{d}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Trust icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { label: "Complimentary Worldwide Shipping" },
                  { label: "Authenticity Certificate Included" },
                  { label: "Secure Payments · All Methods" },
                ].map((t) => (
                  <div key={t.label} className="text-center">
                    <p className="text-[9px] uppercase tracking-luxe text-muted-foreground leading-relaxed">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
