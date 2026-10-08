import { create } from 'zustand';
import { Product } from '@/data/mockData';

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedOptions: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.id === item.id &&
          JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartId === existing.cartId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (cartId) =>
    set((state) => ({ items: state.items.filter((i) => i.cartId !== cartId) })),
  updateQuantity: (cartId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.cartId === cartId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
