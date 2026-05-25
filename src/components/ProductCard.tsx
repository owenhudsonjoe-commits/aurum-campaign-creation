import { Plus } from "lucide-react";
import { ArchFrame } from "./ArchFrame";

interface Props {
  image: string;
  name: string;
  category: string;
  price: string;
}

export function ProductCard({ image, name, category, price }: Props) {
  return (
    <div className="group relative">
      <ArchFrame className="aspect-[3/4]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <button
          aria-label="Add to bag"
          className="absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/90 backdrop-blur text-ink translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gradient-gold hover:text-ivory"
        >
          <Plus className="h-4 w-4" strokeWidth={1.2} />
        </button>
      </ArchFrame>
      <div className="mt-5 flex items-start justify-between gap-4 px-2">
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{category}</p>
          <h3 className="mt-2 font-display text-xl text-foreground italic">{name}</h3>
        </div>
        <p className="font-display text-lg text-gradient-gold whitespace-nowrap">{price}</p>
      </div>
    </div>
  );
}
