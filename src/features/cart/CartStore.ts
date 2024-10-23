import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
   id: number;
   name: string;
   price: number;
   quantity: number;
   brand: string;
   thumbnail: string;
   discountPercentage: number;
   sku: string;
}

interface CartState {
   cart: CartItem[];
   addToCart: (item: CartItem) => void;
   updateQuantity: (productId: number, quantity: number) => void;
   removeFromCart: (id: number) => void;
   clearCart: () => void;
}

export const useCartStore = create<CartState>()(
   persist(
      set => ({
         cart: [],
         addToCart: (item: CartItem) =>
            set(state => {
               const existingItem = state.cart.find(
                  entry => entry.id === item.id
               );

               if (existingItem) {
                  // Jika produk sudah ada, tambahkan kuantitasnya
                  return {
                     cart: state.cart.map(entry =>
                        entry.id === item.id
                           ? {
                                ...entry,
                                quantity: entry.quantity + item.quantity
                             }
                           : entry
                     )
                  };
               }

               // Jika produk baru, tambahkan ke cart
               return {
                  cart: [...state.cart, item]
               };
            }),
         removeFromCart: (id: number) =>
            set(state => ({
               cart: state.cart.filter(item => item.id !== id)
            })),
         clearCart: () => set({ cart: [] }),
         updateQuantity: (productId: number, quantity: number) =>
            set(state => ({
               cart: state.cart.map(item =>
                  item.id === productId ? { ...item, quantity } : item
               )
            }))
      }),
      {
         name: "cart-storage",
         storage: createJSONStorage(() => localStorage)
      }
   )
);
