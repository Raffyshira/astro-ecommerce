import React from "react";
import { useCartStore } from "@/features/cart/CartStore.ts";


const Cart: React.FC = () => {
   const cart = useCartStore((state) => state.cart);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
   const clearCart = useCartStore((state) => state.clearCart);

   return (
      <div>
         <h2>Your Cart</h2>
         {cart.length === 0 ? (
            <p>Your cart is empty.</p>
         ) : (
            <>
               <ul>
                  {cart.map(item => (
                     <li key={item.id}>
                        {item.title} - ${item.price} x {item.quantity}
                        <button onClick={() => removeFromCart(item.id)}>
                           Remove
                        </button>
                     </li>
                  ))}
               </ul>
               {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
            </>
         )}
      </div>
   );
};

export default Cart;
