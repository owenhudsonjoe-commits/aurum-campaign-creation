import { Plus } from "lucide-react";

interface Props {
  image: string;
  name: string;
  category: string;
  price: string;
}

export function ProductCard({ image, name, category, price }: Props) {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden bg-muted aspect-[4/5]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <button
          aria-label="Add to bag"
          className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-background/90 backdrop-blur text-foreground translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gradient-gold hover:text-white"
        >
          <Plus className="h-4 w-4" strokeWidth={1.2} />
        </button>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition-colors duration-700 group-hover:ring-gold/40" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{category}</p>
          <h3 className="mt-2 font-display text-xl text-foreground">{name}</h3>
        </div>
        <p className="font-display text-lg text-gradient-gold whitespace-nowrap">{price}</p>
      </div>
    </div>
  );
}
