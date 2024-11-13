import Stripe from "stripe";
import fetch from "node-fetch";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
   apiVersion: "2022-11-15"
});

export const POST: APIRoute = async ({ request }) => {
   try {
      const { items } = await request.json(); // Terima data item dari cart frontend

      // Buat line_items berdasarkan data dari frontend tanpa perubahan
      const lineItems = items.map(item => ({
         price_data: {
            currency: "usd",
            product_data: {
               name: item.name,
               description: item.description,
               images: [item.thumbnail]
            },
            unit_amount: Math.round(item.price * 100) // Pastikan harga dalam cents
         },
         quantity: item.quantity
      }));

      const session = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items: lineItems,
         mode: "payment",
         success_url: `${
            import.meta.env.PUBLIC_SITE_URL
         }/success/?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${import.meta.env.PUBLIC_SITE_URL}/cart`
      });

      return new Response(JSON.stringify({ id: session.id }), {
         status: 200,
         headers: {
            "Content-Type": "application/json"
         }
      });
   } catch (error) {
      console.error("Error creating checkout session:", error);
      return new Response(JSON.stringify({ error: error.message }), {
         status: 500,
         headers: {
            "Content-Type": "application/json"
         }
      });
   }
};
