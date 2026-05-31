import { create } from "zustand";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>()((set, get) => ({
  items: [],

  addItem: (product, size) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, size, qty: 1 }] };
    });
  },

  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.product.id === productId && i.size === size)
      ),
    }));
  },

  updateQty: (productId, size, qty) => {
    if (qty <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, qty } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),

  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));
