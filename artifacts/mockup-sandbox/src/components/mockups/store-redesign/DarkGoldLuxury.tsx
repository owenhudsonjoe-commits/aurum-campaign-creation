import { ShoppingBag, Heart, Search, ChevronDown, ArrowRight } from "lucide-react";

const products = [
  { name: "Seharzat 3 Pc", category: "Festive / Pret", price: "RS 2,844", badge: "New", img: "/black-shanzay-1.webp" },
  { name: "Sapphire Black 3 Pc", category: "Bridal", price: "RS 12,500", badge: "Festive", img: "/hoorain-1.webp" },
  { name: "Hoorain 3 Pc", category: "Festive / Pret", price: "RS 4,800", badge: "Sale", img: "/casper-1.webp" },
  { name: "Berry 2 Pc Lawn", category: "Daily Wear", price: "RS 2,499", badge: "Bestseller", img: "/berry-1.webp" },
];

export function DarkGoldLuxury() {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: "#0a0a0a", color: "#f5f0e8", minHeight: "100vh" }}>
      {/* Top announcement bar */}
      <div style={{ background: "#c9a84c", color: "#0a0a0a", textAlign: "center", padding: "9px 0", fontSize: "11px", letterSpacing: "3px", fontWeight: 600, fontFamily: "sans-serif" }}>
        COMPLIMENTARY SHIPPING ON ORDERS ABOVE RS 5,000
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "80px", borderBottom: "1px solid rgba(201,168,76,0.2)", background: "#0a0a0a" }}>
        <div style={{ display: "flex", gap: "36px", fontSize: "11px", letterSpacing: "2.5px", color: "#a89060", fontFamily: "sans-serif" }}>
          {["BRIDAL", "FESTIVE", "PRET", "MEN'S"].map(n => (
            <span key={n} style={{ cursor: "pointer", transition: "color 0.2s" }}>{n}</span>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "28px", letterSpacing: "8px", fontWeight: 300, color: "#c9a84c", lineHeight: 1 }}>AURUM</div>
          <div style={{ fontSize: "8px", letterSpacing: "5px", color: "#6b5a3a", marginTop: "3px", fontFamily: "sans-serif" }}>MAISON · LAHORE</div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center", color: "#a89060" }}>
          <Search size={17} strokeWidth={1.5} />
          <Heart size={17} strokeWidth={1.5} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#c9a84c", color: "#0a0a0a", padding: "8px 16px", fontSize: "10px", letterSpacing: "2px", fontFamily: "sans-serif", cursor: "pointer" }}>
            <ShoppingBag size={14} strokeWidth={2} />
            BAG (0)
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", height: "520px", overflow: "hidden", background: "#111" }}>
        <img
          src="/black-shanzay-1.webp"
          alt="hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.55, display: "block" }}
        />
        {/* Gold overlay gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(201,168,76,0.08) 100%)" }} />

        {/* Decorative corner lines */}
        <div style={{ position: "absolute", top: 32, left: 32, width: 60, height: 60, borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
        <div style={{ position: "absolute", bottom: 32, right: 32, width: 60, height: 60, borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "0 80px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#c9a84c", marginBottom: "20px", fontFamily: "sans-serif" }}>NEW COLLECTION · SUMMER 2026</div>
          <h1 style={{ fontSize: "58px", fontWeight: 300, lineHeight: 1.1, color: "#f5f0e8", margin: 0, marginBottom: "20px", maxWidth: "520px" }}>
            Draped in<br /><em style={{ color: "#c9a84c", fontStyle: "italic" }}>Heritage Gold</em>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(245,240,232,0.6)", marginBottom: "36px", fontFamily: "sans-serif", fontWeight: 300, letterSpacing: "0.3px" }}>
            Bridal couture handcrafted in Lahore
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <button style={{ background: "#c9a84c", color: "#0a0a0a", padding: "14px 36px", fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 700, border: "none", cursor: "pointer" }}>
              EXPLORE COLLECTION
            </button>
            <button style={{ background: "transparent", color: "#f5f0e8", padding: "14px 36px", fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 600, border: "1px solid rgba(245,240,232,0.3)", cursor: "pointer" }}>
              BOOK BESPOKE
            </button>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(201,168,76,0.15)", background: "#0d0d0d" }}>
        {["All", "Bridal", "Festive", "Daily Wear", "Men's"].map((cat, i) => (
          <button key={cat} style={{ flex: 1, padding: "18px", fontSize: "10px", letterSpacing: "2.5px", fontFamily: "sans-serif", background: i === 0 ? "#c9a84c" : "transparent", color: i === 0 ? "#0a0a0a" : "#7a6640", border: "none", borderRight: "1px solid rgba(201,168,76,0.1)", cursor: "pointer", fontWeight: i === 0 ? 700 : 500 }}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ padding: "48px", background: "#0a0a0a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#c9a84c", marginBottom: "8px", fontFamily: "sans-serif" }}>OUR COLLECTIONS</div>
            <h2 style={{ fontSize: "34px", fontWeight: 300, margin: 0, color: "#f5f0e8" }}>Featured Pieces</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#a89060", fontSize: "11px", letterSpacing: "2px", fontFamily: "sans-serif", cursor: "pointer" }}>
            VIEW ALL <ArrowRight size={14} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {products.map((p) => (
            <div key={p.name} style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#1a1a1a" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", transition: "transform 0.6s" }} />
                {/* Badge */}
                <div style={{ position: "absolute", top: "12px", left: "12px", background: "#c9a84c", color: "#0a0a0a", fontSize: "8px", letterSpacing: "2px", padding: "4px 10px", fontFamily: "sans-serif", fontWeight: 700 }}>
                  {p.badge.toUpperCase()}
                </div>
                {/* Wishlist */}
                <div style={{ position: "absolute", top: "12px", right: "12px", width: "30px", height: "30px", background: "rgba(10,10,10,0.7)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Heart size={13} strokeWidth={1.5} color="#c9a84c" />
                </div>
                {/* Quick add overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#c9a84c", color: "#0a0a0a", textAlign: "center", padding: "12px", fontSize: "9px", letterSpacing: "2.5px", fontFamily: "sans-serif", fontWeight: 700 }}>
                  ADD TO BAG
                </div>
              </div>
              <div style={{ padding: "14px 0 0" }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#7a6640", fontFamily: "sans-serif", marginBottom: "5px" }}>{p.category.toUpperCase()}</div>
                <div style={{ fontSize: "15px", fontWeight: 400, color: "#f5f0e8", marginBottom: "5px" }}>{p.name}</div>
                <div style={{ fontSize: "13px", color: "#c9a84c", fontFamily: "sans-serif" }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bespoke CTA */}
      <div style={{ background: "#0d0b07", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "56px 80px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#c9a84c", marginBottom: "12px", fontFamily: "sans-serif" }}>COUTURE ATELIER</div>
          <h2 style={{ fontSize: "36px", fontWeight: 300, margin: 0, color: "#f5f0e8", marginBottom: "10px" }}>Your Vision, Our Craft</h2>
          <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "13px", fontFamily: "sans-serif", margin: 0 }}>Commission a one-of-a-kind bespoke piece</p>
        </div>
        <button style={{ background: "transparent", color: "#c9a84c", padding: "16px 40px", fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 700, border: "1px solid #c9a84c", cursor: "pointer" }}>
          BEGIN YOUR JOURNEY
        </button>
      </div>

      {/* Footer */}
      <div style={{ background: "#050505", padding: "40px 80px 24px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "22px", letterSpacing: "6px", color: "#c9a84c", fontWeight: 300, marginBottom: "8px" }}>AURUM</div>
            <div style={{ fontSize: "10px", color: "#4a3d28", letterSpacing: "3px", fontFamily: "sans-serif" }}>MAISON · LAHORE</div>
          </div>
          {[["SHOP", ["Bridal", "Festive Pret", "Daily Wear", "Men's"]], ["SERVICES", ["Bespoke", "Alterations", "Trunk Shows"]], ["CONNECT", ["WhatsApp", "Instagram", "Track Order"]]].map(([title, items]) => (
            <div key={title as string}>
              <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#c9a84c", marginBottom: "16px", fontFamily: "sans-serif" }}>{title as string}</div>
              {(items as string[]).map(item => (
                <div key={item} style={{ fontSize: "12px", color: "#4a3d28", marginBottom: "10px", fontFamily: "sans-serif", cursor: "pointer" }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px", fontSize: "10px", color: "#2a2014", fontFamily: "sans-serif", letterSpacing: "1px" }}>
          © 2026 MAISON AURUM. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}
