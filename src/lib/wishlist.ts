import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

interface WishlistStore {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  remove: (productId: string) => void;
  count: () => number;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: get().items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },

      isWishlisted: (productId) => get().items.some((p) => p.id === productId),

      remove: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),

      count: () => get().items.length,
    }),
    { name: "aurum-wishlist" }
  )
);
