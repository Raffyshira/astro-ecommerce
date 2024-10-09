import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
   id: number;
   name: string;
   price: number;
   quantity: number;
   brand: string;
   thumbnail: string;
   discount: number;
}

interface CartState {
   cart: CartItem[];
   addToCart: (item: CartItem) => void;
   updateQuantity: (productId: number, quantity: number) => void;
   removeFromCart: (id: number) => void;
   clearCart: () => void;
}

export const useCartStore = create<CartState>(
   persist(
      set => ({
         cart: [],
         addToCart: item =>
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
         removeFromCart: id =>
            set(state => ({
               cart: state.cart.filter(item => item.id !== id)
            })),
         clearCart: () => set({ cart: [] }),
         updateQuantity: (productId, quantity) =>
            set(state => ({
               cart: state.cart.map(item =>
                  item.id === productId ? { ...item, quantity: quantity } : item
               )
            }))
      }),
      {
         name: "cart-storage" // Nama key di localStorage
      }
   )
);
