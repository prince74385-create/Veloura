'use client';

import { create } from 'zustand';
import type { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  quickView: Product | null;
  openCart: () => void;
  closeCart: () => void;
  setQuickView: (p: Product | null) => void;
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  quickView: null,
  openCart: () => set({ isOpen: true, quickView: null }),
  closeCart: () => set({ isOpen: false }),
  setQuickView: (p) => set({ quickView: p }),
  addItem: (product, size, quantity = 1) =>
    set((state) => {
      const key = `${product.id}-${size}`;
      const existing = state.items.find((i) => i.key === key);
      const items = existing
        ? state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [
            ...state.items,
            {
              key,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              size,
              quantity,
            },
          ];
      return { items, isOpen: true, quickView: null };
    }),
  removeItem: (key) =>
    set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
  updateQuantity: (key, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.key !== key)
          : state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
    })),
  clear: () => set({ items: [] }),
}));
