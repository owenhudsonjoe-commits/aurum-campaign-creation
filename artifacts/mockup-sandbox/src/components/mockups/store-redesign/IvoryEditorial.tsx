import { ShoppingBag, Heart, Search, ArrowRight, Instagram } from "lucide-react";

const products = [
  { name: "Seharzat 3 Pc", category: "Festive / Pret", price: "RS 2,844", badge: "New", img: "/black-shanzay-1.webp" },
  { name: "Sapphire Black 3 Pc", category: "Bridal", price: "RS 12,500", badge: "Festive", img: "/hoorain-1.webp" },
  { name: "Hoorain 3 Pc", category: "Festive / Pret", price: "RS 4,800", badge: "Sale", img: "/casper-1.webp" },
  { name: "Berry 2 Pc Lawn", category: "Daily Wear", price: "RS 2,499", badge: "Bestseller", img: "/berry-1.webp" },
];

const accent = "#8b6f47";
const bg = "#faf8f5";
const dark = "#1c1917";

export function IvoryEditorial() {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: bg, color: dark, minHeight: "100vh" }}>
      {/* Announcement */}
      <div style={{ background: dark, color: "#d4b896", textAlign: "center", padding: "9px 0", fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 500 }}>
        FREE SHIPPING ON ORDERS ABOVE RS 5,000
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 52px", height: "76px", borderBottom: `1px solid #e8e0d4`, background: bg }}>
        <div style={{ display: "flex", gap: "32px", fontSize: "11px", letterSpacing: "2px", color: "#8b7355", fontFamily: "sans-serif" }}>
          {["Bridal", "Festive", "Pret", "Men's"].map(n => (
            <span key={n} style={{ cursor: "pointer" }}>{n}</span>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "26px", letterSpacing: "7px", fontWeight: 400, color: dark }}>AURUM</div>
          <div style={{ fontSize: "7.5px", letterSpacing: "4px", color: "#b09878", fontFamily: "sans-serif" }}>MAISON · LAHORE</div>
        </div>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", color: "#8b7355" }}>
          <Search size={16} strokeWidth={1.5} />
          <Heart size={16} strokeWidth={1.5} />
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: dark, borderBottom: `1px solid ${dark}`, paddingBottom: "2px", fontSize: "11px", letterSpacing: "2px", fontFamily: "sans-serif", cursor: "pointer" }}>
            <ShoppingBag size={14} strokeWidth={1.5} /> Bag (0)
          </div>
        </div>
      </nav>

      {/* Hero — split layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "480px" }}>
        {/* Left: text */}
        <div style={{ background: "#f3ede4", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 72px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "5px", color: accent, marginBottom: "20px", fontFamily: "sans-serif", fontWeight: 600 }}>SUMMER 2026 COLLECTION</div>
          <h1 style={{ fontSize: "52px", fontWeight: 300, lineHeight: 1.1, color: dark, margin: "0 0 20px" }}>
            Dressed for<br /><em style={{ fontStyle: "italic", color: accent }}>the Modern</em><br />Woman
          </h1>
          <p style={{ fontSize: "14px", color: "#8b7355", fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.7, marginBottom: "36px", maxWidth: "340px" }}>
            Heritage craftsmanship fused with contemporary silhouettes — bridal, festive prêt and bespoke, handcrafted in Lahore.
          </p>
          <div style={{ display: "flex", gap: "14px" }}>
            <button style={{ background: dark, color: bg, padding: "14px 32px", fontSize: "10px", letterSpacing: "2.5px", fontFamily: "sans-serif", fontWeight: 600, border: "none", cursor: "pointer" }}>
              SHOP NOW
            </button>
            <button style={{ background: "transparent", color: dark, padding: "14px 32px", fontSize: "10px", letterSpacing: "2.5px", fontFamily: "sans-serif", fontWeight: 600, border: `1px solid ${dark}`, cursor: "pointer" }}>
              BOOK BESPOKE
            </button>
          </div>
        </div>

        {/* Right: image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="/hoorain-1.webp" alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          <div style={{ position: "absolute", bottom: "24px", right: "24px", background: "rgba(250,248,245,0.92)", padding: "12px 20px", backdropFilter: "blur(4px)" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", color: accent, fontFamily: "sans-serif" }}>FEATURED</div>
            <div style={{ fontSize: "14px", color: dark }}>Hoorain 3 Pc Organza</div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ borderBottom: `1px solid #e8e0d4`, display: "flex", background: bg }}>
        {["All Collections", "Bridal", "Festive", "Daily Wear", "Men's"].map((cat, i) => (
          <button key={cat} style={{ padding: "16px 28px", fontSize: "11px", letterSpacing: "1.5px", fontFamily: "sans-serif", background: "transparent", color: i === 0 ? dark : "#9b8a72", border: "none", borderBottom: i === 0 ? `2px solid ${dark}` : "2px solid transparent", cursor: "pointer", fontWeight: i === 0 ? 600 : 400, marginBottom: "-1px" }}>
            {cat}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", padding: "0 28px", fontSize: "11px", color: "#9b8a72", fontFamily: "sans-serif", gap: "4px" }}>
          Sort: Featured <span style={{ fontSize: "9px" }}>▾</span>
        </div>
      </div>

      {/* Product grid */}
      <div style={{ padding: "48px 52px", background: bg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 300, margin: 0, color: dark }}>All Collections</h2>
          <span style={{ fontSize: "11px", color: "#b09878", fontFamily: "sans-serif" }}>33 products</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
          {products.map((p) => (
            <div key={p.name} style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#ede8e0" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                {/* Badge */}
                <div style={{ position: "absolute", top: "10px", left: "10px", background: dark, color: bg, fontSize: "8px", letterSpacing: "2px", padding: "4px 9px", fontFamily: "sans-serif", fontWeight: 600 }}>
                  {p.badge.toUpperCase()}
                </div>
                {/* Wishlist */}
                <div style={{ position: "absolute", top: "10px", right: "10px", width: "28px", height: "28px", background: "rgba(250,248,245,0.85)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Heart size={12} strokeWidth={1.5} color={dark} />
                </div>
                {/* Quick add */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: dark, color: bg, textAlign: "center", padding: "11px", fontSize: "9px", letterSpacing: "2px", fontFamily: "sans-serif", fontWeight: 600 }}>
                  QUICK ADD
                </div>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#b09878", fontFamily: "sans-serif", marginBottom: "4px" }}>{p.category.toUpperCase()}</div>
                <div style={{ fontSize: "14px", color: dark, marginBottom: "4px" }}>{p.name}</div>
                <div style={{ fontSize: "13px", color: accent, fontFamily: "sans-serif" }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <button style={{ background: "transparent", color: dark, padding: "14px 52px", fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 600, border: `1px solid ${dark}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            VIEW ALL PRODUCTS <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Value strip */}
      <div style={{ background: "#f0e8da", borderTop: "1px solid #e0d5c4", borderBottom: "1px solid #e0d5c4", display: "flex" }}>
        {["🧵 Handcrafted in Lahore", "📦 Free Shipping RS 5,000+", "✨ Bespoke Tailoring", "💬 WhatsApp Support"].map(item => (
          <div key={item} style={{ flex: 1, textAlign: "center", padding: "18px", fontSize: "11px", color: "#7a6347", fontFamily: "sans-serif", borderRight: "1px solid #e0d5c4", letterSpacing: "0.5px" }}>
            {item}
          </div>
        ))}
      </div>

      {/* Bespoke CTA */}
      <div style={{ background: dark, color: bg, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "56px 72px" }}>
        <div>
          <div style={{ fontSize: "9px", letterSpacing: "4px", color: "#d4b896", marginBottom: "12px", fontFamily: "sans-serif" }}>COUTURE ATELIER</div>
          <h2 style={{ fontSize: "34px", fontWeight: 300, margin: "0 0 10px", color: bg }}>Every design can be bespoke.</h2>
          <p style={{ fontSize: "13px", color: "rgba(250,248,245,0.55)", fontFamily: "sans-serif", margin: 0 }}>Commission a one-of-a-kind piece crafted to your vision</p>
        </div>
        <button style={{ background: "transparent", color: "#d4b896", padding: "16px 40px", fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 600, border: "1px solid #d4b896", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          BOOK A CONSULTATION <ArrowRight size={13} />
        </button>
      </div>

      {/* Footer */}
      <div style={{ background: "#f3ede4", borderTop: "1px solid #e8e0d4", padding: "48px 72px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "36px" }}>
          <div>
            <div style={{ fontSize: "22px", letterSpacing: "6px", color: dark, fontWeight: 400, marginBottom: "6px" }}>AURUM</div>
            <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#b09878", fontFamily: "sans-serif", marginBottom: "20px" }}>MAISON · LAHORE</div>
            <div style={{ fontSize: "11px", color: "#8b7355", fontFamily: "sans-serif", maxWidth: "200px", lineHeight: 1.7 }}>
              Heritage couture for the modern woman, handcrafted in Lahore.
            </div>
          </div>
          {[["Shop", ["Bridal", "Festive Pret", "Daily Wear", "Men's", "Sale"]], ["Services", ["Bespoke", "Alterations", "Track Order"]], ["Contact", ["WhatsApp Us", "Instagram", "Book Appointment"]]].map(([title, items]) => (
            <div key={title as string}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: dark, marginBottom: "16px", fontFamily: "sans-serif", fontWeight: 600 }}>{title as string}</div>
              {(items as string[]).map(item => (
                <div key={item} style={{ fontSize: "12px", color: "#9b8a72", marginBottom: "10px", fontFamily: "sans-serif", cursor: "pointer" }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #e0d5c4", paddingTop: "20px", fontSize: "10px", color: "#c0b09a", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
          <span>© 2026 Maison Aurum. All rights reserved.</span>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
    </div>
  );
}
