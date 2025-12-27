// store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  image: string;
  qty: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string, color: string) => void;
  increaseQty: (id: string, color: string) => void;
  decreaseQty: (id: string, color: string) => void;
  clearCart: () => void;

  totalQty: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // ➕ ADD ITEM
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.color === item.color
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.color === item.color
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      // ❌ REMOVE ITEM
      removeItem: (id, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.color === color)
          ),
        })),

      // ➕ INCREASE QTY
      increaseQty: (id, color) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.color === color
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        })),

      // ➖ DECREASE QTY
      decreaseQty: (id, color) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && i.color === color
                ? { ...i, qty: i.qty - 1 }
                : i
            )
            .filter((i) => i.qty > 0),
        })),

      // 🧹 CLEAR CART
      clearCart: () => set({ items: [] }),

      // 🔢 TOTAL QTY
      totalQty: () =>
        get().items.reduce((total, item) => total + item.qty, 0),

      // 💰 TOTAL PRICE
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.qty * item.price,
          0
        ),
    }),
    {
      name: 'mazaalai-cart', // localStorage key
    }
  )
);
