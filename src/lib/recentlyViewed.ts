import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

const MAX_ITEMS = 6;

interface RecentlyViewedStore {
  items: Product[];
  add: (product: Product) => void;
  clear: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const without = state.items.filter((p) => p.id !== product.id);
          return { items: [product, ...without].slice(0, MAX_ITEMS) };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "maison-aurum-recently-viewed" }
  )
);
