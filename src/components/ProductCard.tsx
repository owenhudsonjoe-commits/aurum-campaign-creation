import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { ArchFrame } from "./ArchFrame";

interface Props {
  image: string;
  name: string;
  category: string;
  price: string;
  badge?: "New" | "Limited" | "Last Piece";
  leadTime?: string;
}

export function ProductCard({ image, name, category, price, badge, leadTime = "Made to Order · 8–12 wks" }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group relative">
      <ArchFrame className="aspect-[3/4]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/65 via-emerald-deep/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 text-[9px] uppercase tracking-luxe font-medium ${
              badge === "New" ? "bg-gradient-gold text-ivory" :
              badge === "Limited" ? "bg-emerald-deep/90 text-gold-warm border border-gold/40" :
              "bg-ink/80 text-ivory"
            }`}>
              {badge}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 backdrop-blur text-ink opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-ivory"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-all duration-300 ${wishlisted ? "fill-gold text-gold scale-110" : "text-ink/70"}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Add to bag */}
        <button
          onClick={handleAdd}
          aria-label="Add to bag"
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full px-6 py-3 text-[10px] uppercase tracking-luxe backdrop-blur translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap ${
            added
              ? "bg-gradient-gold text-ivory"
              : "bg-ivory/90 text-ink hover:bg-gradient-gold hover:text-ivory"
          }`}
        >
          <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
          {added ? "Added to Bag" : "Add to Bag"}
        </button>
      </ArchFrame>

      <div className="mt-5 px-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{category}</p>
            <h3 className="mt-1.5 font-display text-xl text-foreground italic leading-snug">{name}</h3>
          </div>
          <p className="font-display text-lg text-gradient-gold whitespace-nowrap pt-5">{price}</p>
        </div>
        <p className="mt-2 text-[9px] uppercase tracking-luxe text-muted-foreground/70">{leadTime}</p>
      </div>
    </div>
  );
}
